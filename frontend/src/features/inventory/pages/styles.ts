import { cva } from "class-variance-authority";

export const root = "space-y-6";

export const actionBar = "flex items-center justify-end gap-2";

export const statsGrid = "grid grid-cols-1 gap-4 sm:grid-cols-3";

export const statsCard = cva(
    "group rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md",
    {
        variants: {
            variant: {
                default: "border-gray-200 hover:border-gray-300",
                active: "border-t border-r border-b border-l-4 border-gray-200 border-l-blue-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export const statsLabel = "text-sm font-medium text-gray-600";

export const statsValue = cva("mt-2 text-3xl font-bold", {
    variants: {
        color: {
            default: "text-gray-900",
            blue: "text-blue-600",
        },
    },
    defaultVariants: {
        color: "default",
    },
});

export const errorState = {
    root: "rounded-lg border border-red-200 bg-red-50 p-6 text-center",
    title: "text-sm font-semibold text-red-800",
    message: "mt-2 text-xs text-red-600",
    retryButton: "mt-4 border-red-300 text-red-700 hover:bg-red-100",
};

export const filterGrid = "grid grid-cols-3 gap-3";

export const checkboxGroup = "flex items-center space-x-2";
export const checkbox = "h-4 w-4 rounded border-gray-300";
export const checkboxLabel = "text-sm text-gray-700";

export const detailGrid = {
    root: "grid gap-4 md:grid-cols-2",
    item: "",
    label: "text-sm font-medium text-gray-500",
    value: "mt-1 text-base",
};

export const table = {
    container: "overflow-x-auto rounded-lg border bg-white",
    root: "w-full",
    thead: "border-b bg-gray-50",
    th: "px-4 py-3 text-left text-sm font-medium text-gray-700",
    thRight: "px-4 py-3 text-right text-sm font-medium text-gray-700",
    tbody: "divide-y",
    tr: "hover:bg-gray-50",
    td: "px-4 py-3 text-sm",
    tdRight: "px-4 py-3 text-right text-sm font-medium",
    tdRightYellow: "px-4 py-3 text-right text-sm text-yellow-600",
    tdRightGreen: "px-4 py-3 text-right text-sm font-medium text-green-600",
    tdGray: "px-4 py-3 text-sm text-gray-600",
};

export const filterCard = "rounded-lg border bg-white p-4";

