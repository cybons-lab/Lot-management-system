/**
 * Lots Hooks
 * React Query を使用したロットデータの取得フック
 */

import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

// ========================================
// クエリキー定義
// ========================================

const lotsKeys = {
  all: ["lots"] as const,
  lists: () => [...lotsKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...lotsKeys.lists(), filters] as const,
};

// ========================================
// クエリフック
// ========================================

/**
 * ロット一覧を取得するフック
 * @param filters フィルタ条件
 */
export const useLots = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: lotsKeys.list(filters),
    queryFn: () => api.listLots(filters),
    staleTime: 1000 * 60 * 5, // 5分間キャッシュ
  });
};
