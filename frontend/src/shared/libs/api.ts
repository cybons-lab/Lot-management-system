// frontend/src/shared/libs/api.ts
import * as inventory from "@/features/inventory/api";
import * as orders from "@/features/orders/api";
import * as admin from "@/shared/libs/admin-api"; // ← lib配下のadminを集約

export const api = {
  ...orders,
  ...inventory,
  ...admin, // ← 追加
};
