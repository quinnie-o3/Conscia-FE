package com.example.conscia.ui.dashboard

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.conscia.data.AppDatabase
import com.example.conscia.data.rule.RuleRepository
import com.example.conscia.data.usage.UsagePermissionHelper
import com.example.conscia.data.usage.UsageStatsRepository
import com.example.conscia.domain.model.UsageLimitStatus
import com.example.conscia.domain.usecase.EvaluateTrackedAppsUsageUseCase
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class DashboardViewModel(application: Application) : AndroidViewModel(application) {
    private val usageRepository = UsageStatsRepository(application)
    private val ruleRepository = RuleRepository(AppDatabase.getDatabase(application).ruleDao())
    private val evaluateUseCase = EvaluateTrackedAppsUsageUseCase()
    
    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        val hasPermission = UsagePermissionHelper.isUsageAccessGranted(getApplication())
        _uiState.update { it.copy(hasUsagePermission = hasPermission) }
        
        if (hasPermission) {
            loadDashboardData()
        } else {
            _uiState.update { it.copy(isLoading = false) }
        }
    }

    private fun loadDashboardData() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            try {
                // 1. Get real usage data
                val todayUsage = usageRepository.getTodayUsage()
                val totalToday = todayUsage.sumOf { it.totalTimeInForegroundMillis }
                
                // 2. Get weekly preview
                val weeklyBreakdown = usageRepository.getWeeklyUsageBreakdown()
                val totalWeekly = weeklyBreakdown.sumOf { it.totalForegroundMillis }
                
                // 3. Get rules
                val allRules = ruleRepository.allRules.first()
                
                // 4. Evaluate limit status for tracked apps
                val trackedStatuses = evaluateUseCase.execute(allRules, todayUsage)
                
                val exceeded = trackedStatuses.count { it.status == UsageLimitStatus.EXCEEDED }
                val nearLimit = trackedStatuses.count { it.status == UsageLimitStatus.NEAR_LIMIT }

                _uiState.update { 
                    it.copy(
                        isLoading = false,
                        hasUsagePermission = true,
                        totalTodayUsageMillis = totalToday,
                        todayTopApps = todayUsage.take(5),
                        trackedAppStatuses = trackedStatuses,
                        weeklyTotalUsageMillis = totalWeekly,
                        weeklyPreview = weeklyBreakdown,
                        exceededCount = exceeded,
                        nearLimitCount = nearLimit,
                        isEmpty = todayUsage.isEmpty() && trackedStatuses.isEmpty(),
                        errorMessage = null
                    )
                }
            } catch (e: Exception) {
                _uiState.update { 
                    it.copy(
                        isLoading = false, 
                        errorMessage = "Failed to load usage data: ${e.message}"
                    )
                }
            }
        }
    }

    fun onGrantUsageAccessClicked() {
        UsagePermissionHelper.openUsageAccessSettings(getApplication())
    }
}
