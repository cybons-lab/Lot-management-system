/**
 * ForecastListCard - Collapsible card for forecast list
 * Shows header summary, expands to show ForecastDetailCard
 */

import { useState } from "react";

import type { ForecastHeader } from "../api";
import { useForecastHeader } from "../hooks";

import { ForecastDetailCard } from "./ForecastDetailCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ForecastListCardProps {
  header: ForecastHeader;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function ForecastListCard({ header, onDelete, isDeleting }: ForecastListCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: fullForecast, isLoading: isLoadingDetail } = useForecastHeader(header.forecast_id);

  const customerLabel = header.customer_name ?? `得意先ID:${header.customer_id}`;
  const deliveryLabel = header.delivery_place_name ?? `納入先ID:${header.delivery_place_id}`;

  const primaryLine = fullForecast?.lines?.[0];
  const productName = primaryLine
    ? primaryLine.product_name ?? `製品ID:${primaryLine.product_id}`
    : null;
  const productCode = primaryLine
    ? primaryLine.product_code ?? `P${primaryLine.product_id}`
    : null;

  const productLabel = productName
    ? `${productName}${productCode ? ` (${productCode})` : ""}`
    : isLoadingDetail
      ? "製品情報を取得中..."
      : "製品情報が登録されていません";

  const targetMonth = header.forecast_start_date
    ? new Date(header.forecast_start_date)
    : null;
  const targetMonthLabel = targetMonth
    ? `${targetMonth.getFullYear()}年${targetMonth.getMonth() + 1}月`
    : "対象月未設定";

  return (
    <Card className="overflow-hidden" data-forecast-number={header.forecast_number}>
      {/* Collapsed Header */}
      <CardHeader
        className="cursor-pointer space-y-3 p-4 hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            {/* Expand/Collapse Icon */}
            <div className="text-gray-400">
              {isExpanded ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </div>

            {/* Header Info */}
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${
                    header.status === "active"
                      ? "bg-green-100 text-green-800"
                      : header.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {header.status}
                </span>
                <span>{targetMonthLabel}</span>
              </div>

              <p className="line-clamp-2 text-base leading-tight text-gray-600">
                <span className="font-medium text-gray-700">{customerLabel}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="font-semibold text-gray-900">{productLabel}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="font-medium text-gray-700">{deliveryLabel}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Date */}
            <div className="text-sm text-gray-500">
              {new Date(header.created_at).toLocaleDateString("ja-JP")}
            </div>

            {/* Delete Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(header.forecast_id);
              }}
              disabled={isDeleting}
            >
              削除
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="border-t bg-gray-50 p-4">
          {isLoadingDetail ? (
            <div className="py-8 text-center text-gray-500">明細を読み込み中...</div>
          ) : fullForecast ? (
            <ForecastDetailCard forecast={fullForecast} />
          ) : (
            <div className="py-8 text-center text-gray-500">明細の取得に失敗しました</div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
