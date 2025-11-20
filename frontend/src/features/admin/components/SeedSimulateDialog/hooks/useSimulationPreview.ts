import { useMemo } from "react";

import type { PreviewCounts, PreviewData } from "../types";

import type { SimulateSeedRequest } from "@/features/admin/api/admin-simulate";


/**
 * Convert a value to number or null
 */
function toNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && !Number.isNaN(value) ? value : null;
}

/**
 * Sum values if all are known (non-null)
 */
function sumIfKnown(counts: PreviewCounts, keys: (keyof PreviewCounts)[]): number | null {
  if (keys.every((key) => counts[key] != null)) {
    return keys.reduce((acc, key) => acc + (counts[key] as number), 0);
  }
  return null;
}

/**
 * Hook for calculating preview data from form values
 */
export function useSimulationPreview(form: SimulateSeedRequest): PreviewData {
  return useMemo(() => {
    const counts: PreviewCounts = {
      warehouses: toNumber(form.warehouses),
      customers: toNumber(form.customers),
      suppliers: toNumber(form.suppliers),
      products: toNumber(form.products),
      lots: toNumber(form.lots),
      orders: toNumber(form.orders),
      forecasts: toNumber(form.forecasts),
    };

    const masters = sumIfKnown(counts, ["warehouses", "customers", "suppliers", "products"]);
    const inventory = counts.lots;
    const ordersTotal = counts.orders;
    const forecastsTotal = counts.forecasts;

    const overall =
      masters != null && inventory != null && ordersTotal != null && forecastsTotal != null
        ? masters + inventory + ordersTotal + forecastsTotal
        : null;

    return {
      counts,
      totals: {
        masters,
        inventory,
        orders: ordersTotal,
        forecasts: forecastsTotal,
        overall,
      },
    };
  }, [form]);
}

/**
 * Format count value for display
 */
export function formatCount(value: number | null | undefined): string {
  return value == null ? "プロファイル既定" : value.toLocaleString();
}

/**
 * Format total value for display
 */
export function formatTotal(value: number | null | undefined): string {
  return value == null ? "-" : value.toLocaleString();
}
