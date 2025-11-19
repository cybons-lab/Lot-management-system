/**
 * ForecastDetailCard - Visual forecast display with grid layout
 *
 * 3-section layout:
 * - Section 1: Compact header (customer, product, delivery place)
 * - Section 2: Daily grid that always starts on the first day of the target month
 * - Section 3: Dekad (left) and Monthly (right) aggregations beneath the grid
 *
 * Timeline Logic:
 * - Tier 1 (Daily): Entire target month displayed as a 10-column CSS grid
 * - Tier 2 (Dekad): Next month after daily period (上旬/中旬/下旬)
 * - Tier 3 (Monthly): Month after dekad period (1 month only)
 */

import { useMemo } from "react";

import { ChevronDown } from "lucide-react";

import type { ForecastHeaderWithLines } from "../api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/shared/libs/utils";

interface ForecastDetailCardProps {
  forecast: ForecastHeaderWithLines;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
  isOpen?: boolean;
  isActive?: boolean;
  onToggle?: (id: number) => void;
}

interface ProductForecastData {
  productId: number;
  productCode: string;
  productName: string;
  unit: string;
  dailyData: Map<string, number>; // date string -> quantity
}

interface AggregationMonth {
  year: number;
  month: number; // 0-indexed
}

function getDatesForMonth(targetMonth: Date): Date[] {
  const year = targetMonth.getFullYear();
  const month = targetMonth.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: lastDay }, (_, index) => new Date(year, month, index + 1));
}

/**
 * Format date as YYYY-MM-DD for comparison
 */
function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0] ?? "";
}

/**
 * Render a single day cell for the grid (CSS Grid version)
 */
function DayCell({
  date,
  quantity,
  isToday,
  isPast,
}: {
  date: Date;
  quantity: number | undefined;
  isToday: boolean;
  isPast: boolean;
}) {
  const hasValue = quantity !== undefined && quantity !== null;
  const roundedQty = hasValue ? Math.round(Number(quantity)) : null;
  const isZero = roundedQty === 0;
  const displayValue = roundedQty === null ? "-" : roundedQty.toLocaleString("ja-JP");

  return (
    <div
      className={cn(
        "rounded border bg-white px-1 py-0.5 text-[11px] leading-tight transition",
        "focus-within:ring-1 focus-within:ring-blue-200",
        isToday ? "border-blue-400 ring-1 ring-blue-100" : "border-gray-200",
        isPast ? "opacity-80" : undefined,
      )}
      aria-disabled={isPast}
      data-locked={isPast ? "true" : undefined}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] text-gray-500">{date.getDate()}</span>
        <span
          className={cn(
            "tabular-nums text-xs",
            !hasValue || isZero
              ? "text-gray-400"
              : isPast
                ? "text-gray-400"
                : "font-semibold text-gray-900",
          )}
        >
          {displayValue}
        </span>
      </div>
    </div>
  );
}

function calculateDekadAggregations(
  product: ProductForecastData,
  dekadMonth: AggregationMonth | null,
) {
  if (!dekadMonth) return [];

  let jouTotal = 0;
  let chuTotal = 0;
  let geTotal = 0;

  for (const [dateStr, qty] of product.dailyData) {
    const date = new Date(dateStr);
    if (date.getFullYear() === dekadMonth.year && date.getMonth() === dekadMonth.month) {
      const day = date.getDate();
      const numQty = Number(qty) || 0;
      if (day <= 10) {
        jouTotal += numQty;
      } else if (day <= 20) {
        chuTotal += numQty;
      } else {
        geTotal += numQty;
      }
    }
  }

  const monthLabel = `${dekadMonth.month + 1}月`;

  return [
    { label: `${monthLabel} 上旬`, total: Math.round(jouTotal) },
    { label: `${monthLabel} 中旬`, total: Math.round(chuTotal) },
    { label: `${monthLabel} 下旬`, total: Math.round(geTotal) },
  ];
}

function calculateMonthlyAggregation(
  product: ProductForecastData,
  monthlyMonth: AggregationMonth | null,
) {
  if (!monthlyMonth) return null;

  let total = 0;

  for (const [dateStr, qty] of product.dailyData) {
    const date = new Date(dateStr);
    if (date.getFullYear() === monthlyMonth.year && date.getMonth() === monthlyMonth.month) {
      const numQty = Number(qty) || 0;
      total += numQty;
    }
  }

  return {
    label: `${monthlyMonth.year}年${monthlyMonth.month + 1}月`,
    total: Math.round(total),
  };
}

export function ForecastDetailCard({
  forecast,
  onDelete,
  isDeleting,
  isOpen = true,
  isActive = false,
  onToggle,
}: ForecastDetailCardProps) {
  const productData = useMemo(() => {
    const productMap = new Map<number, ProductForecastData>();

    for (const line of forecast.lines) {
      if (!productMap.has(line.product_id)) {
        productMap.set(line.product_id, {
          productId: line.product_id,
          productCode: line.product_code ?? `P${line.product_id}`,
          productName: line.product_name ?? `ID:${line.product_id}`,
          unit: line.unit,
          dailyData: new Map(),
        });
      }

      const data = productMap.get(line.product_id)!;
      const qty = Number(line.quantity) || 0;
      data.dailyData.set(line.delivery_date, qty);
    }

    return Array.from(productMap.values());
  }, [forecast.lines]);

  const targetMonthStartDate = useMemo(() => {
    if (forecast.forecast_start_date) {
      const base = new Date(forecast.forecast_start_date);
      return new Date(base.getFullYear(), base.getMonth(), 1);
    }

    const fallbackLine = forecast.lines[0]?.delivery_date;
    if (fallbackLine) {
      const base = new Date(fallbackLine);
      return new Date(base.getFullYear(), base.getMonth(), 1);
    }

    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [forecast.forecast_start_date, forecast.lines]);

  const dates = useMemo(() => getDatesForMonth(targetMonthStartDate), [targetMonthStartDate]);

  // Calculate the target months for dekad and monthly
  const { dekadMonth, monthlyMonth } = useMemo(() => {
    const lastDailyDate = dates[dates.length - 1];
    if (!lastDailyDate) {
      return { dekadMonth: null, monthlyMonth: null };
    }

    const dekadDate = new Date(lastDailyDate);
    dekadDate.setMonth(dekadDate.getMonth() + 1);
    dekadDate.setDate(1);

    const monthlyDate = new Date(dekadDate);
    monthlyDate.setMonth(monthlyDate.getMonth() + 1);

    return {
      dekadMonth: { year: dekadDate.getFullYear(), month: dekadDate.getMonth() },
      monthlyMonth: { year: monthlyDate.getFullYear(), month: monthlyDate.getMonth() },
    };
  }, [dates]);

  if (productData.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">明細データがありません</CardContent>
      </Card>
    );
  }

  const now = new Date();
  const todayKey = formatDateKey(now);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetMonthLabel = `${targetMonthStartDate.getFullYear()}年${
    targetMonthStartDate.getMonth() + 1
  }月`;

  const customerDisplay = forecast.customer_name ?? `得意先ID:${forecast.customer_id}`;
  const deliveryPlaceDisplay =
    forecast.delivery_place_name ?? `納入先ID:${forecast.delivery_place_id}`;
  const status = forecast.status ?? "unknown";

  const statusClass =
    status === "active"
      ? "bg-green-100 text-green-800"
      : status === "completed"
        ? "bg-blue-100 text-blue-800"
        : status === "cancelled"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-6">
      {productData.map((product) => {
        const dekadData = calculateDekadAggregations(product, dekadMonth);
        const monthlyData = calculateMonthlyAggregation(product, monthlyMonth);

        const targetMonthTotal = dates.reduce((sum, date) => {
          const qty = product.dailyData.get(formatDateKey(date)) ?? 0;
          const numericQty = Number(qty);
          return sum + (Number.isFinite(numericQty) ? numericQty : 0);
        }, 0);
        const roundedTotal = Math.round(targetMonthTotal);

        return (
          <Card
            key={`${forecast.forecast_id}-${product.productId}`}
            className={cn(
              "overflow-hidden border shadow-sm transition",
              isActive ? "border-primary/60 bg-slate-50 shadow-md" : "border-slate-200 bg-white",
            )}
            data-forecast-number={forecast.forecast_number}
          >
            <div
              className={cn(
                "border-b px-4 py-3",
                isActive ? "border-primary/20 bg-slate-100" : "border-slate-200 bg-slate-50",
              )}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  onClick={() => onToggle?.(forecast.forecast_id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onToggle?.(forecast.forecast_id);
                    }
                  }}
                >
                  <div className="flex-1 space-y-1">
                    <p className="line-clamp-2 text-xs text-gray-500">
                      <span className="text-sm text-gray-500">{customerDisplay}</span>
                      <span className="mx-1 text-gray-400">/</span>
                      <span className="text-base font-semibold text-gray-900">
                        {product.productName}
                        {product.productCode ? (
                          <span className="text-sm font-semibold text-gray-700"> ({product.productCode})</span>
                        ) : null}
                      </span>
                      <span className="mx-1 text-gray-400">/</span>
                      <span className="text-sm text-gray-500">{deliveryPlaceDisplay}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${statusClass}`}>
                        {status}
                      </span>
                      <span className="text-gray-500">{targetMonthLabel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpen ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </div>
                  </div>
                </button>

                {onDelete ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(forecast.forecast_id);
                    }}
                    disabled={isDeleting}
                  >
                    削除
                  </Button>
                ) : null}
              </div>
            </div>

            {isOpen ? (
              <CardContent className="space-y-4 p-4">
                <div className="text-xs text-gray-500">単位: {product.unit}</div>

                <div className="grid gap-6 md:grid-cols-12">
                  <div className="space-y-4 md:col-span-7">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                        <span>日次予測</span>
                        <span>{targetMonthLabel}</span>
                      </div>
                      <div className="grid grid-cols-10 gap-1 text-[11px]">
                        {dates.map((date) => {
                          const dateKey = formatDateKey(date);
                          const isPastDate = date < todayStart;
                          return (
                            <DayCell
                              key={dateKey}
                              date={date}
                              quantity={product.dailyData.get(dateKey)}
                              isToday={todayKey === dateKey}
                              isPast={isPastDate}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-6 border-t pt-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">旬別予測</h4>
                        {dekadData.length > 0 ? (
                          <div className="grid grid-cols-3 gap-3">
                            {dekadData.map((dekad) => (
                              <div
                                key={dekad.label}
                                className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-center"
                              >
                                <div className="text-xs font-medium text-green-700">{dekad.label}</div>
                                <div className="text-lg font-bold text-green-900">{dekad.total}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-400">
                            データなし
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">月別予測</h4>
                        {monthlyData ? (
                          <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-center">
                            <div className="text-xs font-medium text-purple-700">{monthlyData.label}</div>
                            <div className="text-2xl font-bold text-purple-900">{monthlyData.total}</div>
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-400">
                            データなし
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-4 text-sm text-gray-400 md:col-span-5">
                    TODO: graphs or indicators
                  </div>
                </div>
              </CardContent>
            ) : (
              <div className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>月合計 ({targetMonthLabel})</span>
                  <span className="font-semibold text-gray-900">
                    {roundedTotal.toLocaleString("ja-JP")}
                    <span className="ml-1 text-xs text-gray-500">{product.unit}</span>
                  </span>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
