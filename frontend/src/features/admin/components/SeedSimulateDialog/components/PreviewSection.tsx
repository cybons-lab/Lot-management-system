import { formatCount, formatTotal } from "../hooks/useSimulationPreview";
import type { PreviewSectionProps } from "../types";

/**
 * Preview display item component
 */
function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span> {value}
    </div>
  );
}

/**
 * Preview section showing form values before submission
 */
export function PreviewSection({ preview }: PreviewSectionProps) {
  const { counts, totals } = preview;

  return (
    <div className="space-y-2 border-t pt-4">
      <h3 className="text-sm font-semibold">送信前プレビュー</h3>
      <div className="space-y-3 rounded border p-4 text-sm">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <PreviewItem label="倉庫" value={formatCount(counts.warehouses)} />
          <PreviewItem label="顧客" value={formatCount(counts.customers)} />
          <PreviewItem label="仕入先" value={formatCount(counts.suppliers)} />
          <PreviewItem label="製品" value={formatCount(counts.products)} />
          <PreviewItem label="ロット" value={formatCount(counts.lots)} />
          <PreviewItem label="受注" value={formatCount(counts.orders)} />
          <PreviewItem label="需要予測" value={formatCount(counts.forecasts)} />
        </div>

        <div className="border-t pt-3">
          <div className="text-muted-foreground text-xs font-semibold uppercase">Totals</div>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <PreviewItem label="Masters" value={formatTotal(totals.masters)} />
            <PreviewItem label="Inventory" value={formatTotal(totals.inventory)} />
            <PreviewItem label="Orders" value={formatTotal(totals.orders)} />
            <PreviewItem label="Forecasts" value={formatTotal(totals.forecasts)} />
            <div className="sm:col-span-2">
              <PreviewItem label="Overall" value={formatTotal(totals.overall)} />
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-xs">
          空欄の項目はプロファイル既定値が適用されます。
        </p>
      </div>
    </div>
  );
}
