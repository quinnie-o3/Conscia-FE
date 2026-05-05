package com.example.conscia.presentation.intervention

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import com.example.conscia.ConsciaAppTheme
import com.example.conscia.data.TrackedAppsDataStore
import com.example.conscia.ui.intention.IntentionRoute

class IntentionPromptActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        val packageName = intent.getStringExtra("EXTRA_PACKAGE_NAME") ?: ""
        val appName = intent.getStringExtra("EXTRA_APP_NAME") ?: "App"
        
        setContent {
            val dataStore = remember { TrackedAppsDataStore(this@IntentionPromptActivity) }
            val isDarkMode by dataStore.isDarkModeFlow.collectAsState(initial = false)

            ConsciaAppTheme(darkTheme = isDarkMode) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    IntentionRoute(
                        appName = appName,
                        onBackClick = { finish() },
                        onContinueClick = { intentions ->
                            // TODO: Log intentions
                            finish()
                        }
                    )
                }
            }
        }
    }
}
