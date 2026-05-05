package com.example.conscia

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Rule
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.outlined.Dashboard
import androidx.compose.material.icons.outlined.History
import androidx.compose.material.icons.outlined.Rule
import androidx.compose.material.icons.outlined.Schedule
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.conscia.data.TrackedAppsDataStore
import com.example.conscia.ui.dashboard.DashboardRoute
import com.example.conscia.ui.onboarding.OnboardingRoute
import com.example.conscia.ui.onboarding.ChooseAppsToTrackScreen
import com.example.conscia.ui.permissions.PermissionsRoute
import com.example.conscia.ui.rules.RulesRoute
import com.example.conscia.ui.rules.CreateEditRuleScreen
import com.example.conscia.ui.rules.SelectRuleAppScreen
import com.example.conscia.ui.intention.IntentionRoute
import com.example.conscia.ui.insights.InsightsRoute
import com.example.conscia.ui.settings.SettingsRoute
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val dataStore = remember { TrackedAppsDataStore(this@MainActivity) }
            val scope = rememberCoroutineScope()
            val isDarkMode by dataStore.isDarkModeFlow.collectAsState(initial = false)

            ConsciaAppTheme(darkTheme = isDarkMode) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation(
                        dataStore = dataStore,
                        isDarkMode = isDarkMode,
                        onDarkModeChange = { enabled ->
                            scope.launch {
                                dataStore.setDarkModeEnabled(enabled)
                            }
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun AppNavigation(
    dataStore: TrackedAppsDataStore,
    isDarkMode: Boolean,
    onDarkModeChange: (Boolean) -> Unit
) {
    val scope = rememberCoroutineScope()
    val deviceId by dataStore.deviceIdFlow.collectAsState(initial = null)
    
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination

    val screensWithBottomBar = listOf("dashboard", "rules", "intention", "insights", "settings")
    val showBottomBar = currentDestination?.route?.split("/")?.firstOrNull() in screensWithBottomBar

    if (deviceId == null) {
        // Show a blank box while waiting for DataStore to load
        Box(modifier = Modifier.fillMaxSize())
        return
    }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface,
                    tonalElevation = 8.dp
                ) {
                    NavigationBarItem(
                        icon = { Icon(if (currentDestination?.hierarchy?.any { it.route == "dashboard" } == true) Icons.Default.Dashboard else Icons.Outlined.Dashboard, null) },
                        label = { Text("Home") },
                        selected = currentDestination?.hierarchy?.any { it.route == "dashboard" } == true,
                        onClick = {
                            navController.navigate("dashboard") {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                    NavigationBarItem(
                        icon = { Icon(if (currentDestination?.hierarchy?.any { it.route == "rules" } == true) Icons.Default.Rule else Icons.Outlined.Rule, null) },
                        label = { Text("Rules") },
                        selected = currentDestination?.hierarchy?.any { it.route == "rules" } == true,
                        onClick = {
                            navController.navigate("rules") {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                    NavigationBarItem(
                        icon = { Icon(if (currentDestination?.hierarchy?.any { it.route == "intention" } == true) Icons.Default.Schedule else Icons.Outlined.Schedule, null) },
                        label = { Text("Sessions") },
                        selected = currentDestination?.hierarchy?.any { it.route == "intention" } == true,
                        onClick = {
                            navController.navigate("intention") {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                    NavigationBarItem(
                        icon = { Icon(if (currentDestination?.hierarchy?.any { it.route == "insights" } == true) Icons.Default.History else Icons.Outlined.History, null) },
                        label = { Text("Insights") },
                        selected = currentDestination?.hierarchy?.any { it.route == "insights" } == true,
                        onClick = {
                            navController.navigate("insights") {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                    NavigationBarItem(
                        icon = { Icon(if (currentDestination?.hierarchy?.any { it.route == "settings" } == true) Icons.Default.Settings else Icons.Outlined.Settings, null) },
                        label = { Text("Settings") },
                        selected = currentDestination?.hierarchy?.any { it.route == "settings" } == true,
                        onClick = {
                            navController.navigate("settings") {
                                popUpTo(navController.graph.findStartDestination().id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = if (deviceId != null) "dashboard" else "onboarding",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("onboarding") {
                OnboardingRoute(onGetStartedClick = { navController.navigate("choose_apps") })
            }
            composable("choose_apps") {
                ChooseAppsToTrackScreen(onNavigateToPermissions = { navController.navigate("permissions") })
            }
            composable("permissions") {
                PermissionsRoute(onContinueClick = { 
                    scope.launch {
                        dataStore.generateAndSaveDeviceId()
                    }
                    navController.navigate("dashboard") { popUpTo("onboarding") { inclusive = true } }
                })
            }
            composable("dashboard") { DashboardRoute() }
            
            composable("rules") {
                RulesRoute(
                    onBackClick = { navController.popBackStack() },
                    onCreateRuleClick = { navController.navigate("create_rule/-1") },
                    onEditRuleClick = { ruleId -> navController.navigate("create_rule/$ruleId") }
                )
            }
            
            composable(
                route = "create_rule/{ruleId}",
                arguments = listOf(navArgument("ruleId") { type = NavType.LongType })
            ) { backStackEntry ->
                val ruleId = backStackEntry.arguments?.getLong("ruleId")
                val selectedRuleAppPackage by backStackEntry.savedStateHandle
                    .getStateFlow("selected_rule_app_package", "")
                    .collectAsState()
                val selectedRuleAppName by backStackEntry.savedStateHandle
                    .getStateFlow("selected_rule_app_name", "")
                    .collectAsState()
                CreateEditRuleScreen(
                    ruleId = ruleId,
                    onBackClick = { navController.popBackStack() },
                    onSelectAppClick = { navController.navigate("choose_rule_app") },
                    selectedAppPackageName = selectedRuleAppPackage,
                    selectedAppName = selectedRuleAppName,
                    onSelectedAppConsumed = {
                        backStackEntry.savedStateHandle.remove<String>("selected_rule_app_package")
                        backStackEntry.savedStateHandle.remove<String>("selected_rule_app_name")
                    }
                )
            }

            composable("choose_rule_app") {
                SelectRuleAppScreen(
                    onBackClick = { navController.popBackStack() },
                    onAppSelected = { packageName, appName ->
                        navController.previousBackStackEntry?.savedStateHandle?.set(
                            "selected_rule_app_package",
                            packageName
                        )
                        navController.previousBackStackEntry?.savedStateHandle?.set(
                            "selected_rule_app_name",
                            appName
                        )
                        navController.popBackStack()
                    }
                )
            }
            
            composable("choose_apps_selection") {
                ChooseAppsToTrackScreen(onNavigateToPermissions = { navController.popBackStack() })
            }

            composable("intention") {
                IntentionRoute(appName = "App", onBackClick = { navController.popBackStack() }, onContinueClick = { /* TODO */ })
            }
            composable("insights") { InsightsRoute() }
            composable("settings") {
                SettingsRoute(
                    onBackClick = { navController.popBackStack() },
                    isDarkMode = isDarkMode,
                    onDarkModeChange = onDarkModeChange,
                    onNavigateToSection = { sectionId ->
                        when (sectionId) {
                            "tracked_apps" -> navController.navigate("choose_apps_selection")
                            "permissions" -> navController.navigate("permissions")
                        }
                    }
                )
            }
        }
    }
}

@Composable
fun ConsciaAppTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        darkTheme -> darkColorScheme(
            primary = Color(0xFF80CBC4),
            secondary = Color(0xFFB2DFDB),
            tertiary = Color(0xFFFFCCBC),
            background = Color(0xFF111827),
            surface = Color(0xFF1F2937),
            surfaceVariant = Color(0xFF253041),
            onBackground = Color(0xFFF8FAFC),
            onSurface = Color(0xFFF8FAFC),
            onSurfaceVariant = Color(0xFFCBD5E1),
            outlineVariant = Color(0xFF334155)
        )
        else -> lightColorScheme(
            primary = Color(0xFF006654),
            secondary = Color(0xFF4A8B71),
            tertiary = Color(0xFF7D5260),
            background = Color(0xFFF8FAFC),
            surface = Color.White,
            surfaceVariant = Color(0xFFF1F5F9),
            onBackground = Color(0xFF0F172A),
            onSurface = Color(0xFF0F172A),
            onSurfaceVariant = Color(0xFF64748B),
            outlineVariant = Color(0xFFE2E8F0)
        )
    }

    MaterialTheme(colorScheme = colorScheme, content = content)
}
