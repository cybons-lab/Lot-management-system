/**
 * LotAllocationPanel - ロット引当パネル（再利用可能）
 *
 * 機能:
 * - ロット候補一覧表示
 * - 各ロットから引当る数量を入力
 * - 「全量」ボタン（残り必要数量を自動入力）
 * - 自動引当（FEFO）ボタン
 * - クリアボタン
 * - 保存ボタン
 * - layout prop により inline / sidePane で見た目調整
 */

import type { CandidateLotItem } from "../api";

import { LotAllocationHeader } from "./LotAllocationHeader";
import { LotListCard } from "./LotListCard";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/shared/libs/utils";
import type { OrderLine } from "@/shared/types/aliases";

interface LotAllocationPanelProps {
  /** 選択中の明細行 */
  orderLine: OrderLine | null;
  /** ロット候補一覧 */
  candidateLots: CandidateLotItem[];
  /** ロット引当入力（lotId -> quantity） */
  lotAllocations: Record<number, number>;
  /** ロット引当数量変更ハンドラー */
  onLotAllocationChange: (lotId: number, quantity: number) => void;
  /** 全量ボタンハンドラー（指定ロットで全量にしたい場合） */
  onFillAllFromLot?: (lotId: number) => void;
  /** 自動引当（FEFO）ハンドラー */
  onAutoAllocate: () => void;
  /** クリアハンドラー */
  onClearAllocations: () => void;
  /** 保存ハンドラー */
  onSaveAllocations?: () => void;
  /** 保存可否（外部制御用） */
  canSave?: boolean;
  /** レイアウトモード */
  layout?: "inline" | "sidePane";
  /** ローディング状態 */
  isLoading?: boolean;
  /** エラー */
  error?: Error | null;
  /** 保存中 */
  isSaving?: boolean;
  /** 過剰引当フラグ */
  isOverAllocated?: boolean;
  /** 残り必要数量（負の値は過剰分） */
  remainingQty?: number;
}

export function LotAllocationPanel({
  orderLine,
  candidateLots,
  lotAllocations,
  onLotAllocationChange,
  onFillAllFromLot,
  onAutoAllocate,
  onClearAllocations,
  onSaveAllocations,
  canSave,
  layout = "sidePane",
  isLoading = false,
  error = null,
  isSaving = false,
  isOverAllocated = false,
  remainingQty: propRemainingQty,
}: LotAllocationPanelProps) {
  const { toast } = useToast();

  // スタイル調整（inline vs sidePane）
  const containerClasses = cn(
    "flex flex-col bg-white",
    layout === "sidePane" ? "h-full" : "rounded-lg border border-gray-200",
  );

  const contentClasses = cn(
    "flex-1 space-y-3 overflow-y-auto bg-gray-50/50 px-4 py-4", // Added slight bg for contrast
    layout === "inline" && "max-h-[600px]",
  );

  // 必要数量・引当済み・残り
  const requiredQty = orderLine ? Number(orderLine.order_quantity ?? orderLine.quantity ?? 0) : 0;
  const dbAllocated = orderLine
    ? Number(orderLine.allocated_qty ?? orderLine.allocated_quantity ?? 0)
    : 0;
  const uiAllocatedTotal = Object.values(lotAllocations).reduce((sum, qty) => sum + qty, 0);
  const totalAllocated = dbAllocated + uiAllocatedTotal;

  // Use prop remainingQty if provided, otherwise calculate locally (though prop is preferred for sync)
  const remainingQty =
    propRemainingQty !== undefined ? propRemainingQty : Math.max(0, requiredQty - totalAllocated);

  const progressPercent = requiredQty > 0 ? Math.min(100, (totalAllocated / requiredQty) * 100) : 0;

  // 保存可能判定
  const autoCanSave = uiAllocatedTotal > 0 && !isSaving && !isOverAllocated;
  const effectiveCanSave = typeof canSave === "boolean" ? canSave : autoCanSave;

  // Handle save with toast feedback
  const handleSave = () => {
    if (!onSaveAllocations) return;

    if (isOverAllocated) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: "必要数量を超えて引当されています。数量を調整してください。",
      });
      return;
    }

    onSaveAllocations();
  };

  if (!orderLine) {
    return (
      <div className={containerClasses}>
        <div className="flex h-full items-center justify-center p-8 text-center text-gray-500">
          {layout === "inline" ? "明細を選択してください" : "左から明細を選択してください"}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Header Component */}
      <LotAllocationHeader
        orderLine={orderLine}
        requiredQty={requiredQty}
        totalAllocated={totalAllocated}
        remainingQty={remainingQty}
        progressPercent={progressPercent}
        isOverAllocated={isOverAllocated}
        onAutoAllocate={onAutoAllocate}
        onClearAllocations={onClearAllocations}
        onSaveAllocations={handleSave}
        canSave={effectiveCanSave}
        isSaving={isSaving}
        isLoading={isLoading}
        hasCandidates={candidateLots.length > 0}
      />

      {/* ロット候補一覧 */}
      <div className={contentClasses}>
        {isLoading ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            候補ロットを読み込み中...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-center text-sm font-semibold text-red-800">
              候補ロットの取得に失敗しました
            </p>
            <p className="mt-1 text-center text-xs text-red-600">
              {error instanceof Error ? error.message : "サーバーエラーが発生しました"}
            </p>
          </div>
        ) : candidateLots.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
            <p className="text-sm font-medium text-gray-600">候補ロットがありません</p>
            <p className="mt-1 text-xs text-gray-400">この製品の在庫が存在しません</p>
          </div>
        ) : (
          <div className="space-y-3 pb-10">
            {candidateLots.map((lot) => {
              const lotId = lot.lot_id;
              const allocatedQty = lotAllocations[lotId] ?? 0;

              return (
                <LotListCard
                  key={lotId}
                  lot={lot}
                  allocatedQty={allocatedQty}
                  onAllocationChange={(qty) => onLotAllocationChange(lotId, qty)}
                  onSave={handleSave}
                  canSave={effectiveCanSave}
                  isSaving={isSaving}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
