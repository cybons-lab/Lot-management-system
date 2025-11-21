import { cva } from "class-variance-authority";

export const root = "space-y-6 p-6";

export const header = {
  root: "flex items-center justify-between",
  titleGroup: "",
  title: "text-3xl font-bold tracking-tight",
  description: "mt-1 text-gray-600",
};

export const card = {
  root: "rounded-lg border bg-white p-6",
  title: "mb-4 text-lg font-semibold",
  header: "mb-4 flex items-center justify-between",
};

export const filter = {
  root: "rounded-lg border bg-white p-4",
  container: "flex items-center gap-4",
  label: "text-sm font-medium",
  select: "rounded-md border px-3 py-2 text-sm",
};

export const loadingState = "rounded-lg border bg-white p-8 text-center text-gray-500";

export const errorState = "rounded-lg border border-red-300 bg-red-50 p-4 text-red-600";

export const emptyState = "rounded-lg border bg-white p-8 text-center text-gray-500";

export const table = {
  container: "overflow-x-auto rounded-lg border bg-white",
  root: "w-full",
  thead: "border-b bg-gray-50",
  th: "px-4 py-3 text-left text-sm font-medium text-gray-700",
  tbody: "divide-y",
  tr: "hover:bg-gray-50",
  td: "px-4 py-3 text-sm",
  tdMedium: "px-4 py-3 text-sm font-medium",
};

export const statusBadge = cva("inline-flex rounded-full px-2 py-1 text-xs font-semibold", {
  variants: {
    isActive: {
      true: "bg-green-100 text-green-800",
      false: "bg-gray-100 text-gray-800",
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const roleBadge =
  "inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800";

export const detailGrid = {
  root: "grid gap-4 md:grid-cols-2",
  item: "",
  label: "text-sm font-medium text-gray-700",
  value: "mt-1 text-sm",
};

export const actionButtons = "flex gap-2";

export const roleForm = {
  root: "space-y-4",
  label: "mb-2 block text-sm font-medium",
  checkboxGroup: "space-y-2",
  checkboxItem: "flex items-center gap-2",
  checkbox: "h-4 w-4 rounded border-gray-300",
  checkboxLabel: "text-sm",
  description: "ml-2 text-gray-500",
};
