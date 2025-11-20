/**
 * useLotFilters.ts
 *
 * ロット一覧のクライアントサイドフィルタリングロジック
 */

import { useMemo } from "react";

import type { LotUI } from "@/shared/libs/normalize";

/**
 * フィルター値の型定義
 */
export type LotFilterValues = {
  /** 検索キーワード（ロット番号、製品コード、製品名） */
  search: string;
  /** 製品コード */
  product_code: string;
  /** 納品先コード */
  delivery_place_code: string;
  /** ステータス */
  status: string;
  /** 在庫ありのみ表示 */
  hasStock: boolean;
};

/**
 * ステータスフィルターの型
 */
export type LotStatusFilter = "all" | "active" | "allocated" | "shipped" | "inactive";

/**
 * 検索キーワードに一致するかチェック
 */
function matchesSearch(lot: LotUI, search: string): boolean {
  const searchLower = search.toLowerCase();
  return (
    lot.lot_number.toLowerCase().includes(searchLower) ||
    lot.product_code?.toLowerCase().includes(searchLower) ||
    lot.product_name?.toLowerCase().includes(searchLower) ||
    false
  );
}

/**
 * ステータスフィルターに一致するかチェック
 */
function matchesStatus(lot: LotUI, status: string): boolean {
  if (status === "all") return true;

  const qty = Number(lot.current_quantity);
  const isActive = qty > 0;

  if (status === "active") return isActive;
  if (status === "inactive") return !isActive;
  // allocated, shipped は現在のデータモデルでは判定できないため、activeと同じ扱い
  if (status === "allocated" || status === "shipped") return isActive;

  return true;
}

/**
 * ロットがフィルター条件に一致するかチェック
 */
function matchesFilter(lot: LotUI, filters: LotFilterValues): boolean {
  // 検索キーワードフィルター
  if (filters.search && !matchesSearch(lot, filters.search)) {
    return false;
  }

  // 製品コードフィルター
  if (filters.product_code && lot.product_code !== filters.product_code) {
    return false;
  }

  // 納品先コードフィルター
  if (filters.delivery_place_code) {
    const lotDeliveryCode = (lot as unknown as { delivery_place_code?: string })
      .delivery_place_code;
    if (lotDeliveryCode !== filters.delivery_place_code) {
      return false;
    }
  }

  // ステータスフィルター
  if (!matchesStatus(lot, filters.status)) {
    return false;
  }

  // 在庫ありフィルター
  if (filters.hasStock && Number(lot.current_quantity) <= 0) {
    return false;
  }

  return true;
}

/**
 * ロット一覧をフィルタリングするフック
 *
 * @param lots - ロット一覧
 * @param filters - フィルター値
 * @returns フィルタリングされたロット一覧
 */
export function useLotFilters(lots: LotUI[], filters: LotFilterValues): LotUI[] {
  return useMemo(() => {
    return lots.filter((lot) => matchesFilter(lot, filters));
  }, [lots, filters]);
}
