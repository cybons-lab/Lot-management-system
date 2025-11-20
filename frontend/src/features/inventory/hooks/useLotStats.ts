/**
 * useLotStats.ts
 *
 * ロット統計情報を計算するカスタムフック
 */

import { useMemo } from "react";

import type { LotUI } from "@/shared/libs/normalize";

/**
 * ロット統計情報の型定義
 */
export interface LotStats {
  /** 総ロット数 */
  totalLots: number;
  /** 有効ロット数（在庫あり） */
  activeLots: number;
  /** 総在庫数量 */
  totalQuantity: number;
}

/**
 * ロット統計情報を計算するフック
 *
 * @param lots - ロット一覧
 * @returns 統計情報
 */
export function useLotStats(lots: LotUI[]): LotStats {
  return useMemo(() => {
    const totalLots = lots.length;
    const activeLots = lots.filter((lot) => Number(lot.current_quantity) > 0).length;
    const totalQuantity = lots.reduce((sum, lot) => sum + Number(lot.current_quantity), 0);

    return {
      totalLots,
      activeLots,
      totalQuantity,
    };
  }, [lots]);
}
