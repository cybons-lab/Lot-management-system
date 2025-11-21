/**
 * Suppliers Table Columns
 */
import type { Column } from "@/shared/components/data/DataTable";
import type { Supplier } from "../api/suppliers-api";

export const supplierColumns: Column<Supplier>[] = [
  { key: "supplier_code", header: "仕入先コード", sortable: true },
  { key: "supplier_name", header: "仕入先名", sortable: true },
  {
    key: "updated_at",
    header: "更新日時",
    sortable: true,
    render: (_, row) => new Date(row.updated_at).toLocaleDateString("ja-JP"),
  },
];
