import { useAllocationCandidates } from "../../hooks/api";
import type { LineStatus } from "../../hooks/useLotAllocation";
import { LotAllocationPanel } from "./LotAllocationPanel";
import type { OrderWithLinesResponse } from "@/shared/types/aliases";

interface AllocationRowContainerProps {
  order: OrderWithLinesResponse;
  line: any; // OrderLine
  getLineAllocations: (lineId: number) => Record<number, number>;
  onLotAllocationChange: (lineId: number, lotId: number, quantity: number) => void;
  onAutoAllocate: (lineId: number) => void;
  onClearAllocations: (lineId: number) => void;
  onSaveAllocations: (lineId: number) => void;
  lineStatus: LineStatus;
  isOverAllocated: boolean;
  customerName?: string;
  productName?: string;
  isActive: boolean;
  onActivate: () => void;
}

export function AllocationRowContainer({
  order,
  line,
  getLineAllocations,
  onLotAllocationChange,
  onAutoAllocate,
  onClearAllocations,
  onSaveAllocations,
  lineStatus,
  isOverAllocated,
  customerName,
  productName,
  isActive,
  onActivate,
}: AllocationRowContainerProps) {
  const { data, isLoading, error } = useAllocationCandidates({
    order_line_id: line.id,
    strategy: "fefo",
    limit: 200,
  });

  const candidateLots = data?.items ?? [];
  const currentAllocations = getLineAllocations(line.id);
  const canSave = lineStatus === "draft" && !isOverAllocated;

  return (
    <LotAllocationPanel
      order={order}
      orderLine={line}
      customerName={customerName}
      productName={productName}
      candidateLots={candidateLots}
      lotAllocations={currentAllocations}
      onLotAllocationChange={(lotId, qty) => onLotAllocationChange(line.id, lotId, qty)}
      onAutoAllocate={() => onAutoAllocate(line.id)}
      onClearAllocations={() => onClearAllocations(line.id)}
      onSaveAllocations={() => onSaveAllocations(line.id)}
      canSave={canSave}
      isOverAllocated={isOverAllocated}
      isLoading={isLoading}
      error={error as Error}
      isActive={isActive}
      onActivate={onActivate}
    />
  );
}
