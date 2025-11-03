// frontend/src/features/orders/components/OrderLineCard/index.tsx (改善版)
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Check } from "lucide-react";

import OrderLineHeader from "@/features/orders/components/OrderLineHeader";
import AllocationProgress from "@/features/orders/components/AllocationProgress";
import WarehouseSelector from "@/features/orders/components/WarehouseSelector";
import LotListWithAllocation from "@/features/orders/components/LotListWithAllocation";
import ForecastSection from "@/features/orders/components/ForecastSection";
import InfoRow from "@/components/common/InfoRow";

import { useOrderLineComputed } from "@/features/orders/hooks/useOrderLineComputed";
import { useAllocationActions } from "@/features/orders/hooks/useAllocationActions";
import { formatYmd } from "@/lib/utils/date";

type Props = {
  order?: any;
  line: any;
  onRematch?: () => void;
};

export default function OrderLineCard({ order, line, onRematch }: Props) {
  const c = useOrderLineComputed(line, order);
  
  // ★ 選択された倉庫（受注に指定された倉庫から選択）
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>("");
  
  // ★ 品番を渡してフィルタリング
  const { candidatesQ, createAlloc, cancelAlloc } = useAllocationActions(
    c.ids.lineId,
    c.productCode
  );

  const canRematch = !!onRematch && !!c.ids.orderId;

  // トースト表示
  const showToast = (message: {
    title: string;
    variant?: "default" | "destructive";
  }) => {
    console.log("Toast:", message);
  };

  // 引当実行
  const handleAllocate = (lotId: number, qty: number) => {
    if (qty <= 0) {
      showToast({ title: "引当数量を入力してください", variant: "destructive" });
      return;
    }
    if (!selectedWarehouse) {
      showToast({ title: "倉庫を選択してください", variant: "destructive" });
      return;
    }
    
    createAlloc.mutate(
      { items: [{ lot_id: lotId, qty, warehouse_code: selectedWarehouse }] },
      {
        onSuccess: () => showToast({ title: "引当完了" }),
        onError: () => showToast({ title: "引当失敗", variant: "destructive" }),
      }
    );
  };

  // 引当取消
  const handleCancelAllocation = (allocationId: number) => {
    cancelAlloc.mutate(
      { allocation_ids: [allocationId] },
      {
        onSuccess: () => showToast({ title: "引当取消完了" }),
        onError: () => showToast({ title: "引当取消失敗", variant: "destructive" }),
      }
    );
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
          {/* 左カラム: 引当進捗 + ロット一覧 */}
          <div className="space-y-4">
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
                <Button size="sm" variant="secondary" onClick={onRematch}>
                  <RefreshCcw className="mr-1 h-3 w-3" />
                  ロット再マッチ
                </Button>
              )}
            </div>

            {/* ★ ロット一覧（常時表示） */}
            <LotListWithAllocation
              candidates={candidatesQ.data?.items ?? []}
              allocatedLots={line?.allocated_lots ?? []}
              onAllocate={handleAllocate}
              onCancelAllocation={handleCancelAllocation}
              selectedWarehouse={selectedWarehouse}
              unit={c.unit}
              isLoading={candidatesQ.isLoading}
            />
          </div>

          {/* 右カラム: 受注情報 */}
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

            {/* ★ 倉庫選択（受注指定の倉庫から選択） */}
            <WarehouseSelector
              warehouses={c.warehouses.length > 0 ? c.warehouses : ["WH-01", "WH-02"]} // 仮
              selectedWarehouse={selectedWarehouse}
              onSelectWarehouse={setSelectedWarehouse}
            />
          </div>
        </div>

        {/* ★ フォーキャスト（全幅表示） */}
        <div className="mt-6">
          <ForecastSection productCode={c.productCode} fullWidth />
        </div>
      </div>
    </div>
  );
}
