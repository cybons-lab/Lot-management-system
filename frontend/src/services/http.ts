/**
 * HTTP Client
 * axios を使用した HTTP クライアント
 * baseURL: "/api"
 */

import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// レスポンスインターセプター（エラーハンドリング）
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
