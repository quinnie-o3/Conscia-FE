package com.example.conscia.ui.rules

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.conscia.data.AppDatabase
import com.example.conscia.data.rule.RuleEntity
import com.example.conscia.data.rule.RuleRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class CreateEditRuleUiState(
    val selectedPackageName: String = "",
    val selectedAppName: String = "",
    val intention: String = "",
    val limitHours: String = "0",
    val limitMinutes: String = "15",
    val trackingEnabled: Boolean = true,
    val warningEnabled: Boolean = true,
    val isEditMode: Boolean = false,
    val isSaving: Boolean = false,
    val saveSuccess: Boolean = false,
    val errorMessage: String? = null
)

class CreateEditRuleViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: RuleRepository
    private var currentRuleId: Long? = null

    private val _uiState = MutableStateFlow(CreateEditRuleUiState())
    val uiState: StateFlow<CreateEditRuleUiState> = _uiState.asStateFlow()

    init {
        val ruleDao = AppDatabase.getDatabase(application).ruleDao()
        repository = RuleRepository(ruleDao)
    }

    fun loadRule(ruleId: Long) {
        currentRuleId = ruleId
        _uiState.update { it.copy(isEditMode = true) }
        viewModelScope.launch {
            repository.getRuleById(ruleId)?.let { rule ->
                _uiState.update { state ->
                    state.copy(
                        selectedPackageName = rule.packageName,
                        selectedAppName = rule.appName,
                        intention = rule.intentionLabel,
                        limitHours = (rule.dailyLimitMinutes / 60).toString(),
                        limitMinutes = (rule.dailyLimitMinutes % 60).toString(),
                        trackingEnabled = rule.trackingEnabled,
                        warningEnabled = rule.warningEnabled
                    )
                }
            }
        }
    }

    fun onAppSelected(packageName: String, appName: String) {
        _uiState.update { it.copy(selectedPackageName = packageName, selectedAppName = appName) }
    }

    fun onIntentionChanged(value: String) {
        _uiState.update { it.copy(intention = value) }
    }

    fun onLimitHoursChanged(value: String) {
        if (value.all { it.isDigit() }) {
            _uiState.update { it.copy(limitHours = value) }
        }
    }

    fun onLimitMinutesChanged(value: String) {
        if (value.all { it.isDigit() }) {
            _uiState.update { it.copy(limitMinutes = value) }
        }
    }

    fun onTrackingEnabledChanged(value: Boolean) {
        _uiState.update { it.copy(trackingEnabled = value) }
    }

    fun onWarningEnabledChanged(value: Boolean) {
        _uiState.update { it.copy(warningEnabled = value) }
    }

    fun saveRule() {
        val state = _uiState.value
        
        // Validation
        if (state.selectedPackageName.isEmpty()) {
            _uiState.update { it.copy(errorMessage = "Please select an app") }
            return
        }
        if (state.intention.isBlank()) {
            _uiState.update { it.copy(errorMessage = "Please enter your intention") }
            return
        }
        
        val totalMinutes = (state.limitHours.toIntOrNull() ?: 0) * 60 + (state.limitMinutes.toIntOrNull() ?: 0)
        if (totalMinutes <= 0) {
            _uiState.update { it.copy(errorMessage = "Limit must be greater than 0") }
            return
        }

        viewModelScope.launch {
            _uiState.update { it.copy(isSaving = true, errorMessage = null) }
            
            val rule = RuleEntity(
                id = currentRuleId ?: 0,
                packageName = state.selectedPackageName,
                appName = state.selectedAppName,
                intentionLabel = state.intention,
                dailyLimitMinutes = totalMinutes,
                trackingEnabled = state.trackingEnabled,
                warningEnabled = state.warningEnabled,
                updatedAt = System.currentTimeMillis()
            )

            if (state.isEditMode) {
                repository.updateRule(rule)
            } else {
                repository.insertRule(rule)
            }
            
            _uiState.update { it.copy(isSaving = false, saveSuccess = true) }
        }
    }

    fun deleteRule() {
        val id = currentRuleId ?: return
        viewModelScope.launch {
            val rule = repository.getRuleById(id) ?: return@launch
            repository.deleteRule(rule)
            _uiState.update { it.copy(saveSuccess = true) }
        }
    }
}
