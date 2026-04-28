package com.example.conscia.model

import android.graphics.drawable.Drawable

data class TrackedAppInfo(
    val appName: String,
    val packageName: String,
    val icon: Drawable?,
    val isSelected: Boolean = false,
    val isRecommended: Boolean = false
)
