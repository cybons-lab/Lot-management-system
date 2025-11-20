import { CheckCircle2, XCircle } from "lucide-react";

import type { ResultSectionProps } from "../types";

import { Badge } from "@/components/ui";


/**
 * Cap check badge component
 */
function CapCheckBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{label}:</span>
      <Badge variant={value === "OK" ? "default" : "destructive"}>{value}</Badge>
    </div>
  );
}

/**
 * Result summary item component
 */
function SummaryItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span> {value}
    </div>
  );
}

/**
 * Result display section showing simulation outcome
 */
export function ResultSection({ result }: ResultSectionProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center gap-2">
        {result.success ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600" />
        )}
        <h3 className="text-sm font-semibold">{result.success ? "生成完了" : "生成失敗"}</h3>
      </div>

      {result.success && result.summary && (
        <div className="bg-muted grid grid-cols-2 gap-3 rounded border p-4 text-sm">
          <SummaryItem label="倉庫" value={result.summary.warehouses} />
          <SummaryItem label="需要予測" value={result.summary.forecasts} />
          <SummaryItem label="ロット" value={result.summary.lots} />
          <SummaryItem label="受注" value={result.summary.orders} />
          <SummaryItem label="受注明細" value={result.summary.order_lines} />
          <SummaryItem label="引当" value={result.summary.allocations} />
          <SummaryItem label="スナップショットID" value={result.snapshot_id || "-"} />

          <div className="col-span-2 space-y-1 border-t pt-2">
            <CapCheckBadge label="ロット分割" value={result.summary.cap_checks.lot_split} />
            <CapCheckBadge label="納品先" value={result.summary.cap_checks.destinations} />
            <CapCheckBadge label="明細行" value={result.summary.cap_checks.order_lines} />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">在庫整合式:</span>
              <Badge variant={result.summary.stock_equation_ok ? "default" : "destructive"}>
                {result.summary.stock_equation_ok ? "OK" : "NG"}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {result.error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {result.error}
        </div>
      )}
    </div>
  );
}
