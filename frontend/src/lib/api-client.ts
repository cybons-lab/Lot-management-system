import type {
  LotResponse, // Lot -> LotResponse
  LotCreate, // CreateLotInput -> LotCreate
  Product,
  Supplier,
  Warehouse,
  DashboardStatsResponse,
  OrderResponse, // 追記
  OrderWithLinesResponse, // 追記
} from "@/types";

const API_BASE_URL = "http://localhost:8000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Unknown error" }));
    const message = error.detail || error.message || "API request failed"; // v2.0のエラー形式に対応
    throw new Error(message);
  }
  if (response.status === 204) {
    return null as T;
  }
  return response.json();
}

export const api = {
  // --- Lot endpoints (v2.0) ---
  async getLots(): Promise<LotResponse[]> {
    const response = await fetch(`${API_BASE_URL}/lots?with_stock=true`); // ?with_stock=true をデフォルトに
    return handleResponse<LotResponse[]>(response);
  },

  async getLot(id: number): Promise<LotResponse> {
    const response = await fetch(`${API_BASE_URL}/lots/${id}`);
    return handleResponse<LotResponse>(response);
  },

  async createLot(data: LotCreate): Promise<LotResponse> {
    const response = await fetch(`${API_BASE_URL}/lots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<LotResponse>(response);
  },

  // updateLot, deleteLot は一旦省略 (v2.0スキーマに合わせる必要あり)

  // --- Order endpoints (ここから追記) ---
  async getOrders(): Promise<OrderResponse[]> {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return handleResponse<OrderResponse[]>(response);
  },

  async getOrderDetails(orderId: number): Promise<OrderWithLinesResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    return handleResponse<OrderWithLinesResponse>(response);
  },

  // --- Master endpoints (v2.0) ---
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/masters/products`);
    return handleResponse<Product[]>(response);
  },

  async getSuppliers(): Promise<Supplier[]> {
    const response = await fetch(`${API_BASE_URL}/masters/suppliers`);
    return handleResponse<Supplier[]>(response);
  },

  async getWarehouses(): Promise<Warehouse[]> {
    const response = await fetch(`${API_BASE_URL}/masters/warehouses`);
    return handleResponse<Warehouse[]>(response);
  },

  // (古いShipmentエンドポイントは削除)

  // --- Admin endpoints ---
  async getStats(): Promise<DashboardStatsResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);
    return handleResponse<DashboardStatsResponse>(response);
  },

  async resetDatabase(): Promise<{
    success: boolean;
    message: string;
    data: any;
  }> {
    const response = await fetch(`${API_BASE_URL}/admin/reset-database`, {
      method: "POST",
    });
    return handleResponse<{ success: boolean; message: string; data: any }>(
      response
    );
  },

  async loadFullSampleData(
    data: any
  ): Promise<{ success: boolean; message: string; data: any }> {
    const response = await fetch(
      `${API_BASE_URL}/admin/load-full-sample-data`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return handleResponse<{ success: boolean; message: string; data: any }>(
      response
    );
  },

  // 既存のapi-clientに追加するメソッド

  // ===== Dashboard API =====
  async getStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);
    return handleResponse<DashboardStats>(response);
  },

  // ===== Orders API =====
  async getOrders(params?: OrdersListParams): Promise<Order[]> {
    const searchParams = new URLSearchParams();

    if (params?.skip !== undefined)
      searchParams.append("skip", params.skip.toString());
    if (params?.limit !== undefined)
      searchParams.append("limit", params.limit.toString());
    if (params?.status) searchParams.append("status", params.status);
    if (params?.customer_code)
      searchParams.append("customer_code", params.customer_code);
    if (params?.date_from) searchParams.append("date_from", params.date_from);
    if (params?.date_to) searchParams.append("date_to", params.date_to);

    const url = `${API_BASE_URL}/orders${
      searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    const response = await fetch(url);
    return handleResponse<Order[]>(response);
  },

  async getOrder(orderId: number): Promise<OrderWithLines> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    return handleResponse<OrderWithLines>(response);
  },

  async reMatchOrder(orderId: number): Promise<ReMatchResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/re-match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<ReMatchResponse>(response);
  },

  // ===== Forecast API =====
  async bulkImportForecast(
    data: ForecastBulkRequest
  ): Promise<ForecastBulkResponse> {
    const response = await fetch(`${API_BASE_URL}/forecast/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<ForecastBulkResponse>(response);
  },

  // ===== CSV Export Helper =====
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
            // 値にカンマや改行が含まれる場合はダブルクォートで囲む
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
