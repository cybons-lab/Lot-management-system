// frontend/src/features/orders/hooks/useAllocations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ordersApi from "@/features/orders/api";
import type {
  LotCandidate,
  LotAllocationRequest,
  LotAllocationResponse,
  SaveAllocationsResponse,
  WarehouseAlloc,
  OrdersListParams,
  AllocationCancelRequest,
} from "@/types";

const keyOrderLine = (orderLineId: number) =>
  ["orders", "line", orderLineId] as const;
const keyCandidates = (orderLineId: number) =>
  ["orders", "line", orderLineId, "candidates"] as const;

/**
 * ロット候補を取得（品番一致フィルタ対応）
 */
export function useCandidateLots(
  orderLineId: number | undefined,
  productCode?: string
) {
  return useQuery<{ items: LotCandidate[] }>({
    queryKey: orderLineId
      ? [...keyCandidates(orderLineId), productCode]
      : ["orders", "line", "candidates", "disabled"],
    queryFn: () => ordersApi.getCandidateLots(orderLineId as number),
    enabled: !!orderLineId,
    select: (data) => {
      // 品番が指定されている場合は一致するロットのみを返す
      if (!productCode) return data;
      return {
        items: data.items.filter(
          (lot) => lot.product_code === productCode
        ),
      };
    },
  });
}

/**
 * ロット引当を作成（楽観的更新対応）
 */
export function useCreateAllocations(
  orderLineId: number,
  refetchParams?: OrdersListParams
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LotAllocationRequest) =>
      ordersApi.createLotAllocations(orderLineId, payload),
    onMutate: async (newAlloc) => {
      // 進行中のクエリをキャンセル
      await qc.cancelQueries({ queryKey: ["orders"] });
      
      // 現在のデータを保存（ロールバック用）
      const previousData = qc.getQueryData(["orders"]);
      
      // 楽観的更新: 候補ロットの在庫を即座に減算
      qc.setQueriesData(
        { queryKey: keyCandidates(orderLineId) },
        (old: any) => {
          if (!old?.items) return old;
          return {
            ...old,
            items: old.items.map((lot: LotCandidate) => {
              const allocItem = newAlloc.items.find(
                (item) => item.lot_id === lot.lot_id
              );
              if (!allocItem) return lot;
              return {
                ...lot,
                stock_qty: lot.stock_qty - allocItem.qty,
              };
            }),
          };
        }
      );
      
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      // エラー時はロールバック
      if (context?.previousData) {
        qc.setQueryData(["orders"], context.previousData);
      }
    },
    onSettled: () => {
      // 最終的にサーバーデータで更新
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: keyCandidates(orderLineId) });
    },
  });
}

/**
 * 引当を取消
 */
export function useCancelAllocations(orderLineId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: AllocationCancelRequest) =>
      ordersApi.cancelLotAllocations(orderLineId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: keyCandidates(orderLineId) });
    },
  });
}

/**
 * 倉庫別配分を保存（楽観的更新対応）
 */
export function useSaveWarehouseAllocations(orderLineId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (allocations: WarehouseAlloc[]) =>
      ordersApi.saveWarehouseAllocations(orderLineId, allocations),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["orders"] });
      const previousData = qc.getQueryData(["orders"]);
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        qc.setQueryData(["orders"], context.previousData);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

/**
 * 受注明細のステータスを更新
 */
export function useUpdateOrderLineStatus(orderLineId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newStatus: string) =>
      ordersApi.updateOrderLineStatus(orderLineId, newStatus),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

/**
 * 受注の再マッチング
 */
export function useReMatchOrder(orderId: number | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => ordersApi.reMatchOrder(orderId as number),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
