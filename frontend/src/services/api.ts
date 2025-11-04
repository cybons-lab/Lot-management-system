/**
 * API Client
 * フロントエンドからバックエンドAPIへのリクエストを管理
 */

import { http } from "./http";
import type { components } from "@/types/api.gen";

// ========================================
// 型定義
// ========================================

// 受注関連の型
type Order = components["schemas"]["OrderResponse"];
type OrderDetail = components["schemas"]["OrderWithLinesResponse"];

// 引当関連の型
type DragAssignRequest = components["schemas"]["DragAssignRequest"];
type DragAssignResponse = components["schemas"]["DragAssignResponse"];

// ロット関連の型
type Lot = components["schemas"]["LotResponse"];

// ========================================
// APIクライアント
// ========================================

export const api = {
  /**
   * 受注一覧を取得
   * @param params クエリパラメータ（フィルタ条件など）
   * @returns 受注リスト
   */
  getOrders: (params?: Record<string, unknown>) =>
    http.get<Order[]>("/orders", { params }).then((r) => r.data),

  /**
   * 受注詳細を取得
   * @param orderId 受注ID
   * @returns 受注詳細（明細行を含む）
   */
  getOrderDetail: (orderId: number) =>
    http.get<OrderDetail>(`/orders/${orderId}`).then((r) => r.data),

  /**
   * ドラッグ&ドロップによる引当実行
   * @param body 引当リクエストデータ
   * @returns 引当結果
   */
  dragAssignAllocation: (body: DragAssignRequest) =>
    http
      .post<DragAssignResponse>("/orders/allocations/drag-assign", body)
      .then((r) => r.data),

  /**
   * ロット一覧を取得
   * @param params クエリパラメータ（フィルタ条件など）
   * @returns ロットリスト
   */
  listLots: (params?: Record<string, unknown>) =>
    http.get<Lot[]>("/lots", { params }).then((r) => r.data),
};

// ========================================
// 型のエクスポート（必要に応じて）
// ========================================

export type { Order, OrderDetail, DragAssignRequest, DragAssignResponse, Lot };
