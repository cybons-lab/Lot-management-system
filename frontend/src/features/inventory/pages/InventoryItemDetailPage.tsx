/**
 * InventoryItemDetailPage (v2.2 - Phase D-6)
 * Inventory item detail page (product × warehouse)
 */

import { useParams, useNavigate } from "react-router-dom";

import { useInventoryItem } from "../hooks";

import * as styles from "./styles";

import { Button } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { fmt } from "@/shared/utils/number";

// eslint-disable-next-line max-lines-per-function
export function InventoryItemDetailPage() {
  const { productId, warehouseId } = useParams<{ productId: string; warehouseId: string }>();
  const navigate = useNavigate();

  const productIdNum = productId ? Number(productId) : 0;
  const warehouseIdNum = warehouseId ? Number(warehouseId) : 0;

  const { data: item, isLoading, isError } = useInventoryItem(productIdNum, warehouseIdNum);

  const handleBack = () => {
    navigate(ROUTES.INVENTORY.SUMMARY);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className={styles.root}>
        <div className={styles.errorState.root}>
          <p className={styles.errorState.message}>在庫アイテムが見つかりませんでした</p>
        </div>
        <Button onClick={handleBack}>戻る</Button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">在庫アイテム詳細</h2>
          <p className="mt-1 text-gray-600">
            製品ID: {item.product_id} / 倉庫ID: {item.warehouse_id}
          </p>
        </div>
        <Button variant="outline" onClick={handleBack}>
          一覧に戻る
        </Button>
      </div>

      {/* Basic Info Card */}
      <div className={styles.filterCard}>
        <h3 className="mb-4 text-lg font-semibold">基本情報</h3>
        <div className={styles.detailGrid.root}>
          <div>
            <div className={styles.detailGrid.label}>製品</div>
            <div className={styles.detailGrid.value}>
              {item.product_name || item.product_code || `ID: ${item.product_id}`}
            </div>
          </div>
          <div>
            <div className={styles.detailGrid.label}>倉庫</div>
            <div className={styles.detailGrid.value}>
              {item.warehouse_name || `ID: ${item.warehouse_id}`}
            </div>
          </div>
          <div>
            <div className={styles.detailGrid.label}>最終更新</div>
            <div className={styles.detailGrid.value}>
              {new Date(item.last_updated).toLocaleString("ja-JP")}
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className={styles.statsGrid}>
        {/* Total Quantity */}
        <div className={styles.statsCard({ variant: "default" })}>
          <div className={styles.statsLabel}>総在庫数</div>
          <div className={styles.statsValue({ color: "default" })}>{fmt(item.total_quantity)}</div>
          <div className="mt-2 text-xs text-gray-500">すべての在庫数</div>
        </div>

        {/* Allocated Quantity */}
        <div className={styles.statsCard({ variant: "default" })}>
          <div className={styles.statsLabel}>引当済在庫数</div>
          <div className="mt-3 text-3xl font-bold text-yellow-600">
            {fmt(item.allocated_quantity)}
          </div>
          <div className="mt-2 text-xs text-gray-500">引当済の在庫数</div>
        </div>

        {/* Available Quantity */}
        <div className={styles.statsCard({ variant: "active" })}>
          <div className={styles.statsLabel}>利用可能在庫数</div>
          <div className={styles.statsValue({ color: "blue" })}>{fmt(item.available_quantity)}</div>
          <div className="mt-2 text-xs text-gray-500">引当可能な在庫数</div>
        </div>
      </div>

      {/* Calculation Info */}
      <div className="rounded-lg border bg-blue-50 p-4">
        <h4 className="text-sm font-semibold text-blue-800">在庫数の計算式</h4>
        <p className="mt-2 text-sm text-blue-700">
          利用可能在庫数 = 総在庫数 - 引当済在庫数
          <br />({fmt(item.available_quantity)} = {fmt(item.total_quantity)} -{" "}
          {fmt(item.allocated_quantity)})
        </p>
      </div>
    </div>
  );
}
