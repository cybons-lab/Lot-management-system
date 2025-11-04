/**
 * ロット引当ページ
 * 受注詳細取得: GET /api/orders/{order_id}
 * ロット候補取得: GET /api/lots (FEFO順)
 * 引当実行: POST /api/allocations/drag-assign
 */

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type DragAssignRequest } from "@/services/api";

export default function OrderCardPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedLineId, setSelectedLineId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // 受注一覧を取得
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.getOrders({ status: "open" }),
  });

  // 選択された受注の詳細を取得
  const orderDetailQuery = useQuery({
    queryKey: ["order", selectedOrderId],
    queryFn: () => api.getOrderDetail(selectedOrderId!),
    enabled: !!selectedOrderId,
  });

  // 選択された明細行の情報
  const selectedLine = orderDetailQuery.data?.lines?.find(
    (line) => line.id === selectedLineId
  );

  // ロット候補を取得（製品コード指定、在庫あり、FEFO順）
  const lotsQuery = useQuery({
    queryKey: ["lots", selectedLine?.product_code],
    queryFn: () =>
      api.listLots({
        product_id: selectedLine?.product_code,
        with_stock: true,
      }),
    enabled: !!selectedLine?.product_code,
  });

  // FEFO順にソート（expiry_date 昇順、nullは最後）
  const sortedLots = (lotsQuery.data ?? []).slice().sort((a, b) => {
    if (!a.expiry_date && !b.expiry_date) return 0;
    if (!a.expiry_date) return 1;
    if (!b.expiry_date) return -1;
    return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
  });

  // 引当実行ミューテーション
  const allocateMutation = useMutation({
    mutationFn: (request: DragAssignRequest) =>
      api.dragAssignAllocation(request),
    onSuccess: () => {
      // 成功時に受注詳細を再取得
      queryClient.invalidateQueries({ queryKey: ["order", selectedOrderId] });
      queryClient.invalidateQueries({ queryKey: ["lots"] });
      alert("引当が完了しました");
    },
    onError: (error: any) => {
      alert(
        `引当に失敗しました: ${error?.response?.data?.detail || error.message}`
      );
    },
  });

  const handleAllocate = (lotId: number, quantity: number) => {
    if (!selectedLineId) {
      alert("受注明細を選択してください");
      return;
    }

    if (quantity <= 0) {
      alert("数量は1以上を指定してください");
      return;
    }

    allocateMutation.mutate({
      order_line_id: selectedLineId,
      lot_id: lotId,
      allocate_qty: quantity,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">ロット引当処理</h2>
        <p className="text-muted-foreground">
          受注に対してロットを引き当てます（FEFO: 先入先出）
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左カラム: 受注選択 */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">受注選択</h3>
            
            {ordersQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">読み込み中...</p>
            ) : ordersQuery.isError ? (
              <p className="text-sm text-destructive">
                受注の取得に失敗しました
              </p>
            ) : (
              <div className="space-y-2">
                {ordersQuery.data?.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setSelectedLineId(null);
                    }}
                    className={`w-full text-left p-3 rounded border ${
                      selectedOrderId === order.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="font-medium">{order.order_no}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customer_code}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 受注明細選択 */}
          {orderDetailQuery.data && (
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">受注明細選択</h3>
              <div className="space-y-2">
                {orderDetailQuery.data.lines?.map((line) => {
                  const allocatedQty = Number(line.allocated_qty) || 0;
                  const requiredQty = Number(line.quantity) || 0;
                  const remainingQty = requiredQty - allocatedQty;

                  return (
                    <button
                      key={line.id}
                      onClick={() => setSelectedLineId(line.id)}
                      className={`w-full text-left p-3 rounded border ${
                        selectedLineId === line.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="font-medium">{line.product_code}</div>
                      <div className="text-sm text-muted-foreground">
                        要求: {requiredQty} {line.unit} / 引当済: {allocatedQty}{" "}
                        {line.unit} / 残: {remainingQty} {line.unit}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 右カラム: ロット候補（FEFO順） */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">
              ロット候補（FEFO順）
            </h3>
            
            {!selectedLine ? (
              <p className="text-sm text-muted-foreground">
                受注明細を選択してください
              </p>
            ) : lotsQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">読み込み中...</p>
            ) : lotsQuery.isError ? (
              <p className="text-sm text-destructive">
                ロットの取得に失敗しました
              </p>
            ) : sortedLots.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                在庫のあるロットが見つかりません
              </p>
            ) : (
              <div className="space-y-3">
                {sortedLots.map((lot) => {
                  const currentQty =
                    Number(lot.current_stock?.current_quantity) || 0;
                  const selectedLineQty = Number(selectedLine.quantity) || 0;
                  const allocatedQty = Number(selectedLine.allocated_qty) || 0;
                  const remainingQty = selectedLineQty - allocatedQty;

                  return (
                    <LotCard
                      key={lot.id}
                      lot={lot}
                      currentQty={currentQty}
                      remainingQty={remainingQty}
                      onAllocate={handleAllocate}
                      isLoading={allocateMutation.isPending}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== LotCard コンポーネント =====
interface LotCardProps {
  lot: any;
  currentQty: number;
  remainingQty: number;
  onAllocate: (lotId: number, quantity: number) => void;
  isLoading: boolean;
}

function LotCard({
  lot,
  currentQty,
  remainingQty,
  onAllocate,
  isLoading,
}: LotCardProps) {
  const [allocateQty, setAllocateQty] = useState<number>(
    Math.min(currentQty, remainingQty)
  );

  const maxQty = Math.min(currentQty, remainingQty);

  return (
    <div className="border rounded p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{lot.lot_number}</div>
          <div className="text-sm text-muted-foreground">
            在庫: {currentQty.toLocaleString()}
          </div>
        </div>
        {lot.expiry_date && (
          <div className="text-xs text-muted-foreground">
            期限: {new Date(lot.expiry_date).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="number"
          min="0"
          max={maxQty}
          value={allocateQty}
          onChange={(e) => {
            const val = Number(e.target.value) || 0;
            setAllocateQty(Math.min(Math.max(0, val), maxQty));
          }}
          className="flex-1 px-3 py-2 border rounded text-sm"
          disabled={isLoading || maxQty === 0}
        />
        <button
          onClick={() => onAllocate(lot.id, allocateQty)}
          disabled={isLoading || allocateQty <= 0 || allocateQty > maxQty}
          className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          {isLoading ? "処理中..." : "引当"}
        </button>
      </div>

      {maxQty === 0 && (
        <p className="text-xs text-destructive">在庫不足または引当済み</p>
      )}
    </div>
  );
}
