// src/lib/api-client.ts
import type {
  LotResponse,
  LotCreate,
  Product,
  Supplier,
  OldWarehouse, // 既存の /masters/warehouses 用
  DashboardStats,
  OrderResponse,
  OrderWithLinesResponse,
  OrdersListParams,
  ReMatchResponse,
  ForecastBulkRequest,
  ForecastBulkResponse,
  ResetResponse,
  // --- 今回の追加 ---
  Warehouse, // 新しい /warehouse-alloc/warehouses 用
  WarehouseListResponse,
  OrdersWithAllocResponse,
  SaveAllocationsRequest,
  SaveAllocationsResponse,
  ForecastListResponse,
  ForecastListParams,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

/**
 * 汎用レスポンスハンドラ
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "不明なエラーが発生しました" }));
    const message =
      error.detail || error.message || "APIリクエストに失敗しました";
    throw new Error(message);
  }
  if (response.status === 204) {
    return null as T;
  }
  return response.json();
}

/**
 * 汎用 GET
 */
async function get<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
  }
  const response = await fetch(url.toString());
  return handleResponse<T>(response);
}

/**
 * 汎用 POST
 */
async function post<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

/**
 * APIクライアント
 */
export const api = {
  // --- Lot endpoints (v2.0) ---
  getLots: () => get<LotResponse[]>("/lots", { with_stock: true }),
  getLot: (id: number) => get<LotResponse>(`/lots/${id}`),
  createLot: (data: LotCreate) => post<LotResponse>("/lots", data),

  // --- Order endpoints (v2.0) ---
  getOrders: (params: OrdersListParams) =>
    get<OrderResponse[]>("/orders", params),
  getOrder: (orderId: number) =>
    get<OrderWithLinesResponse>(`/orders/${orderId}`),
  reMatchOrder: (orderId: number) =>
    post<ReMatchResponse>(`/orders/${orderId}/re-match`, {}),

  // --- Master endpoints (v2.0) ---
  getProducts: () => get<Product[]>("/masters/products"),
  getSuppliers: () => get<Supplier[]>("/masters/suppliers"),
  getWarehouses: () => get<OldWarehouse[]>("/masters/warehouses"), // 既存

  // --- Admin endpoints ---
  getStats: () => get<DashboardStats>("/admin/stats"),
  resetDatabase: () => post<ResetResponse>("/admin/reset-database", {}),

  // --- Forecast Import ---
  bulkImportForecast: (data: ForecastBulkRequest) =>
    post<ForecastBulkResponse>("/forecast/bulk", data),

  // ---
  // 🔽 [ここから今回の機能追加分]
  // ---

  // --- Warehouse Allocation Endpoints ---

  /**
   * (新) 配分用倉庫マスタ一覧を取得
   */
  getWarehouseAllocList: () =>
    get<WarehouseListResponse>("/warehouse-alloc/warehouses"),

  /**
   * (新) 倉庫配分情報付きの受注一覧を取得
   */
  getOrdersWithAllocations: () =>
    get<OrdersWithAllocResponse>("/orders/orders-with-allocations"),

  /**
   * (新) 倉庫配分情報を保存
   */
  saveWarehouseAllocations: (
    orderLineId: number,
    allocations: SaveAllocationsRequest["allocations"]
  ) =>
    post<SaveAllocationsResponse>(
      `/orders/${orderLineId}/warehouse-allocations`,
      { allocations } // SaveAllocationsRequest の形式
    ),

  // --- Forecast List Endpoint ---

  /**
   * (新) Forecast一覧を取得
   */
  getForecastList: (params: ForecastListParams) =>
    get<ForecastListResponse>("/forecast/list", params),

  // --- CSV Export Helper ---
  exportToCSV(data: any[], filename: string): void {
    if (!data || data.length === 0) {
      console.warn("No data to export");
      return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return "";
            const stringValue = String(value);
            if (
              stringValue.includes(",") ||
              stringValue.includes("\n") ||
              stringValue.includes('"')
            ) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
