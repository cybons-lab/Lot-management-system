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
  // --- 倉庫配分 ---
  WarehouseListResponse,
  OrdersWithAllocResponse,
  SaveAllocationsRequest,
  SaveAllocationsResponse,
  // --- Forecast一覧 ---
  ForecastListResponse,
  ForecastListParams,
  WarehouseAlloc,
} from "@/types";

// 🔽 基準となるURLをここで定義
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
 * 汎用API呼び出し (GET, POST)
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  return handleResponse<T>(response);
}

/**
 * APIクライアント
 */
export const api = {
  // --- Lot endpoints ---
  getLots: () =>
    fetchApi<LotResponse[]>("/lots", {
      method: "GET",
      // 🔽 クエリパラメータはURLに含める (v2.0では ?with_stock=true がデフォルト)
      // fetchApi("/lots?with_stock=true", { method: "GET" })
    }),
  getLot: (id: number) =>
    fetchApi<LotResponse>(`/lots/${id}`, { method: "GET" }),
  createLot: (data: LotCreate) =>
    fetchApi<LotResponse>("/lots", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // --- Order endpoints ---
  getOrders: (params: OrdersListParams) => {
    const searchParams = new URLSearchParams();
    if (params.skip !== undefined)
      searchParams.append("skip", params.skip.toString());
    if (params.limit !== undefined)
      searchParams.append("limit", params.limit.toString());
    if (params.status) searchParams.append("status", params.status);
    if (params.customer_code)
      searchParams.append("customer_code", params.customer_code);

    const queryString = searchParams.toString();
    return fetchApi<OrderResponse[]>(
      `/orders${queryString ? "?" + queryString : ""}`,
      {
        method: "GET",
      }
    );
  },
  getOrder: (orderId: number) =>
    fetchApi<OrderWithLinesResponse>(`/orders/${orderId}`, { method: "GET" }),
  reMatchOrder: (orderId: number) =>
    fetchApi<ReMatchResponse>(`/orders/${orderId}/re-match`, {
      method: "POST",
    }),

  // --- Master endpoints ---
  getProducts: () =>
    fetchApi<Product[]>("/masters/products", { method: "GET" }),
  getSuppliers: () =>
    fetchApi<Supplier[]>("/masters/suppliers", { method: "GET" }),
  getWarehouses: () =>
    fetchApi<OldWarehouse[]>("/masters/warehouses", { method: "GET" }),

  // --- Admin endpoints ---
  getStats: () => fetchApi<DashboardStats>("/admin/stats", { method: "GET" }),
  resetDatabase: () =>
    fetchApi<ResetResponse>("/admin/reset-database", { method: "POST" }),
  loadFullSampleData: (data: any) =>
    fetchApi<ResetResponse>("/admin/load-full-sample-data", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // --- Forecast Import ---
  bulkImportForecast: (data: ForecastBulkRequest) =>
    fetchApi<ForecastBulkResponse>("/forecast/bulk", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // --- Warehouse Allocation Endpoints ---
  getWarehouseAllocList: () =>
    fetchApi<WarehouseListResponse>("/warehouse-alloc/warehouses", {
      method: "GET",
    }),
  getOrdersWithAllocations: () =>
    fetchApi<OrdersWithAllocResponse>("/orders/orders-with-allocations", {
      method: "GET",
    }),
  saveWarehouseAllocations: (
    orderLineId: number,
    allocations: WarehouseAlloc[]
  ) =>
    fetchApi<SaveAllocationsResponse>(
      `/orders/${orderLineId}/warehouse-allocations`,
      {
        method: "POST",
        body: JSON.stringify({ allocations } as SaveAllocationsRequest),
      }
    ),

  // --- Forecast List Endpoint ---
  getForecastList: (params: ForecastListParams) => {
    const searchParams = new URLSearchParams();
    if (params.product_code)
      searchParams.append("product_code", params.product_code);
    if (params.supplier_code)
      searchParams.append("supplier_code", params.supplier_code);

    const queryString = searchParams.toString();
    return fetchApi<ForecastListResponse>(
      `/forecast/list${queryString ? "?" + queryString : ""}`,
      {
        method: "GET",
      }
    );
  },

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
