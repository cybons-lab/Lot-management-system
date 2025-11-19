import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/shared/libs/utils";
import type { OrderLine } from "@/shared/types/aliases";

interface LotAllocationHeaderProps {
  orderLine: OrderLine;
  requiredQty: number;
  totalAllocated: number;
  remainingQty: number;
  progressPercent: number;
  isOverAllocated: boolean;
  onAutoAllocate: () => void;
  onClearAllocations: () => void;
  onSaveAllocations: () => void;
  canSave: boolean;
  isSaving: boolean;
  isLoading: boolean;
  hasCandidates: boolean;
}

export function LotAllocationHeader({
  orderLine,
  requiredQty,
  totalAllocated,
  remainingQty,
  progressPercent,
  isOverAllocated,
  onAutoAllocate,
  onClearAllocations,
  onSaveAllocations,
  canSave,
  isSaving,
  isLoading,
  hasCandidates,
}: LotAllocationHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900">
            {orderLine.product_code}
          </h3>
          <p className="truncate text-xs text-gray-500">{orderLine.product_name}</p>
        </div>
        
        {/* Main Actions */}
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAutoAllocate}
            disabled={isLoading || !hasCandidates || remainingQty <= 0}
            className="h-8 text-xs"
          >
            自動引当(FEFO)
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearAllocations}
            disabled={totalAllocated === 0}
            className="h-8 text-xs"
          >
            クリア
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onSaveAllocations}
            disabled={!canSave}
            className={cn(
              "h-8 min-w-[80px] text-xs font-semibold shadow-sm",
              isOverAllocated
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {isSaving ? "保存中..." : "保存"}
          </Button>
        </div>
      </div>

      {/* Totals Bar */}
      <div className="mt-3 flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">必要数量</span>
            <span className="font-mono font-semibold text-gray-900">
              {requiredQty.toLocaleString()}
            </span>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">引当合計</span>
            <span className="font-mono font-semibold text-blue-600">
              {totalAllocated.toLocaleString()}
            </span>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">残り</span>
            <span
              className={cn(
                "font-mono font-semibold",
                remainingQty > 0
                  ? "text-red-600"
                  : remainingQty < 0
                  ? "text-red-600" // Over allocated
                  : "text-green-600" // Just right
              )}
            >
              {Math.abs(remainingQty).toLocaleString()}
              {remainingQty < 0 && <span className="ml-1 text-[10px]">(過剰)</span>}
            </span>
          </div>
        </div>
        
        <div className="flex w-32 flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <span>進捗</span>
            <span className="font-medium text-gray-900">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5 w-full" />
        </div>
      </div>
    </div>
  );
}
