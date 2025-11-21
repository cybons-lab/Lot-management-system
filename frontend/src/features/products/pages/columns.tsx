/**
 * Products Table Columns
 */
import type { Column } from "@/shared/components/data/DataTable";
import type { Product } from "../api/products-api";

export const productColumns: Column<Product>[] = [
  { key: "maker_part_code", header: "メーカー品番", sortable: true },
  { key: "product_name", header: "商品名", sortable: true },
  { key: "base_unit", header: "単位", sortable: true },
  {
    key: "consumption_limit_days",
    header: "消費期限日数",
    sortable: true,
    render: (_, row) => row.consumption_limit_days?.toString() ?? "-",
  },
  {
    key: "updated_at",
    header: "更新日時",
    sortable: true,
    render: (_, row) => new Date(row.updated_at).toLocaleDateString("ja-JP"),
  },
];
