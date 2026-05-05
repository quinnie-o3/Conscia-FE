package com.example.conscia.worker

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.conscia.domain.usecase.CheckUsageLimitWarningsUseCase

class UsageLimitCheckWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            val useCase = CheckUsageLimitWarningsUseCase(applicationContext)
            useCase.execute()
            Result.success()
        } catch (e: Exception) {
            Result.retry()
        }
    }
}
