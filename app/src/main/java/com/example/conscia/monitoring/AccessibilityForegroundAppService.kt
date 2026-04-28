package com.example.conscia.monitoring

import android.accessibilityservice.AccessibilityService
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageManager
import android.view.accessibility.AccessibilityEvent
import com.example.conscia.data.AppDatabase
import com.example.conscia.data.rule.RuleRepository
import com.example.conscia.presentation.intervention.IntentionPromptActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

class AccessibilityForegroundAppService : AccessibilityService() {

    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    private lateinit var ruleRepository: RuleRepository
    
    private var lastPackageName: String? = null
    private var lastTriggerTime: Long = 0
    private val COOLDOWN_MS = 30000 // 30 seconds cooldown per app

    override fun onCreate() {
        super.onCreate()
        val ruleDao = AppDatabase.getDatabase(this).ruleDao()
        ruleRepository = RuleRepository(ruleDao)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: return
            
            // 1. Lọc nhiễu
            if (packageName == this.packageName || packageName == "com.android.systemui") return
            if (packageName == lastPackageName) return
            
            lastPackageName = packageName

            // 2. Kiểm tra Rule
            serviceScope.launch {
                val rules = ruleRepository.allRules.first()
                val activeRule = rules.find { it.packageName == packageName && it.trackingEnabled }
                
                if (activeRule != null) {
                    val currentTime = System.currentTimeMillis()
                    if (currentTime - lastTriggerTime > COOLDOWN_MS) {
                        lastTriggerTime = currentTime
                        launchIntentionPrompt(activeRule.packageName, activeRule.appName, activeRule.id)
                    }
                }
            }
        }
    }

    private fun launchIntentionPrompt(packageName: String, appName: String, ruleId: Long) {
        val intent = Intent(this, IntentionPromptActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            putExtra("EXTRA_PACKAGE_NAME", packageName)
            putExtra("EXTRA_APP_NAME", appName)
            putExtra("EXTRA_RULE_ID", ruleId)
        }
        startActivity(intent)
    }

    override fun onInterrupt() {}
}
