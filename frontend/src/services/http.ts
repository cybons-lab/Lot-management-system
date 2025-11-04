import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  // 認証やヘッダを入れるならここに追加
});

// 共通エラーハンドリング（必要に応じて）
http.interceptors.response.use(
  (r) => r,
  (err) => {
    // 422/400/404などの標準化をここで
    return Promise.reject(err);
  },
);
