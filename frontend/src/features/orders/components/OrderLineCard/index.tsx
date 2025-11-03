// frontend/src/features/orders/components/OrderLineCard/index.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

import OrderLineHeader from "@/features/orders/components/OrderLineHeader";
import AllocationProgress from "@/features/orders/components/AllocationProgress";
import WarehouseBadges from "@/features/orders/components/WarehouseBadges";
import ForecastSection from "@/features/orders/components/ForecastSection";
import InfoRow from "@/components/common/InfoRow";

import LotAllocationPanel from "@/features/orders/components/LotAllocationPanel";
import { useOrderLineComputed } from "@/features/orders/hooks/useOrderLineComputed";
import { useAllocationActions } from "@/features/orders/hooks/useAllocationActions";
import { formatYmd } from "@/lib/utils/date";

type Props = {
  order?: any;
  line: any;
  /** 旧モーダル用。互換のため残すが未使用 */
  onOpenAllocation?: () => void;
  onRematch?: () => void;
};

export default function OrderLineCard({
  order,
  line,
  onOpenAllocation,
  onRematch,
}: Props) {
  const c = useOrderLineComputed(line, order);
  
  // ★ 品番を渡してフィルタリング
  const { candidatesQ, createAlloc, cancelAlloc, saveWareAlloc } =
    useAllocationActions(c.ids.lineId, c.productCode);

  const canRematch = !!onRematch && !!c.ids.orderId;
  const [isEditing, setIsEditing] = React.useState(false);

  // トースト表示（shadcn/uiのuseToastを想定）
  const showToast = (message: { title: string; variant?: "default" | "destructive" }) => {
    // 実装例: toast(message);
    console.log("Toast:", message);
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <OrderLineHeader
        productName={c.productName}
        productCode={c.productCode}
        status={c.status}
        orderDate={c.orderDate}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左カラム */}
          <div className="space-y-3">
            <AllocationProgress
              lineId={c.ids.lineId}
              progressPct={c.progressPct}
              allocatedTotal={c.allocatedTotal}
              totalQty={c.totalQty}
              unit={c.unit}
              remainingQty={c.remainingQty}
            />

            <div className="flex items-center gap-2">
              {canRematch && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onRematch}
                  className="shrink-0">
                  <RefreshCcw className="mr-1 h-3 w-3" />
                  ロット再マッチ
                </Button>
              )}
            </div>

            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing((v) => !v)}>
                {isEditing ? "閉じる" : "ロット編集"}
              </Button>
            </div>

            {isEditing && (
              <div className="mt-3">
                <LotAllocationPanel
                  mode="inline"
                  open
                  onClose={() => setIsEditing(false)}
                  orderLineId={c.ids.lineId ?? null}
                  candidates={candidatesQ.data?.items ?? []}
                  onAllocate={(payload) => {
                    createAlloc.mutate(payload);
                    showToast({ title: "引当を実行しました" });
                  }}
                  onCancelAllocations={(payload) => {
                    cancelAlloc.mutate(payload);
                    showToast({ title: "引当を取消しました" });
                  }}
                  onSaveWarehouseAllocations={(allocs) => {
                    saveWareAlloc.mutate(allocs);
                    showToast({ title: "倉庫配分を保存しました" });
                  }}
                  maxQty={c.totalQty}
                  onToast={showToast}
                />
              </div>
            )}

            {/* 引当済ロット */}
            {Array.isArray(line?.allocated_lots) &&
            line.allocated_lots.length > 0 ? (
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium mb-2">引当済ロット</div>
                <div className="space-y-2">
                  {line.allocated_lots.map((a: any) => (
                    <div
                      key={
                        a?.allocation_id ??
                        `${a?.lot_code}-${a?.warehouse_code}`
                      }
                      className="flex items-center justify-between text-sm">
                      <div className="min-w-0">
                        <div className="font-mono truncate">{a?.lot_code}</div>
                        <div className="text-xs text-muted-foreground">
                          {a?.allocated_qty} {c.unit} / {a?.warehouse_code}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium mb-2">引当済ロット</div>
                <div className="text-sm text-muted-foreground">
                  まだロットが引当されていません
                </div>
              </div>
            )}
          </div>

          {/* 右カラム */}
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="text-sm font-medium text-sky-700">受注情報</h3>
            </div>

            <InfoRow
              label="製品"
              value={`${c.productCode ?? ""} ${c.productName ?? ""}`}
              highlight
            />
            <InfoRow label="数量" value={`${c.totalQty} ${c.unit}`} />
            <InfoRow label="得意先" value={c.customerCode ?? ""} />
            <InfoRow label="納期" value={formatYmd(c.dueDate) || "—"} />
            <InfoRow
              label="出荷日(予定)"
              value={formatYmd(c.shipDate ?? c.plannedShipDate) || "—"}
            />
            
            {/* ★ 配送リードタイム */}
            {c.shippingLeadTime && (
              <InfoRow
                label="配送リードタイム"
                value={c.shippingLeadTime}
                highlight={c.shippingLeadTime.includes("遅延")}
              />
            )}

            <WarehouseBadges warehouses={c.warehouses} />
            <ForecastSection productCode={c.productCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
