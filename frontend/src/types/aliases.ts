import type { components, paths } from "@/types/api";

type Schemas = components["schemas"];

type RenameKeys<
  T,
  Map extends Record<string, keyof T>,
> = T & { [K in keyof Map]: T[Map[K]] };

type Replace<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };

export type LotResponse = RenameKeys<
  Schemas["LotResponse"],
  { current_quantity: "current_stock" }
> & {
  warehouse_name?: string | null;
};

export type LotCreate = Schemas["LotCreate"] & {
  initial_quantity?: number | null;
};

export type Product = Schemas["ProductResponse"];
export type Supplier = Schemas["SupplierResponse"];
export type Warehouse = Schemas["WarehouseResponse"];
export type OldWarehouse = Warehouse;

type OrderResponseBase = RenameKeys<
  Schemas["OrderResponse"],
  { order_number: "order_no" }
> & {
  customer_name?: string | null;
};

export type OrderResponse = OrderResponseBase;

type OrderLineBase = RenameKeys<
  Schemas["OrderLineResponse"],
  {
    line_number: "line_no";
    allocated_quantity: "allocated_qty";
  }
> & {
  product_name?: string | null;
  ship_date?: string | null;
  planned_ship_date?: string | null;
  status?: string | null;
  customer_code?: string | null;
  customer_name?: string | null;
  order_date?: string | null;
  allocated_lots?: AllocatedLot[];
};

export type OrderLine = OrderLineBase;

export interface OrderLineComputed {
  ids: {
    lineId?: number;
    orderId?: number;
  };
  productCode?: string;
  productName?: string;
  totalQty: number;
  unit: string;
  allocatedTotal: number;
  remainingQty: number;
  progressPct: number;
  status?: string;
  customerCode?: string;
  customerName?: string;
  orderDate?: string;
  dueDate?: string;
  shipDate?: string;
  plannedShipDate?: string;
  shippingLeadTime?: string | null;
  warehouses: string[];
}

export type AllocatedLot = Schemas["FefoLotAllocation"] & {
  allocation_id?: number;
  lot_code?: string;
  warehouse_code?: string;
  warehouse_name?: string | null;
};

export type OrderWithLinesResponse = Replace<
  RenameKeys<Schemas["OrderWithLinesResponse"], { order_number: "order_no" }> & {
    customer_name?: string | null;
  },
  "lines",
  OrderLine[]
>;

export type OrdersListParams = paths["/api/orders"]["get"]["parameters"]["query"];

export type LotCandidate = Schemas["FefoLotAllocation"] & {
  lot_code?: string;
  available_qty?: number;
  base_unit?: string;
  lot_unit_qty?: number | null;
  lot_unit?: string | null;
  conversion_factor?: number | null;
  warehouse_code?: string;
  warehouse_name?: string | null;
};

export type LotCandidateResponse = {
  items: LotCandidate[];
  warnings?: string[];
};

export type LotAllocationRequest = {
  allocations: { lot_id: number; qty: number }[];
};

export type LotAllocationResponse = {
  success?: boolean;
  message?: string;
  allocated_ids?: number[];
};

export type AllocationCancelRequest = {
  order_line_id?: number;
  allocation_ids?: number[];
};

export type SaveAllocationsRequest = {
  allocations: WarehouseAlloc[];
};

export type SaveAllocationsResponse = {
  success?: boolean;
  message?: string;
};

export type WarehouseAlloc = {
  warehouse_id: number;
  warehouse_code: string;
  warehouse_name?: string;
  lot_id: number;
  quantity: number;
  qty?: number;
};

export type OrdersWithAllocResponse = unknown;
export type ReMatchResponse = Schemas["FefoCommitResponse"];
export type WarehouseListResponse = components["schemas"]["WarehouseListResponse"];

export type LotAllocationPreviewRequest = paths["/api/allocations/preview"]["post"]["requestBody"]["content"]["application/json"];
export type LotAllocationPreviewResponse = paths["/api/allocations/preview"]["post"]["responses"]["200"]["content"]["application/json"];

export type ForecastResponse = Schemas["ForecastResponse"];
export type ForecastListParams = paths["/api/forecast/list"]["get"]["parameters"]["query"];
export type ForecastListResponse = paths["/api/forecast/list"]["get"]["responses"]["200"]["content"]["application/json"];
export type ForecastBulkRequest = paths["/api/forecast/bulk"]["post"]["requestBody"]["content"]["application/json"];
export type ForecastBulkResponse = paths["/api/forecast/bulk"]["post"]["responses"]["200"]["content"]["application/json"];
