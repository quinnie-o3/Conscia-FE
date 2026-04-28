package com.example.conscia.ui.dashboard

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.repeatOnLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.conscia.domain.model.TrackedAppLimitInfo
import com.example.conscia.domain.model.UsageLimitStatus
import com.example.conscia.model.AppUsageInfo
import com.example.conscia.util.TimeFormatters

@Composable
fun DashboardRoute(viewModel: DashboardViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()
    val lifecycleOwner = LocalLifecycleOwner.current

    LaunchedEffect(lifecycleOwner) {
        lifecycleOwner.repeatOnLifecycle(Lifecycle.State.RESUMED) {
            viewModel.refresh()
        }
    }

    DashboardContent(
        uiState = uiState,
        onGrantPermissionClick = { viewModel.onGrantUsageAccessClicked() }
    )
}

@Composable
fun DashboardContent(
    uiState: DashboardUiState,
    onGrantPermissionClick: () -> Unit
) {
    Scaffold(
        containerColor = Color.White,
        floatingActionButton = {
            if (uiState.hasUsagePermission) {
                ExtendedFloatingActionButton(
                    onClick = { /* TODO */ },
                    containerColor = Color(0xFF006654),
                    contentColor = Color.White,
                    shape = RoundedCornerShape(16.dp),
                    icon = { Icon(Icons.Default.Add, "Add") },
                    text = { Text("New Goal") }
                )
            }
        }
    ) { padding ->
        if (!uiState.hasUsagePermission) {
            PermissionRequiredView(onGrantPermissionClick, modifier = Modifier.padding(padding))
        } else if (uiState.isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator(color = Color(0xFF006654))
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(horizontal = 24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    Spacer(modifier = Modifier.height(24.dp))
                    UsageOverviewCard(
                        time = TimeFormatters.formatDurationShort(uiState.totalTodayUsageMillis),
                        exceededCount = uiState.exceededCount,
                        nearLimitCount = uiState.nearLimitCount
                    )
                }

                if (uiState.trackedAppStatuses.isNotEmpty()) {
                    item { SectionHeader("Tracked Apps") }
                    items(uiState.trackedAppStatuses) { statusInfo ->
                        TrackedAppStatusItem(statusInfo)
                    }
                }
                
                if (uiState.todayTopApps.isNotEmpty()) {
                    item { SectionHeader("Other App Activity") }
                    items(uiState.todayTopApps) { usage ->
                        UsageItem(usage)
                    }
                }

                item {
                    SectionHeader("Weekly Summary")
                    WeeklyPreviewCard(uiState.weeklyTotalUsageMillis)
                }

                item { Spacer(modifier = Modifier.height(80.dp)) }
            }
        }
    }
}

@Composable
fun SectionHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.Bold,
        modifier = Modifier.padding(vertical = 8.dp)
    )
}

@Composable
fun TrackedAppStatusItem(info: TrackedAppLimitInfo) {
    val statusColor = when (info.status) {
        UsageLimitStatus.EXCEEDED -> Color(0xFFEF4444)
        UsageLimitStatus.NEAR_LIMIT -> Color(0xFFF59E0B)
        UsageLimitStatus.NORMAL -> Color(0xFF006654)
    }

    val statusLabel = when (info.status) {
        UsageLimitStatus.EXCEEDED -> "Limit exceeded"
        UsageLimitStatus.NEAR_LIMIT -> "Almost at limit"
        UsageLimitStatus.NORMAL -> "On track"
    }

    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(
            containerColor = when (info.status) {
                UsageLimitStatus.EXCEEDED -> Color(0xFFFEF2F2)
                UsageLimitStatus.NEAR_LIMIT -> Color(0xFFFFFBEB)
                UsageLimitStatus.NORMAL -> Color(0xFFEAF5EA)
            }
        ),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .background(Color.White, RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(info.appName.take(1).uppercase(), fontWeight = FontWeight.Bold, color = statusColor)
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(info.appName, fontWeight = FontWeight.Bold)
                    Text(info.intentionLabel, style = MaterialTheme.typography.bodySmall, color = statusColor.copy(alpha = 0.7f))
                }
                Surface(
                    color = statusColor.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = statusLabel,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = statusColor
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(
                    text = "Used ${TimeFormatters.formatDurationShort(info.todayUsageMillis)}",
                    style = MaterialTheme.typography.labelMedium,
                    color = Color.Gray
                )
                Text(
                    text = "Limit: ${TimeFormatters.formatDurationDailyLimit(info.dailyLimitMinutes)}",
                    style = MaterialTheme.typography.labelMedium,
                    color = Color.Gray
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            LinearProgressIndicator(
                progress = { info.usagePercent.coerceAtMost(1.0f) },
                modifier = Modifier.fillMaxWidth().height(8.dp).clip(CircleShape),
                color = statusColor,
                trackColor = Color.White
            )
        }
    }
}

@Composable
fun UsageOverviewCard(time: String, exceededCount: Int, nearLimitCount: Int) {
    Card(
        shape = RoundedCornerShape(40.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFEAF5EA)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(32.dp)) {
            Text("Total screen time", style = MaterialTheme.typography.bodyLarge, color = Color(0xFF2D312E))
            Text(time, style = MaterialTheme.typography.displayMedium.copy(fontWeight = FontWeight.Bold, fontSize = 48.sp), color = Color(0xFF006654))
            
            if (exceededCount > 0 || nearLimitCount > 0) {
                Spacer(modifier = Modifier.height(12.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Warning, null, tint = if (exceededCount > 0) Color(0xFFEF4444) else Color(0xFFF59E0B), modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = buildString {
                            if (exceededCount > 0) append("$exceededCount app exceeded")
                            if (exceededCount > 0 && nearLimitCount > 0) append(", ")
                            if (nearLimitCount > 0) append("$nearLimitCount near limit")
                        },
                        style = MaterialTheme.typography.bodySmall,
                        color = if (exceededCount > 0) Color(0xFFEF4444) else Color(0xFFB45309)
                    )
                }
            } else {
                Spacer(modifier = Modifier.height(8.dp))
                Text("All tracked apps are within limits", style = MaterialTheme.typography.bodyMedium, color = Color(0xFF4A8B71))
            }
        }
    }
}

@Composable
fun WeeklyPreviewCard(totalMillis: Long) {
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF8F9FA)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text("Last 7 Days", style = MaterialTheme.typography.labelLarge, color = Color.Gray)
            Text(TimeFormatters.formatDurationShort(totalMillis), style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun PermissionRequiredView(onGrantClick: () -> Unit, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier.fillMaxSize().padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Surface(modifier = Modifier.size(120.dp), shape = RoundedCornerShape(32.dp), color = Color(0xFFEAF5EA)) {
            Box(contentAlignment = Alignment.Center) {
                Icon(Icons.Default.Lock, null, modifier = Modifier.size(48.dp), tint = Color(0xFF006654))
            }
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text("Usage access required", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center)
        Spacer(modifier = Modifier.height(12.dp))
        Text("Conscia needs usage access to show your real app activity and weekly insights.", style = MaterialTheme.typography.bodyMedium, color = Color.Gray, textAlign = TextAlign.Center)
        Spacer(modifier = Modifier.height(32.dp))
        Button(
            onClick = onGrantClick,
            modifier = Modifier.fillMaxWidth().height(56.dp),
            shape = RoundedCornerShape(28.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF006654))
        ) {
            Text("Grant Access", fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun UsageItem(usage: AppUsageInfo) {
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF8F9FA)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier.size(48.dp).background(Color(0xFFE2E8F0), RoundedCornerShape(12.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text(usage.appName.take(1).uppercase(), fontWeight = FontWeight.Bold, color = Color.DarkGray)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(usage.appName, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Text(usage.packageName, style = MaterialTheme.typography.labelSmall, color = Color.LightGray)
            }
            Text(TimeFormatters.formatDurationShort(usage.totalTimeInForegroundMillis), style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = Color(0xFF006654))
        }
    }
}
