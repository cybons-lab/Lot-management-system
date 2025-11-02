// v2.0 API (backend/app/schemas/inventory.py)
export interface LotResponse {
  id: number;
  supplier_code: string;
  product_code: string;
  product_name?: string; // 4.1で追加
  lot_number: string;
  receipt_date: string; // YYYY-MM-DD
  mfg_date?: string;
  expiry_date?: string;
  warehouse_code?: string;
  current_stock?: number;
  created_at: string;
  updated_at?: string;
}

// v2.0 API (backend/app/schemas/inventory.py)
export interface LotCreate {
  supplier_code: string;
  product_code: string;
  lot_number: string;
  receipt_date: string; // YYYY-MM-DD
  mfg_date?: string;
  expiry_date?: string;
  warehouse_code?: string;
}

// v2.0 API (backend/app/schemas/masters.py)
export interface Product {
  product_code: string;
  product_name: string;
  internal_unit: string;
  requires_lot_number: number;
}

// v2.0 API (backend/app/schemas/masters.py)
export interface Supplier {
  supplier_code: string;
  supplier_name: string;
}

// v2.0 API (backend/app/schemas/masters.py)
export interface Warehouse {
  warehouse_code: string;
  warehouse_name: string;
  is_active: number;
}

// v2.0 API (backend/app/schemas/admin.py)
export interface DashboardStatsResponse {
  total_stock: number;
  total_orders: number;
  unallocated_orders: number;
}

// v2.0 API (backend/app/schemas/sales.py)
export interface OrderResponse {
  id: number;
  order_no: string;
  customer_code: string;
  order_date?: string; // YYYY-MM-DD
  status: string;
  sap_order_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface OrderLineResponse {
  id: number;
  order_id: number;
  line_no: number;
  product_code: string;
  quantity: number;
  unit?: string;
  due_date?: string; // YYYY-MM-DD
  created_at: string;
  allocated_qty?: number; // 引当済数量 (GET /orders/{id} で付与)
}

export interface OrderWithLinesResponse extends OrderResponse {
  lines: OrderLineResponse[];
}
// 既存の型定義に追加する内容

// ===== Dashboard =====
export interface DashboardStats {
  total_stock: number;
  total_orders: number;
  unallocated_orders: number;
}

// ===== Orders =====
export interface Order {
  id: number;
  order_no: string;
  customer_code: string;
  order_date: string;
  due_date: string | null;
  status: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderLine {
  id: number;
  order_id: number;
  line_no: number;
  product_code: string;
  quantity: number;
  unit: string;
  due_date: string | null;
  remarks: string | null;
  allocated_qty: number;
  // Forecast関連
  forecast_id: number | null;
  forecast_granularity: string | null;
  forecast_match_status: string | null;
  forecast_qty: number | null;
  forecast_version_no: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderWithLines extends Order {
  lines: OrderLine[];
}

export interface OrdersListParams {
  skip?: number;
  limit?: number;
  status?: string;
  customer_code?: string;
  date_from?: string;
  date_to?: string;
  q?: string; // 検索クエリ
  page?: number;
  page_size?: number;
}

// ===== Forecast =====
export interface ForecastBulkItem {
  product_code: string;
  client_code: string;
  granularity: "daily" | "dekad" | "monthly";
  date_day?: string;
  date_dekad_start?: string;
  year_month?: string;
  forecast_qty: number;
  version_no: string;
}

export interface ForecastBulkRequest {
  forecasts: ForecastBulkItem[];
}

export interface ForecastBulkResponse {
  success: boolean;
  message: string;
  imported_count: number;
  skipped_count: number;
  error_count: number;
  errors?: Array<{
    index: number;
    product_code: string;
    error: string;
  }>;
}

// ===== Re-match =====
export interface ReMatchResponse {
  id: number;
  order_no: string;
  lines: OrderLine[];
  created_at: string;
  updated_at: string;
}

// ===== API Response Base =====
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
