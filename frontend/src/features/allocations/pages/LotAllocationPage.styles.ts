import { cva } from "class-variance-authority";

export const pageContainer = "min-h-screen bg-gray-100 py-8";

export const toast = cva(
  "animate-in slide-in-from-bottom-2 fixed right-6 bottom-6 z-50 rounded-lg px-4 py-3 text-sm shadow-lg transition-opacity",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white",
        error: "bg-red-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
