// src/pages/OrderCardPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // 🔽 [追加]
import { api } from "@/lib/api-client"; // 🔽 [変更]
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
  Loader2, // 🔽 [追加]
} from "lucide-react";
import { WarehouseAlloc, Warehouse } from "@/types"; // 🔽 [追加]
import { useToast } from "@/hooks/use-toast"; // 🔽 [追加]

export default function OrderCardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingOrderLine, setEditingOrderLine] = useState<any | null>(null); // 🔽 [変更] orderId -> orderLine
  const queryClient = useQueryClient(); // 🔽 [追加]
  const { toast } = useToast(); // 🔽 [追加]

  // 🔽 [変更] モックデータから実API呼び出しに変更
  const { data: orderData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders-with-allocations", { searchQuery, statusFilter }], // 🔽 TODO: フィルタをクエリに反映
    queryFn: () => api.getOrdersWithAllocations(),
  });
  // 🔽 TODO: フィルタリングロジックをここに実装
  const orders = orderData?.items ?? [];

  // 🔽 [追加] 倉庫マスタをAPIから取得
  const { data: warehouseData, isLoading: isLoadingWarehouses } = useQuery({
    queryKey: ["warehouse-alloc-list"],
    queryFn: () => api.getWarehouseAllocList(),
  });
  const availableWarehouses: Warehouse[] = warehouseData?.items ?? [];

  // 🔽 [追加] 保存処理 (useMutation)
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
      // 受注カード一覧を再取得
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
    setEditingOrderLine(null); // モーダルを閉じる
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
          <h2 className="text-2xl font-bold tracking-tight">受注管理 (配分)</h2>
          <p className="text-muted-foreground">
            受注明細ごとに倉庫配分を行います
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
        {/* TODO: ステータスフィルタの実装 */}
      </div>

      {/* 受注カード一覧 */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onEditWarehouse={() => setEditingOrderLine(order)} // 🔽 [変更] orderId -> order
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
          isSaving={saveAllocMutation.isPending} // 🔽 [追加]
        />
      )}
    </div>
  );
}

// 🔽 [変更] 引数の型を `OrderLineWithAlloc` に
function OrderCard({
  order,
  onEditWarehouse,
}: {
  order: any;
  onEditWarehouse: () => void;
}) {
  // 🔽 [仮] フロントのモックデータの status を使うため any を許容
  const statusConfig = {
    open: { color: "bg-blue-500", label: "未処理", icon: AlertTriangle },
    allocated: { color: "bg-green-500", label: "引当済", icon: CheckCircle2 },
    shipped: { color: "bg-yellow-500", label: "出荷済", icon: Package },
    completed: { color: "bg-gray-500", label: "完了", icon: CheckCircle2 },
  };
  const statusKey = order.status as keyof typeof statusConfig;
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
          {/* 🔽 [仮] APIレスポンスに order_date がないためダミー */}
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
              {/* 🔽 [仮] APIレスポンスに due_date がないためダミー */}
              <InfoRow label="納期" value={order.due_date || "2025-11-15"} />
              <InfoRow label="受注番号" value={order.order_no || "-"} />
            </div>

            {/* Forecast情報 */}
            {/* 🔽 [仮] APIレスポンスに forecast_matched がないためダミー */}
            {order.forecast_matched && (
              <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Forecast マッチ済
                  </span>
                </div>
                <div className="text-sm text-blue-700">
                  {/* 🔽 [仮] APIレスポンスに forecast_qty がないためダミー */}
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

          {/* 右側: 関連ロット */}
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {order.status === "open" ? "引当可能ロット" : "引当済ロット"}
              </h3>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground italic">
              (TODO: ロット引当機能)
              {/* {order.related_lots?.map((lot: any) => (
                <LotCard key={lot.id} lot={lot} status={order.status} />
              ))} 
              */}
            </div>
          </div>
        </div>

        {/* カードフッター */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex gap-2">
            {/* <Select defaultValue={order.status}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">未処理</SelectItem>
                <SelectItem value="allocated">引当済</SelectItem>
                <SelectItem value="shipped">出荷済</SelectItem>
                <SelectItem value="completed">完了</SelectItem>
              </SelectContent>
            </Select>
            */}
          </div>
          <Button variant="ghost" disabled>
            詳細
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// 🔽 [変更] `onEditWarehouse` の型
function InfoRow({ label, value, highlight = false }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className={`text-sm ${highlight ? "font-semibold" : ""}`}>
        {value}
      </span>
    </div>
  );
}
