/**
 * SummaryPage.tsx (v2.2 - Phase D-6 Updated)
 *
 * 在庫サマリページ
 * - 在庫アイテムの統計情報を表示（製品×倉庫単位）
 * - 総在庫数、利用可能在庫数、引当済在庫数など
 */
/* eslint-disable max-lines-per-function */

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInventoryItems } from "../hooks";

import * as styles from "./styles";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { StatCard } from "@/features/inventory/components/StatCard";
import { useInventoryStats } from "@/features/inventory/hooks/useInventoryStats";
import { Section } from "@/shared/components/layout";
import { fmt } from "@/shared/utils/number";

// ============================================
// メインコンポーネント
// ============================================

export function SummaryPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    product_id: "",
    warehouse_id: "",
  });

  // Build query params
  const queryParams = {
    product_id: filters.product_id ? Number(filters.product_id) : undefined,
    warehouse_id: filters.warehouse_id ? Number(filters.warehouse_id) : undefined,
  };

  // データ取得
  const { data: inventoryItems = [], isLoading, error, refetch } = useInventoryItems(queryParams);

  // 統計情報の計算
  const stats = useInventoryStats(inventoryItems);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Section>
        <div className={styles.errorState.root}>
          <p className={styles.errorState.title}>データの取得に失敗しました</p>
          <p className={styles.errorState.message}>
            {error instanceof Error ? error.message : "サーバーエラーが発生しました"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className={styles.errorState.retryButton}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            再試行
          </Button>
        </div>
      </Section>
    );
  }

  const handleViewDetail = (productId: number, warehouseId: number) => {
    navigate(ROUTES.INVENTORY.ITEMS.DETAIL(productId, warehouseId));
  };

  return (
    <div className={styles.root}>
      {/* 統計カード */}
      <div className={styles.statsGrid}>
        {/* 在庫アイテム数 */}
        <StatCard
          title="在庫アイテム数"
          value={fmt(stats.totalItems)}
          description="製品×倉庫の組み合わせ数"
        />

        {/* 総在庫数 */}
        <StatCard
          title="総在庫数"
          value={fmt(stats.totalQuantity)}
          description="すべての在庫の合計数量"
          highlight
        />

        {/* 利用可能在庫数 */}
        <StatCard
          title="利用可能在庫数"
          value={fmt(stats.totalAvailable)}
          description="引当可能な在庫数"
          highlight
        />

        {/* 引当済在庫数 */}
        <StatCard
          title="引当済在庫数"
          value={fmt(stats.totalAllocated)}
          description="既に引当済の在庫数"
        />

        {/* 製品種類数 */}
        <StatCard
          title="製品種類数"
          value={fmt(stats.uniqueProducts)}
          description="在庫がある製品の種類"
        />

        {/* 倉庫数 */}
        <StatCard
          title="倉庫数"
          value={fmt(stats.uniqueWarehouses)}
          description="在庫がある倉庫の数"
        />
      </div>

      {/* Filters */}
      <div className={styles.filterCard}>
        <div className={styles.detailGrid.root}>
          <div>
            <Label className="mb-2 block text-sm font-medium">製品ID</Label>
            <Input
              type="number"
              value={filters.product_id}
              onChange={(e) => setFilters({ ...filters, product_id: e.target.value })}
              placeholder="製品IDで絞り込み"
            />
          </div>
          <div>
            <Label className="mb-2 block text-sm font-medium">倉庫ID</Label>
            <Input
              type="number"
              value={filters.warehouse_id}
              onChange={(e) => setFilters({ ...filters, warehouse_id: e.target.value })}
              placeholder="倉庫IDで絞り込み"
            />
          </div>
        </div>
      </div>

      {/* Inventory Items Table */}
      {inventoryItems.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">{inventoryItems.length} 件の在庫アイテム</div>

          <div className={styles.table.container}>
            <table className={styles.table.root}>
              <thead className={styles.table.thead}>
                <tr>
                  <th className={styles.table.th}>製品</th>
                  <th className={styles.table.th}>倉庫</th>
                  <th className={styles.table.thRight}>
                    総在庫数
                  </th>
                  <th className={styles.table.thRight}>引当済</th>
                  <th className={styles.table.thRight}>
                    利用可能
                  </th>
                  <th className={styles.table.th}>
                    最終更新
                  </th>
                  <th className={styles.table.thRight}>
                    アクション
                  </th>
                </tr>
              </thead>
              <tbody className={styles.table.tbody}>
                {inventoryItems.map((item) => (
                  <tr key={`${item.product_id}-${item.warehouse_id}`} className={styles.table.tr}>
                    <td className={styles.table.td}>
                      {item.product_name || item.product_code || `ID: ${item.product_id}`}
                    </td>
                    <td className={styles.table.td}>
                      {item.warehouse_name || `ID: ${item.warehouse_id}`}
                    </td>
                    <td className={styles.table.tdRight}>
                      {fmt(item.total_quantity)}
                    </td>
                    <td className={styles.table.tdRightYellow}>
                      {fmt(item.allocated_quantity)}
                    </td>
                    <td className={styles.table.tdRightGreen}>
                      {fmt(item.available_quantity)}
                    </td>
                    <td className={styles.table.tdGray}>
                      {new Date(item.last_updated).toLocaleString("ja-JP")}
                    </td>
                    <td className={styles.table.tdRight}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetail(item.product_id, item.warehouse_id)}
                      >
                        詳細
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 更新ボタン */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          データを更新
        </Button>
      </div>
    </div>
  );
}
