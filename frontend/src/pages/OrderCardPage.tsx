// src/pages/OrderCardPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WarehouseAllocationModal } from "@/components/WarehouseAllocationModal";
import {
  Package,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Edit,
  ChevronRight,
  Loader2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import type {
  WarehouseAlloc,
  Warehouse,
  LotCandidate,
  AllocatedLot,
  LotSelection,
  OrderLineWithAlloc,
} from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function OrderCardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingOrderLine, setEditingOrderLine] = useState<any | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 受注データ取得
  const { data: orderData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders-with-allocations", { searchQuery, statusFilter }],
    queryFn: () => api.getOrdersWithAllocations(),
  });
  const orders = orderData?.items ?? [];

  // 倉庫マスタ取得
  const { data: warehouseData, isLoading: isLoadingWarehouses } = useQuery({
    queryKey: ["warehouse-alloc-list"],
    queryFn: () => api.getWarehouseAllocList(),
  });
  const availableWarehouses: Warehouse[] = warehouseData?.items ?? [];

  // 倉庫配分保存
  const saveAllocMutation = useMutation({
    mutationFn: (data: {
      orderLineId: number;
      allocations: WarehouseAlloc[];
    }) => api.saveWarehouseAllocations(data.orderLineId, data.allocations),
    onSuccess: () => {
      toast({
        title: "保存しました",
        description: "倉庫の配分情報を更新しました。",
      });
      queryClient.invalidateQueries({ queryKey: ["orders-with-allocations"] });
    },
    onError: (error: any) => {
      toast({
        title: "保存失敗",
        description: error.message || "サーバーエラー",
        variant: "destructive",
      });
    },
  });

  const handleSaveAllocations = (allocations: WarehouseAlloc[]) => {
    if (!editingOrderLine) return;
    saveAllocMutation.mutate({
      orderLineId: editingOrderLine.id,
      allocations: allocations,
    });
    setEditingOrderLine(null);
  };

  if (isLoadingOrders || isLoadingWarehouses) {
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
          <h2 className="text-2xl font-bold tracking-tight">ロット引当処理</h2>
          <p className="text-muted-foreground">
            受注明細ごとにロットを引き当てます
          </p>
        </div>
      </div>

      {/* 検索・フィルター */}
      <div className="flex gap-4">
        <Input
          placeholder="品番・得意先で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* 受注カード一覧 */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onEditWarehouse={() => setEditingOrderLine(order)}
          />
        ))}
        {orders.length === 0 && (
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              対象の受注データがありません
            </p>
          </div>
        )}
      </div>

      {/* 倉庫編集モーダル */}
      {editingOrderLine && (
        <WarehouseAllocationModal
          isOpen={!!editingOrderLine}
          onClose={() => setEditingOrderLine(null)}
          onSave={handleSaveAllocations}
          productCode={editingOrderLine.product_code || ""}
          totalQuantity={editingOrderLine.quantity || 0}
          unit={editingOrderLine.unit || "EA"}
          initialAllocations={editingOrderLine.warehouse_allocations || []}
          availableWarehouses={availableWarehouses.map((wh) => ({
            code: wh.warehouse_code,
            name: wh.warehouse_name,
          }))}
          isSaving={saveAllocMutation.isPending}
        />
      )}
    </div>
  );
}

// ===== ロット引当パネル =====
interface LotAllocationPanelProps {
  orderLineId: number;
  productCode: string;
  totalQuantity: number;
  unit: string;
  allocatedLots: AllocatedLot[];
}

function LotAllocationPanel({
  orderLineId,
  productCode,
  totalQuantity,
  unit,
  allocatedLots,
}: LotAllocationPanelProps) {
  const [selections, setSelections] = useState<LotSelection[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // ロット候補を取得
  const { data: candidatesData, isLoading: isLoadingCandidates } = useQuery({
    queryKey: ["candidate-lots", orderLineId],
    queryFn: () => api.getCandidateLots(orderLineId),
    enabled: !!orderLineId,
  });

  const candidates = candidatesData?.items || [];

  // ロット引当実行
  const allocateMutation = useMutation({
    mutationFn: (data: {
      orderLineId: number;
      allocations: Array<{ lot_id: number; qty: number }>;
    }) =>
      api.createLotAllocations(data.orderLineId, {
        allocations: data.allocations,
      }),
    onSuccess: () => {
      toast({
        title: "引当完了",
        description: "ロットの引当が完了しました",
      });
      setSelections([]);
      queryClient.invalidateQueries({ queryKey: ["orders-with-allocations"] });
      queryClient.invalidateQueries({
        queryKey: ["candidate-lots", orderLineId],
      });
    },
    onError: (error: any) => {
      toast({
        title: "引当失敗",
        description: error.message || "エラーが発生しました",
        variant: "destructive",
      });
    },
  });

  // ロット引当取消
  const cancelMutation = useMutation({
    mutationFn: (data: { orderLineId: number; allocationId: number }) =>
      api.cancelLotAllocations(data.orderLineId, {
        allocation_id: data.allocationId,
      }),
    onSuccess: () => {
      toast({
        title: "取消完了",
        description: "引当を取消しました",
      });
      queryClient.invalidateQueries({ queryKey: ["orders-with-allocations"] });
      queryClient.invalidateQueries({
        queryKey: ["candidate-lots", orderLineId],
      });
    },
    onError: (error: any) => {
      toast({
        title: "取消失敗",
        description: error.message || "エラーが発生しました",
        variant: "destructive",
      });
    },
  });

  // ロット選択
  const handleSelectLot = (lot: LotCandidate) => {
    const alreadySelected = selections.find((s) => s.lot_id === lot.lot_id);
    if (alreadySelected) {
      toast({
        title: "既に選択済み",
        description: "このロットは既に選択されています",
        variant: "destructive",
      });
      return;
    }

    setSelections([
      ...selections,
      {
        lot_id: lot.lot_id,
        lot_code: lot.lot_code,
        available_qty: lot.available_qty,
        requested_qty: 0,
        unit: lot.unit,
        warehouse_code: lot.warehouse_code,
        expiry_date: lot.expiry_date,
      },
    ]);
  };

  // 数量変更
  const handleQuantityChange = (lotId: number, qty: number) => {
    setSelections(
      selections.map((s) =>
        s.lot_id === lotId ? { ...s, requested_qty: qty } : s
      )
    );
  };

  // ロット削除
  const handleRemoveSelection = (lotId: number) => {
    setSelections(selections.filter((s) => s.lot_id !== lotId));
  };

  // 引当実行
  const handleAllocate = () => {
    // バリデーション
    const hasInvalidQty = selections.some((s) => s.requested_qty <= 0);
    if (hasInvalidQty) {
      toast({
        title: "入力エラー",
        description: "数量は0より大きい値を入力してください",
        variant: "destructive",
      });
      return;
    }

    const hasExceeded = selections.some(
      (s) => s.requested_qty > s.available_qty
    );
    if (hasExceeded) {
      toast({
        title: "在庫エラー",
        description: "利用可能数量を超えています",
        variant: "destructive",
      });
      return;
    }

    // 引当実行
    allocateMutation.mutate({
      orderLineId,
      allocations: selections.map((s) => ({
        lot_id: s.lot_id,
        qty: s.requested_qty,
      })),
    });
  };

  // 引当取消
  const handleCancelAllocation = (allocationId: number) => {
    if (confirm("この引当を取消しますか?")) {
      cancelMutation.mutate({ orderLineId, allocationId });
    }
  };

  const totalSelected = selections.reduce((sum, s) => sum + s.requested_qty, 0);
  const totalAllocated = allocatedLots.reduce(
    (sum, a) => sum + a.allocated_qty,
    0
  );
  const remaining = totalQuantity - totalAllocated - totalSelected;

  return (
    <div className="space-y-4">
      {/* 引当済みロット */}
      {allocatedLots.length > 0 && (
        <div className="border rounded-lg p-4 bg-green-50">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            引当済みロット
          </h4>
          <div className="space-y-2">
            {allocatedLots.map((alloc) => (
              <div
                key={alloc.allocation_id}
                className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1">
                  <div className="text-sm font-medium">{alloc.lot_code}</div>
                  <div className="text-xs text-muted-foreground">
                    {alloc.allocated_qty} {unit} / {alloc.warehouse_code}
                    {alloc.expiry_date && ` / 期限: ${alloc.expiry_date}`}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCancelAllocation(alloc.allocation_id)}
                  disabled={cancelMutation.isPending}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 進捗バー */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span>引当進捗</span>
          <span className={remaining < 0 ? "text-destructive" : ""}>
            {totalAllocated + totalSelected} / {totalQuantity} {unit}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              remaining < 0 ? "bg-destructive" : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                100,
                ((totalAllocated + totalSelected) / totalQuantity) * 100
              )}%`,
            }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          残り: {remaining} {unit}
        </div>
      </div>

      {/* 選択中のロット */}
      {selections.length > 0 && (
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">選択中のロット</h4>
          <div className="space-y-2">
            {selections.map((selection) => (
              <div
                key={selection.lot_id}
                className="flex items-center gap-2 p-2 bg-blue-50 rounded border">
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {selection.lot_code}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    在庫: {selection.available_qty} {unit} /{" "}
                    {selection.warehouse_code}
                  </div>
                </div>
                <Input
                  type="number"
                  min="0"
                  max={selection.available_qty}
                  value={selection.requested_qty || ""}
                  onChange={(e) =>
                    handleQuantityChange(
                      selection.lot_id,
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-24"
                  placeholder="数量"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSelection(selection.lot_id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-2"
            onClick={handleAllocate}
            disabled={allocateMutation.isPending || selections.length === 0}>
            {allocateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                処理中...
              </>
            ) : (
              "割当実行"
            )}
          </Button>
        </div>
      )}

      {/* 引当可能ロット一覧 */}
      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-semibold mb-2">引当可能ロット</h4>
        {isLoadingCandidates ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground text-sm">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            引当可能なロットがありません
          </div>
        ) : (
          <div className="space-y-2">
            {candidates.map((lot) => (
              <div
                key={lot.lot_id}
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelectLot(lot)}>
                <div className="flex-1">
                  <div className="text-sm font-medium">{lot.lot_code}</div>
                  <div className="text-xs text-muted-foreground">
                    在庫: {lot.available_qty} {lot.unit} / {lot.warehouse_code}
                  </div>
                  {lot.expiry_date && (
                    <div className="text-xs text-muted-foreground">
                      期限: {lot.expiry_date}
                    </div>
                  )}
                </div>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== 受注カードコンポーネント =====
function OrderCard({
  order,
  onEditWarehouse,
}: {
  order: OrderLineWithAlloc;
  onEditWarehouse: () => void;
}) {
  const statusConfig = {
    open: { color: "bg-blue-500", label: "未処理", icon: AlertTriangle },
    allocated: { color: "bg-green-500", label: "引当済", icon: CheckCircle2 },
    shipped: { color: "bg-yellow-500", label: "出荷済", icon: Package },
    completed: { color: "bg-gray-500", label: "完了", icon: CheckCircle2 },
  };
  const statusKey = (order.status || "open") as keyof typeof statusConfig;
  const status = statusConfig[statusKey] || statusConfig.open;
  const StatusIcon = status.icon;

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      {/* カードヘッダー */}
      <div
        className={`flex items-center justify-between border-b p-4 ${status.color} bg-opacity-10`}>
        <div className="flex items-center gap-3">
          <StatusIcon
            className={`h-5 w-5 ${status.color.replace("bg-", "text-")}`}
          />
          <span className="font-semibold">{status.label}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          <Calendar className="inline h-4 w-4 mr-1" />
          受注日: {order.order_date || "2025-11-01"}
        </div>
      </div>

      {/* カードコンテンツ */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* 左側: 受注情報 */}
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                受注情報
              </h3>
            </div>

            <div className="space-y-3">
              <InfoRow label="品番" value={order.product_code} highlight />
              <InfoRow label="品名" value={order.product_name} />
              <InfoRow label="得意先" value={order.customer_code} />
              <InfoRow label="仕入先" value={order.supplier_code || "N/A"} />
              <InfoRow
                label="数量"
                value={`${order.quantity} ${order.unit}`}
                highlight
              />
              <InfoRow label="納期" value={order.due_date || "2025-11-15"} />
              <InfoRow label="受注番号" value={order.order_no || "-"} />
            </div>

            {/* Forecast情報 */}
            {order.forecast_matched && (
              <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Forecast マッチ済
                  </span>
                </div>
                <div className="text-sm text-blue-700">
                  予測数量: {order.forecast_qty || order.quantity} {order.unit}
                </div>
              </div>
            )}

            {/* 倉庫配分 */}
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">出荷倉庫</span>
                <Button variant="outline" size="sm" onClick={onEditWarehouse}>
                  <Edit className="mr-2 h-3 w-3" />
                  編集
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.warehouse_allocations?.length > 0 ? (
                  order.warehouse_allocations.map(
                    (alloc: WarehouseAlloc, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {alloc.warehouse_code}: {alloc.quantity} {order.unit}
                      </Badge>
                    )
                  )
                ) : (
                  <span className="text-sm text-muted-foreground">未設定</span>
                )}
              </div>
            </div>
          </div>

          {/* 右側: ロット引当パネル */}
          <div>
            <div className="border-b pb-3 mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                ロット引当処理
              </h3>
            </div>
            <LotAllocationPanel
              orderLineId={order.id}
              productCode={order.product_code}
              totalQuantity={order.quantity}
              unit={order.unit}
              allocatedLots={order.allocated_lots || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== InfoRowコンポーネント =====
function InfoRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className={`text-sm ${highlight ? "font-semibold" : ""}`}>
        {value}
      </span>
    </div>
  );
}
