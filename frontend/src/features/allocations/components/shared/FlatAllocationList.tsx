import { useState } from "react";

import type { LineStatus } from "../../hooks/useLotAllocation";
import { AllocationRowContainer } from "../lots/AllocationRowContainer";
import * as styles from "./FlatAllocationList.styles";

// フックのパスは環境に合わせて調整してください
import type { OrderWithLinesResponse } from "@/shared/types/aliases";

// --- Main Component ---

interface FlatAllocationListProps {
  orders: OrderWithLinesResponse[];
  customerMap?: Record<number, string>;
  productMap?: Record<number, string>;
  getLineAllocations: (lineId: number) => Record<number, number>;
  onLotAllocationChange: (lineId: number, lotId: number, quantity: number) => void;
  onAutoAllocate: (lineId: number) => void;
  onClearAllocations: (lineId: number) => void;
  onSaveAllocations: (lineId: number) => void;
  isLoading?: boolean;

  // 新規追加
  lineStatuses: Record<number, LineStatus>;
  isOverAllocated: (lineId: number) => boolean;
}

export function FlatAllocationList({
  orders,
  customerMap = {},
  productMap = {},
  getLineAllocations,
  onLotAllocationChange,
  onAutoAllocate,
  onClearAllocations,
  onSaveAllocations,
  isLoading = false,
  lineStatuses,
  isOverAllocated,
}: FlatAllocationListProps) {
  // ★追加: 現在アクティブな行IDを管理するステート
  const [activeLineId, setActiveLineId] = useState<number | null>(null);

  const getCustomerName = (order: OrderWithLinesResponse) => {
    if (order.customer_id) {
      return customerMap[order.customer_id] || order.customer_name || "顧客未設定";
    }
    return order.customer_name || "顧客未設定";
  };

  const getProductName = (line: any) => {
    if (line.product_id) {
      return productMap[line.product_id] || line.product_name || "商品名不明";
    }
    return line.product_name || "商品名不明";
  };

  if (isLoading) return <div className={styles.loadingMessage}>データを読み込み中...</div>;
  if (orders.length === 0)
    return <div className={styles.emptyMessage}>表示対象の受注がありません</div>;

  return (
    <div className={styles.listContainer}>
      {/* 受注ごとにループするが、表示上はカードの積み重ねにする */}
      {orders.map((order) => {
        if (!order.lines || order.lines.length === 0) return null;

        const customerName = getCustomerName(order);

        return (
          <div key={order.id} className={styles.orderGroup}>
            {/* Order Header は削除し、各カードに情報を統合する */}

            {/* Lines List */}
            <div className={styles.linesList}>
              {order.lines.map((line) => {
                if (!line.id) return null;

                const productName = getProductName(line);

                return (
                  <AllocationRowContainer
                    key={line.id}
                    order={order}
                    line={line}
                    customerName={customerName}
                    productName={productName}
                    getLineAllocations={getLineAllocations}
                    onLotAllocationChange={onLotAllocationChange}
                    onAutoAllocate={onAutoAllocate}
                    onClearAllocations={onClearAllocations}
                    onSaveAllocations={onSaveAllocations}
                    lineStatus={lineStatuses[line.id] || "clean"}
                    isOverAllocated={isOverAllocated(line.id)}
                    // ★ここで親子通信を行う
                    isActive={activeLineId === line.id}
                    onActivate={() => setActiveLineId(line.id)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
