/**
 * Orders Hooks
 * React Query を使用した受注データの取得・更新フック
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { DragAssignRequest } from "@/services/api";

// ========================================
// クエリキー定義
// ========================================

const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...ordersKeys.lists(), filters] as const,
  details: () => [...ordersKeys.all, "detail"] as const,
  detail: (id: number) => [...ordersKeys.details(), id] as const,
};

// ========================================
// クエリフック
// ========================================

/**
 * 受注一覧を取得するフック
 * @param filters フィルタ条件
 */
export const useOrders = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ordersKeys.list(filters),
    queryFn: () => api.getOrders(filters),
    staleTime: 1000 * 60 * 5, // 5分間キャッシュ
  });
};

/**
 * 受注詳細を取得するフック
 * @param orderId 受注ID
 */
export const useOrderDetail = (orderId: number) => {
  return useQuery({
    queryKey: ordersKeys.detail(orderId),
    queryFn: () => api.getOrderDetail(orderId),
    enabled: !!orderId && orderId > 0,
    staleTime: 1000 * 60 * 5, // 5分間キャッシュ
  });
};

// ========================================
// ミューテーションフック
// ========================================

/**
 * ドラッグ&ドロップ引当を実行するフック
 */
export const useDragAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DragAssignRequest) =>
      api.dragAssignAllocation(payload),

    onSuccess: (_response, variables) => {
      // 引当成功時の処理
      const orderId = variables.order_id;

      if (orderId) {
        // 該当受注の詳細を無効化して再取得
        queryClient.invalidateQueries({
          queryKey: ordersKeys.detail(orderId),
        });
      }

      // 受注一覧も無効化（ステータスが変わる可能性があるため）
      queryClient.invalidateQueries({
        queryKey: ordersKeys.lists(),
      });
    },

    onError: (error) => {
      // エラー時の処理
      console.error("Drag assign failed:", error);
    },
  });
};
