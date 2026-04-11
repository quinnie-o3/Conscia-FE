package com.example.conscia

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.conscia.ui.dashboard.DashboardRoute
import com.example.conscia.ui.onboarding.OnboardingRoute
import com.example.conscia.ui.permissions.PermissionsRoute
import com.example.conscia.ui.tracking.SelectTrackedAppsRoute
import com.example.conscia.ui.rules.RulesRoute
import com.example.conscia.ui.intention.IntentionRoute
import com.example.conscia.ui.insights.InsightsRoute
import com.example.conscia.ui.settings.SettingsRoute

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ConsciaAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation()
                }
            }
        }
    }
}

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "onboarding") {
        composable("onboarding") {
            OnboardingRoute(
                onGetStartedClick = { navController.navigate("permissions") }
            )
        }
        composable("permissions") {
            PermissionsRoute(
                onContinueClick = { navController.navigate("dashboard") }
            )
        }
        composable("dashboard") {
            DashboardRoute()
        }
        composable("select_apps") {
            SelectTrackedAppsRoute(
                onNotificationClick = { /* TODO */ },
                onMenuClick = { /* TODO */ }
            )
        }
        composable("rules") {
            RulesRoute(
                onBackClick = { navController.popBackStack() },
                onSaveClick = { navController.navigate("dashboard") }
            )
        }
        composable("intention") {
            IntentionRoute(
                onBackClick = { navController.popBackStack() },
                onContinueClick = { navController.navigate("dashboard") }
            )
        }
        composable("insights") {
            InsightsRoute()
        }
        composable("settings") {
            SettingsRoute(
                onBackClick = { navController.popBackStack() },
                onNavigateToSection = { sectionId ->
                    when (sectionId) {
                        "tracked_apps" -> navController.navigate("select_apps")
                        "permissions" -> navController.navigate("permissions")
                        // Add more mappings as needed
                    }
                }
            )
        }
    }
}

@Composable
fun ConsciaAppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        // You can customize your theme colors here
        content = content
    )
}
