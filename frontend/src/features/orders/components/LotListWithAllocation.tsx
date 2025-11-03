// frontend/src/features/orders/components/LotListWithAllocation.tsx
import React from "react";
import { Check, X } from "lucide-react";
import type { LotCandidate, AllocatedLot } from "@/types";

type Props = {
  /** 引当候補ロット */
  candidates: LotCandidate[];
  /** 引当済みロット */
  allocatedLots: AllocatedLot[];
  /** 引当実行 */
  onAllocate: (lotId: number, qty: number) => void;
  /** 引当取消 */
  onCancelAllocation: (allocationId: number) => void;
  /** 選択中の倉庫 */
  selectedWarehouse: string;
  /** 単位 */
  unit: string;
  /** ローディング中 */
  isLoading?: boolean;
};

export default function LotListWithAllocation({
  candidates,
  allocatedLots,
  onAllocate,
  onCancelAllocation,
  selectedWarehouse,
  unit,
  isLoading,
}: Props) {
  // 引当数量の入力状態
  const [allocQty, setAllocQty] = React.useState<Record<number, number>>({});

  // ロットIDから引当情報を取得
  const getAllocationInfo = (lotId: number) => {
    return allocatedLots.find((a) => a.lot_id === lotId);
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">ロット情報を読み込み中...</div>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">
          引当可能なロットがありません
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="p-3 border-b bg-gray-50">
        <div className="text-sm font-medium">ロット候補</div>
        {!selectedWarehouse && (
          <div className="text-xs text-amber-600 mt-1">
            ⚠️ 倉庫を選択してください
          </div>
        )}
      </div>

      <div className="divide-y">
        {candidates.map((lot) => {
          const allocation = getAllocationInfo(lot.lot_id);
          const isAllocated = !!allocation;
          const inputQty = allocQty[lot.lot_id] ?? 0;

          return (
            <div
              key={lot.lot_id}
              className={`p-3 ${
                isAllocated ? "bg-green-50" : "hover:bg-gray-50"
              }`}>
              <div className="flex items-start justify-between gap-3">
                {/* 左側: ロット情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {isAllocated && (
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                    )}
                    <div className="font-mono text-sm font-medium truncate">
                      {lot.lot_code}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                    <div>在庫: {lot.stock_qty} {unit}</div>
                    {lot.warehouse_code && (
                      <div>倉庫: {lot.warehouse_code}</div>
                    )}
                    {lot.expiry_date && (
                      <div>期限: {lot.expiry_date}</div>
                    )}
                  </div>

                  {/* 引当済みの場合 */}
                  {isAllocated && allocation && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-medium text-green-700">
                        引当済: {allocation.allocated_qty} {unit}
                      </span>
                      <button
                        className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                        onClick={() =>
                          onCancelAllocation(allocation.allocation_id)
                        }>
                        <X className="h-3 w-3" />
                        取消
                      </button>
                    </div>
                  )}
                </div>

                {/* 右側: 引当操作 */}
                {!isAllocated && (
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="number"
                      min={0}
                      max={lot.stock_qty}
                      value={inputQty}
                      onChange={(e) =>
                        setAllocQty((prev) => ({
                          ...prev,
                          [lot.lot_id]: Number(e.target.value),
                        }))
                      }
                      placeholder="数量"
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                    <button
                      className="px-3 py-1 rounded bg-sky-600 text-white text-sm hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedWarehouse || inputQty <= 0}
                      onClick={() => {
                        onAllocate(lot.lot_id, inputQty);
                        setAllocQty((prev) => ({ ...prev, [lot.lot_id]: 0 }));
                      }}>
                      引当
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
