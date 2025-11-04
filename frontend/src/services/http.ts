/**
 * HTTP Client
 * Axiosインスタンスの設定と共通処理
 */

import axios from "axios";

// ========================================
// Axiosインスタンスの作成
// ========================================

export const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30秒
});

// ========================================
// リクエストインターセプター
// ========================================

http.interceptors.request.use(
  (config) => {
    // 認証トークンの追加（必要に応じて）
    // const token = localStorage.getItem("auth_token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// レスポンスインターセプター
// ========================================

http.interceptors.response.use(
  (response) => {
    // 成功時はそのまま返す
    return response;
  },
  (error) => {
    // エラーハンドリングの標準化
    if (error.response) {
      // サーバーからのエラーレスポンス
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          break;
        case 401:
          console.error("Unauthorized:", data);
          // 認証エラー時の処理（ログイン画面への遷移など）
          break;
        case 403:
          console.error("Forbidden:", data);
          break;
        case 404:
          console.error("Not Found:", data);
          break;
        case 422:
          console.error("Validation Error:", data);
          break;
        case 500:
          console.error("Internal Server Error:", data);
          break;
        default:
          console.error("Error:", status, data);
      }
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      console.error("No response received:", error.request);
    } else {
      // リクエスト設定時のエラー
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);
