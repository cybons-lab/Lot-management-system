import { cva } from "class-variance-authority";

export const root = "space-y-6";

export const actionBar = "flex items-center justify-end gap-2";

export const statsGrid = "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4";

export const statsCard = cva(
  "group rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-gray-200 hover:border-gray-300",
        yellow: "border-t border-r border-b border-l-4 border-gray-200 border-l-yellow-500",
        blue: "border-t border-r border-b border-l-4 border-gray-200 border-l-blue-500",
        green: "border-t border-r border-b border-l-4 border-gray-200 border-l-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const statsLabel = "text-sm font-medium text-gray-600";

export const statsValue = cva("mt-2 text-3xl font-bold", {
  variants: {
    color: {
      default: "text-gray-900",
      yellow: "text-yellow-600",
      blue: "text-blue-600",
      green: "text-green-600",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export const filterGrid = "grid grid-cols-2 gap-3";

export const checkboxGroup = "flex items-center space-x-2";
export const checkbox = "h-4 w-4 rounded border-gray-300";
export const checkboxLabel = "text-sm text-gray-700";

export const comingSoon = {
  container: "rounded-lg border bg-white p-8 text-center",
  title: "text-lg text-gray-500",
  description: "mt-2 text-sm text-gray-400",
};
