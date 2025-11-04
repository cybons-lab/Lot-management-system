/**
 * Forecast一覧ページ
 * GET /api/forecast でフォーキャストデータを取得・表示
 */

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export default function ForecastListPage() {
  const [filters, setFilters] = useState({
    product_code: "",
    customer_code: "",
  });

  // Forecast一覧を取得
  const forecastsQuery = useQuery({
    queryKey: ["forecasts", filters],
    queryFn: () => {
      const params: Record<string, string> = {};
      if (filters.product_code) params.product_code = filters.product_code;
      if (filters.customer_code) params.customer_code = filters.customer_code;
      return api.listForecasts(params);
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Forecast 一覧</h2>
        <p className="text-muted-foreground">
          登録されている需要予測データを確認できます
        </p>
      </div>

      {/* フィルター */}
      <div className="rounded-lg border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-2 block">製品コード</label>
            <input
              type="text"
              value={filters.product_code}
              onChange={(e) =>
                setFilters({ ...filters, product_code: e.target.value })
              }
              placeholder="製品コードで絞り込み"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">顧客コード</label>
            <input
              type="text"
              value={filters.customer_code}
              onChange={(e) =>
                setFilters({ ...filters, customer_code: e.target.value })
              }
              placeholder="顧客コードで絞り込み"
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* テーブル */}
      <div className="rounded-lg border bg-card">
        {forecastsQuery.isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            読み込み中...
          </div>
        ) : forecastsQuery.isError ? (
          <div className="p-8 text-center text-destructive">
            データの取得に失敗しました
          </div>
        ) : !forecastsQuery.data || forecastsQuery.data.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            データがありません
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium">ID</th>
                  <th className="p-3 text-left text-sm font-medium">
                    製品コード
                  </th>
                  <th className="p-3 text-left text-sm font-medium">
                    顧客コード
                  </th>
                  <th className="p-3 text-left text-sm font-medium">
                    サプライヤー
                  </th>
                  <th className="p-3 text-left text-sm font-medium">粒度</th>
                  <th className="p-3 text-left text-sm font-medium">期間</th>
                  <th className="p-3 text-right text-sm font-medium">数量</th>
                  <th className="p-3 text-left text-sm font-medium">
                    バージョン
                  </th>
                  <th className="p-3 text-left text-sm font-medium">更新日</th>
                </tr>
              </thead>
              <tbody>
                {forecastsQuery.data.map((forecast) => (
                  <tr
                    key={forecast.id}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="p-3 text-sm">{forecast.id}</td>
                    <td className="p-3 text-sm font-medium">
                      {forecast.product_id ?? "-"}
                    </td>
                    <td className="p-3 text-sm">
                      {forecast.customer_id ?? "-"}
                    </td>
                    <td className="p-3 text-sm">
                      {forecast.supplier_id ?? "-"}
                    </td>
                    <td className="p-3 text-sm">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                        {forecast.granularity ?? "-"}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {forecast.period_start
                        ? new Date(forecast.period_start).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 text-right text-sm">
                      {forecast.qty_forecast
                        ? forecast.qty_forecast.toLocaleString()
                        : "-"}
                    </td>
                    <td className="p-3 text-sm">
                      v{forecast.version_no ?? "-"}
                    </td>
                    <td className="p-3 text-sm">
                      {forecast.updated_at
                        ? new Date(forecast.updated_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 件数表示 */}
      {forecastsQuery.data && forecastsQuery.data.length > 0 && (
        <div className="text-sm text-muted-foreground">
          合計: {forecastsQuery.data.length} 件
        </div>
      )}
    </div>
  );
}
