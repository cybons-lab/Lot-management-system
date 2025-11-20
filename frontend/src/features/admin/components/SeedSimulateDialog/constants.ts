import type { SimulateSeedRequest } from "@/features/admin/api/admin-simulate";

/**
 * Default form values for simulation
 */
export const DEFAULT_FORM: SimulateSeedRequest = {
  profile: null,
  random_seed: null,
  warehouses: 2,
  customers: 3,
  suppliers: 2,
  products: 5,
  lots: 10,
  orders: 5,
  lot_split_max_per_line: 1,
  order_line_items_per_order: 1,
  destinations_max_per_order: 5,
  forecasts: 1,
  save_snapshot: true,
  snapshot_name: null,
  use_last_snapshot: false,
  case_mix: null,
};

/**
 * Profile warehouse count mappings
 */
export const PROFILE_WAREHOUSE_MAP: Record<string, number> = {
  small: 6,
  medium: 8,
  large_near: 9,
};

/**
 * Profile options for select dropdown
 */
export const PROFILE_OPTIONS = [
  { value: "__default__", label: "API既定（最小構成）" },
  { value: "small", label: "Small（小規模）" },
  { value: "medium", label: "Medium（中規模）" },
  { value: "large_near", label: "Large Near（大規模寄り）" },
] as const;

/**
 * Lot split options (1-3)
 */
export const LOT_SPLIT_OPTIONS = [1, 2, 3] as const;

/**
 * Order line items options (1-5)
 */
export const ORDER_LINE_OPTIONS = [1, 2, 3, 4, 5] as const;

/**
 * Polling interval in milliseconds
 */
export const POLLING_INTERVAL_MS = 3000;

/**
 * Placeholder value for default profile in Select
 */
export const DEFAULT_PROFILE_VALUE = "__default__";
