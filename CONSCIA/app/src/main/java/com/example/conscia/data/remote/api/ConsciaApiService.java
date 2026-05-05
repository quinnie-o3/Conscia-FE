package com.example.conscia.data.remote.api;

import com.example.conscia.data.remote.dto.*; // Import các DTO bạn đã tạo
import java.util.List;
import retrofit2.Call;
import retrofit2.http.*;

public interface ConsciaApiService {
    // Lấy dữ liệu Insights cho màn hình biểu đồ
    @GET("stats/usage-by-purpose")
    Call<InsightResponse> getPurposeInsights(
        @Header("Authorization") String token,
        @Query("period") String period,
        @Query("date") String date
    );

    // Gửi dữ liệu sử dụng từ Android lên Backend
    @POST("sessions/sync")
    Call<Void> syncSessions(
        @Header("Authorization") String token,
        @Body SyncSessionsBatchRequest body
    );
}