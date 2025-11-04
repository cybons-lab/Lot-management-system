import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { components } from "@/types/api.gen";

type DragAssignReq = components["schemas"]["DragAssignRequest"];
type DragAssignRes = components["schemas"]["DragAssignResponse"];

export const useOrders = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => api.getOrders(filters),
  });
};

export const useOrderDetail = (orderId: number) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => api.getOrderDetail(orderId),
    enabled: !!orderId,
  });
};

export const useDragAssign = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: DragAssignReq) => api.dragAssignAllocation(payload),
    onSuccess: (_res, variables) => {
      // 副作用例：対象受注を再取得
      const orderId = variables.order_id as number; // スキーマに合わせて
      qc.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });
};
