import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { allocationCandidatesKeys } from "../api/useAllocationCandidates";
import { useOrdersForAllocation } from "../api/useOrdersForAllocation";

import { listCustomers, listProducts } from "@/services/api/master-service";

export function useLotAllocationData() {
  const ordersQuery = useOrdersForAllocation();
  const orders = useMemo(() => ordersQuery.data ?? [], [ordersQuery.data]);

  const allLines = useMemo(() => {
    return orders.flatMap((order) => order.lines ?? []);
  }, [orders]);

  const candidateQueries = useQueries({
    queries: allLines.map((line) => ({
      queryKey: allocationCandidatesKeys.list({
        order_line_id: line.id!,
        strategy: "fefo",
        limit: 100,
      }),
      queryFn: async () => {
        // Note: This is a placeholder. Actual fetch logic should be here or in a separate fetcher.
        // Since we are using useQueries, we need the fetch function.
        // But wait, useCandidateLotFetcher uses getQueryData, implying the data is fetched elsewhere?
        // No, useQueries *fetches* the data.
        // I need to import the fetcher function from api.ts!
        // getAllocationCandidates is in api.ts.

        const response = await import("../../api").then((mod) =>
          mod.getAllocationCandidates({
            order_line_id: line.id!,
            strategy: "fefo",
            limit: 100,
          }),
        );
        return response;
      },
      enabled: !!line.id,
      staleTime: 1000 * 60,
    })),
  });

  const isCandidatesLoading = candidateQueries.some((q) => q.isLoading);

  const customersQuery = useQuery({
    queryKey: ["masters", "customers"],
    queryFn: listCustomers,
    staleTime: 1000 * 60 * 5,
  });

  const productsQuery = useQuery({
    queryKey: ["masters", "products"],
    queryFn: listProducts,
    staleTime: 1000 * 60 * 5,
  });

  return { ordersQuery, orders, allLines, customersQuery, productsQuery, isCandidatesLoading };
}
