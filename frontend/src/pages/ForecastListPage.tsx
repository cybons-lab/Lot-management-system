// src/pages/ForecastListPage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Calendar,
  FileText,
  Loader2, // 🔽 [追加]
} from "lucide-react";
import { format, parseISO } from "date-fns"; // 🔽 [追加]
import { ForecastItemOut } from "@/types"; // 🔽 [追加]

export default function ForecastListPage() {
  // 🔽 [変更] バックエンドのパラメータ名に合わせる
  const [product_code, setProductFilter] = useState("");
  const [supplier_code, setSupplierFilter] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // 🔽 [変更] モックデータから実API呼び出しに変更
  const { data, isLoading } = useQuery({
    queryKey: ["forecasts-list", { product_code, supplier_code }],
    queryFn: () => api.getForecastList({ product_code, supplier_code }),
    // 検索クエリがある場合のみフェッチ (オプション)
    // enabled: !!product_code || !!supplier_code,
  });
  const forecasts = data?.items ?? [];

  const toggleExpand = (forecastId: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(forecastId)) {
      newExpanded.delete(forecastId);
    } else {
      newExpanded.add(forecastId);
    }
    setExpandedCards(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Forecast一覧</h2>
          <p className="text-muted-foreground">需要予測データを確認できます</p>
        </div>
        <Button onClick={() => (window.location.href = "/forecast/import")}>
          インポート
        </Button>
      </div>

      {/* フィルター */}
      <div className="flex gap-4">
        <Input
          placeholder="品番で検索..." // 🔽 [変更]
          value={product_code}
          onChange={(e) => setProductFilter(e.target.value)}
          className="max-w-md"
        />
        <Input
          placeholder="仕入先で検索..."
          value={supplier_code}
          onChange={(e) => setSupplierFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Forecastカード一覧 */}
      <div className="space-y-4">
        {forecasts.map((forecast) => (
          <ForecastCard
            key={forecast.id}
            forecast={forecast}
            isExpanded={expandedCards.has(forecast.id)}
            onToggleExpand={() => toggleExpand(forecast.id)}
          />
        ))}
        {forecasts.length === 0 && (
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              対象のForecastデータがありません
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 🔽 [変更] forecast の型を `ForecastItemOut` に
function ForecastCard({
  forecast,
  isExpanded,
  onToggleExpand,
}: {
  forecast: ForecastItemOut;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  // 🔽 [変更] ISO文字列をパース
  const updatedAt = parseISO(forecast.updated_at);
  const isNew = updatedAt > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      {/* カードヘッダー */}
      <div className="border-b bg-muted/50 p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">
                品番: {forecast.product_code} | 品名: {forecast.product_name}
              </span>
              {isNew && (
                <Badge variant="default" className="bg-blue-500">
                  🆕 NEW
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                得意先: {forecast.client_code} ({forecast.client_name})
              </span>
              <span>|</span>
              <span>
                仕入先: {forecast.supplier_code} ({forecast.supplier_name})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span>バージョン: {forecast.version_no}</span>
              <span>|</span>
              <Calendar className="h-3 w-3" />
              {/* 🔽 [変更] 日付フォーマット */}
              <span>更新日: {format(updatedAt, "yyyy/MM/dd HH:mm")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* カードコンテンツ */}
      <div className="p-6 space-y-4">
        {/* 日別データ */}
        {forecast.granularity === "daily" && forecast.daily_data && (
          <DailyDataView
            data={forecast.daily_data}
            unit={forecast.unit || "EA"}
          />
        )}

        {/* 旬別データ */}
        {forecast.granularity === "dekad" && forecast.dekad_data && (
          <DekadDataView
            data={forecast.dekad_data}
            unit={forecast.unit || "EA"}
          />
        )}

        {/* 月別データ */}
        {forecast.granularity === "monthly" && forecast.monthly_data && (
          <MonthlyDataView
            data={forecast.monthly_data}
            unit={forecast.unit || "EA"}
          />
        )}

        {/* 旬別集計（常に表示） */}
        {forecast.dekad_summary && (
          <DekadSummary
            data={forecast.dekad_summary}
            unit={forecast.unit || "EA"}
          />
        )}

        {/* 展開ボタン */}
        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="sm" onClick={onToggleExpand}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                詳細を閉じる
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                詳細を展開
              </>
            )}
          </Button>
        </div>

        {/* 展開コンテンツ */}
        {isExpanded && forecast.version_history && (
          <div className="border-t pt-4 space-y-4">
            <VersionHistory versions={forecast.version_history} />
          </div>
        )}
      </div>
    </div>
  );
}

//
// 以下のコンポーネントはモックデータのまま動作するため変更なし
//

// 日別データ表示（給与明細スタイル）
function DailyDataView({
  data,
  unit,
}: {
  data: Record<string, number>;
  unit: string;
}) {
  const days = Object.keys(data)
    .map(Number)
    .sort((a, b) => a - b);
  const rows = [];

  // 1行10日ずつ表示（Tailwindのgrid-cols-10を使用）
  for (let i = 0; i < days.length; i += 10) {
    rows.push(days.slice(i, i + 10));
  }

  return (
    <div className="rounded-lg border">
      <div className="border-b bg-muted/30 px-4 py-2">
        <h4 className="text-sm font-semibold">日別予測 (ダミー)</h4>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="space-y-1">
              {/* 日付行 */}
              <div className="grid grid-cols-10 gap-1 text-xs text-center font-medium text-muted-foreground">
                {row.map((day) => (
                  <div key={day} className="px-1">
                    {day}
                  </div>
                ))}
              </div>
              {/* 数量行 */}
              <div className="grid grid-cols-10 gap-1 text-xs text-center">
                {row.map((day) => (
                  <div
                    key={day}
                    className="rounded bg-blue-50 py-1 px-1 font-semibold">
                    {data[day]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 旬別データ表示
function DekadDataView({
  data,
  unit,
}: {
  data: Record<string, number>;
  unit: string;
}) {
  return (
    <div className="rounded-lg border">
      <div className="border-b bg-muted/30 px-4 py-2">
        <h4 className="text-sm font-semibold">旬別予測 (ダミー)</h4>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <DekadItem
            label="上旬 (1-10日)"
            value={data.early || 0}
            unit={unit}
            color="blue"
          />
          <DekadItem
            label="中旬 (11-20日)"
            value={data.middle || 0}
            unit={unit}
            color="green"
          />
          <DekadItem
            label="下旬 (21-30日)"
            value={data.late || 0}
            unit={unit}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}

function DekadItem({ label, value, unit, color }: any) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-900",
    green: "bg-green-50 text-green-900",
    purple: "bg-purple-50 text-purple-900",
  };

  return (
    <div
      className={`rounded-lg p-4 ${
        colorClasses[color as keyof typeof colorClasses]
      }`}>
      <div className="text-xs font-medium mb-2">{label}</div>
      <div className="text-2xl font-bold">
        {value.toLocaleString()}{" "}
        <span className="text-sm font-normal">{unit}</span>
      </div>
    </div>
  );
}

// 月別データ表示
function MonthlyDataView({
  data,
  unit,
}: {
  data: Record<string, number>;
  unit: string;
}) {
  const months = Object.keys(data).sort();

  return (
    <div className="rounded-lg border">
      <div className="border-b bg-muted/30 px-4 py-2">
        <h4 className="text-sm font-semibold">月別予測 (ダミー)</h4>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-6 gap-2">
          {months.map((month) => (
            <div key={month} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{month}</div>
              <div className="rounded bg-green-50 py-2 text-sm font-semibold">
                {data[month]}
                <span className="text-xs ml-1">{unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 旬別集計
function DekadSummary({
  data,
  unit,
}: {
  data: Record<string, number>;
  unit: string;
}) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50">
      <div className="border-b border-blue-200 bg-blue-100 px-4 py-2">
        <h4 className="text-sm font-semibold text-blue-900">
          旬別集計 (ダミー)
        </h4>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            {/* 🔽 [修正] '->' を '-' に変更 */}
            <div className="text-xs text-blue-700 mb-1">上旬 (1-10)</div>
            <div className="text-lg font-bold text-blue-900">
              {(data.early || 0).toLocaleString()}{" "}
              <span className="text-sm">{unit}</span>
            </div>
          </div>
          <div>
            {/* 🔽 [修正] '->' を '-' に変更 */}
            <div className="text-xs text-blue-700 mb-1">中旬 (11-20)</div>
            <div className="text-lg font-bold text-blue-900">
              {(data.middle || 0).toLocaleString()}{" "}
              <span className="text-sm">{unit}</span>
            </div>
          </div>
          <div>
            {/* 🔽 [修正] '->' を '-' に変更 */}
            <div className="text-xs text-blue-700 mb-1">下旬 (21-)</div>
            <div className="text-lg font-bold text-blue-900">
              {(data.late || 0).toLocaleString()}{" "}
              <span className="text-sm">{unit}</span>
            </div>
          </div>
          <div className="border-l border-blue-300">
            <div className="text-xs text-blue-700 mb-1">月合計</div>
            <div className="text-xl font-bold text-blue-900">
              {(data.total || 0).toLocaleString()}{" "}
              <span className="text-sm">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// バージョン履歴
function VersionHistory({ versions }: { versions: any[] }) {
  return (
    <div className="rounded-lg border">
      <div className="border-b bg-muted/30 px-4 py-2">
        <h4 className="text-sm font-semibold">バージョン履歴 (ダミー)</h4>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {versions.map((version: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded bg-muted/50 px-3 py-2 text-sm">
              <span className="font-medium">
                {version.version_no}{" "}
                {idx === 0 && <Badge variant="secondary">現在</Badge>}
              </span>
              <span className="text-muted-foreground">
                {version.updated_at}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
