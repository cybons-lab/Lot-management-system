import { http } from "./http";
import type { components } from "@/types/api.gen"; // openapi-typescript の出力

// 型エイリアス（必要に応じて増やす）
type DragAssignReq = components["schemas"]["DragAssignRequest"];
type DragAssignRes = components["schemas"]["DragAssignResponse"];
type Order = components["schemas"]["OrderResponse"];
type OrderDetail = components["schemas"]["OrderWithLinesResponse"];
type LotsListItem = components["schemas"]["LotResponse"];

export const api = {
  // 受注
  getOrders: (params?: Record<string, unknown>) =>
    http.get<Order[]>("/orders", { params }).then((r) => r.data),

  getOrderDetail: (orderId: number) =>
    http.get<OrderDetail>(`/orders/${orderId}`).then((r) => r.data),

  // 引当（ドラッグアサイン）
  dragAssignAllocation: (body: DragAssignReq) =>
    http.post<DragAssignRes>("/orders/allocations/drag-assign", body).then((r) => r.data),

  // ロット
  listLots: (params?: Record<string, unknown>) =>
    http.get<LotsListItem[]>("/lots", { params }).then((r) => r.data),
};
