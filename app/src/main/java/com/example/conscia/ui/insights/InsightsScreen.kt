package com.example.conscia.ui.insights

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun InsightsRoute() {
    Scaffold(
        containerColor = Color(0xFFF8FAFC)
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(24.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.Top
                ) {
                    Text(
                        text = "Insights",
                        style = MaterialTheme.typography.displaySmall,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1E293B)
                    )
                    // Cloud icon placeholder
                    Box(
                        modifier = Modifier
                            .size(60.dp, 40.dp)
                            .background(Color(0xFFE0F2FE), RoundedCornerShape(20.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                         // Simple cloud shape
                         Box(modifier = Modifier.size(20.dp).background(Color.White, CircleShape).offset(x = (-10).dp))
                         Box(modifier = Modifier.size(24.dp).background(Color.White, CircleShape))
                         Box(modifier = Modifier.size(18.dp).background(Color.White, CircleShape).offset(x = 10.dp))
                    }
                }
            }

            // Date Selector
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "April 2-8",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF1E293B)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(Color(0xFFEFF6FF))
                            .padding(horizontal = 4.dp)
                    ) {
                        IconButton(onClick = { }, modifier = Modifier.size(32.dp)) {
                            Icon(Icons.AutoMirrored.Filled.KeyboardArrowLeft, null, tint = Color(0xFF3B82F6))
                        }
                        Box(modifier = Modifier.width(1.dp).height(16.dp).background(Color(0xFFDBEAFE)).align(Alignment.CenterVertically))
                        IconButton(onClick = { }, modifier = Modifier.size(32.dp)) {
                            Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, null, tint = Color(0xFF3B82F6))
                        }
                    }
                }
            }

            // Chart Section
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Donut Chart
                    Box(
                        modifier = Modifier.size(160.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Canvas(modifier = Modifier.size(120.dp)) {
                            // Background circle
                            drawCircle(Color(0xFFF1F5F9), style = Stroke(width = 20.dp.toPx()))
                            
                            // Segments
                            drawArc(
                                color = Color(0xFF26C6DA), // Teal
                                startAngle = -90f,
                                sweepAngle = 216f, // 60%
                                useCenter = false,
                                style = Stroke(width = 20.dp.toPx(), cap = StrokeCap.Round)
                            )
                            drawArc(
                                color = Color(0xFFA5D6A7), // Light Green
                                startAngle = 126f,
                                sweepAngle = 72f, // 20%
                                useCenter = false,
                                style = Stroke(width = 20.dp.toPx(), cap = StrokeCap.Round)
                            )
                            drawArc(
                                color = Color(0xFFFFEB3B), // Yellow
                                startAngle = 198f,
                                sweepAngle = 72f, // 20%
                                useCenter = false,
                                style = Stroke(width = 20.dp.toPx(), cap = StrokeCap.Round)
                            )
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("68%", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E293B))
                            Text("Purposeful", fontSize = 12.sp, color = Color(0xFF64748B))
                        }
                    }

                    Spacer(modifier = Modifier.width(16.dp))

                    // Chart Labels
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Column {
                            Text("60% Purposeful", fontSize = 12.sp, color = Color(0xFF64748B))
                            Text("1h 15m", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF4CAF50))
                            Spacer(modifier = Modifier.height(4.dp))
                            Box(modifier = Modifier.width(100.dp).height(1.dp).background(Color(0xFFE2E8F0)))
                        }
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.LocationOn, null, tint = Color(0xFF4CAF50), modifier = Modifier.size(24.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text("36m", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF4CAF50))
                        }
                    }
                }
            }

            // Reflection Card
            item {
                Card(
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(24.dp)) {
                        Text(
                            text = "Weekly Reflection",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1E293B)
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(
                            text = "You spent 45m mainly learning, but aimed for 30m",
                            style = MaterialTheme.typography.bodyLarge,
                            color = Color(0xFF64748B),
                            lineHeight = 24.sp
                        )
                        Spacer(modifier = Modifier.height(24.dp))
                        Button(
                            onClick = { },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(56.dp),
                            shape = RoundedCornerShape(28.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF26C6DA))
                        ) {
                            Text("Save Reflection", fontWeight = FontWeight.Bold, color = Color.White, fontSize = 16.sp)
                        }
                    }
                }
            }
            
            item { Spacer(modifier = Modifier.height(32.dp)) }
        }
    }
}
