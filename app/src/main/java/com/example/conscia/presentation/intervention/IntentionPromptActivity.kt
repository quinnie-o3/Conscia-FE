package com.example.conscia.presentation.intervention

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.conscia.ConsciaAppTheme
import com.example.conscia.ui.intention.IntentionRoute

class IntentionPromptActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        val packageName = intent.getStringExtra("EXTRA_PACKAGE_NAME") ?: ""
        val appName = intent.getStringExtra("EXTRA_APP_NAME") ?: "App"
        
        setContent {
            ConsciaAppTheme {
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
