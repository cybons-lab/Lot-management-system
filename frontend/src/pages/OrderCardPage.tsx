// frontend/src/pages/OrderCardPage.tsx
import React from "react";
import OrderFilters from "@/features/orders/components/OrderFilters";
import OrderLineCard from "@/features/orders/components/OrderLineCard";
import { useOrdersWithAllocations } from "@/features/orders/hooks/useOrders";
import type { OrdersListParams } from "@/types";
import { isValidDate } from "@/lib/utils/date";

const DEFAULT_PARAMS: OrdersListParams = {
  skip: 0,
  limit: 50,
  due_filter: "all",
  sort_by: "due_date",
  sort_order: "asc",
};

const PAGE_SIZE = 25;

const norm = (s?: string) => (s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function OrderCardPage() {
  const [params, setParams] = React.useState<OrdersListParams>(DEFAULT_PARAMS);
  const [page, setPage] = React.useState(0);
  const { data, isLoading, refetch } = useOrdersWithAllocations();

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
    setPage(0);
  };
  const handleSearch = () => refetch();

  // ★ API 形: { items: [ <行> ] } または配列本体
  const allLines: any[] = React.useMemo(() => {
    const raw: any = data ?? [];
    return Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.items)
      ? raw.items
      : [];
  }, [data]);

  // ★ フィルタ（顧客コードはゆるい一致）
  const filteredLines = React.useMemo(() => {
    const wantCustomer = norm(params.customer_code);
    const wantStatus = norm(params.status);
    const wantDue = params.due_filter ?? "all";
    return allLines.filter((ln) => {
      const okC =
        !wantCustomer || norm(ln.customer_code).includes(wantCustomer);
      const okS = !wantStatus || norm(ln.status) === wantStatus;
      // 納期候補: due_date（正式）→ ship_date（誤用/流用）→ planned_ship_date（逆算予定）
      const dueSource =
        ln?.due_date ?? ln?.ship_date ?? ln?.planned_ship_date ?? null;
      const hasDue = isValidDate(dueSource);

      const okDue =
        wantDue === "all" ? true : wantDue === "has_due" ? hasDue : !hasDue;
      return okC && okS && okDue;
    });
  }, [allLines, params]);

  // ★ ソート
  const sortedLines = React.useMemo(() => {
    const sorted = [...filteredLines];
    const sortBy = params.sort_by ?? "due_date";
    const sortOrder = params.sort_order ?? "asc";

    sorted.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      if (sortBy === "due_date") {
        aVal = a.due_date ?? a.ship_date ?? a.planned_ship_date ?? "9999-12-31";
        bVal = b.due_date ?? b.ship_date ?? b.planned_ship_date ?? "9999-12-31";
        const aTime = new Date(aVal).getTime();
        const bTime = new Date(bVal).getTime();
        return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
      } else if (sortBy === "status") {
        aVal = a.status ?? "";
        bVal = b.status ?? "";
        const cmp = aVal.localeCompare(bVal);
        return sortOrder === "asc" ? cmp : -cmp;
      } else if (sortBy === "order_date") {
        aVal = a.order_date ?? "9999-12-31";
        bVal = b.order_date ?? "9999-12-31";
        const aTime = new Date(aVal).getTime();
        const bTime = new Date(bVal).getTime();
        return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
      }
      return 0;
    });

    return sorted;
  }, [filteredLines, params.sort_by, params.sort_order]);

  // ★ ページング
  const totalPages = Math.ceil(sortedLines.length / PAGE_SIZE);
  const pagedLines = sortedLines.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  return (
    <div className="space-y-4 mx-auto px-3 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
      {/* フィルタ */}
      <OrderFilters
        value={params}
        onChange={(newParams) => {
          setParams(newParams);
          setPage(0); // フィルタ変更時はページをリセット
        }}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* ソート選択 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">並び替え:</label>
          <select
            className="border rounded px-3 py-1 text-sm"
            value={params.sort_by ?? "due_date"}
            onChange={(e) =>
              setParams({
                ...params,
                sort_by: e.target.value as any,
              })
            }>
            <option value="due_date">納期</option>
            <option value="status">ステータス</option>
            <option value="order_date">受注日</option>
          </select>

          <select
            className="border rounded px-2 py-1 text-sm"
            value={params.sort_order ?? "asc"}
            onChange={(e) =>
              setParams({
                ...params,
                sort_order: e.target.value as "asc" | "desc",
              })
            }>
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </div>

        {/* 件数バッジ */}
        <div className="text-sm text-muted-foreground">
          {sortedLines.length} / {allLines.length} 件
        </div>
      </div>

      {/* ローディング */}
      {isLoading && (
        <div className="p-3 text-sm text-gray-500">読み込み中…</div>
      )}

      {/* 結果なし */}
      {!isLoading && sortedLines.length === 0 && (
        <div className="p-3 text-sm text-amber-600 border rounded">
          該当する受注明細がありません。フィルタを見直してください
          （顧客コードはハイフン等を無視して検索されます）。
        </div>
      )}

      {/* カード一覧 */}
      <div className="grid gap-3">
        {pagedLines.map((ln) => (
          <OrderLineCard
            key={ln.id}
            line={ln}
          />
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 py-4">
          <button
            className="px-4 py-2 rounded border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}>
            ← 前へ
          </button>

          <span className="text-sm text-gray-600">
            {page + 1} / {totalPages} ページ
          </span>

          <button
            className="px-4 py-2 rounded border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>
            次へ →
          </button>
        </div>
      )}
    </div>
  );
}
