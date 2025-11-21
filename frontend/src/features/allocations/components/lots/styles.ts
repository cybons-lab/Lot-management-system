import { cva } from "class-variance-authority";

export const panelRoot = cva(
  "flex flex-col rounded-lg border transition-all duration-300 ease-out",
  {
    variants: {
      state: {
        inactive: "bg-gray-100/80 border-gray-200 opacity-60 grayscale-[0.3] scale-[0.99]",
        active:
          "bg-white border-blue-300 shadow-xl opacity-100 grayscale-0 scale-[1.005] z-10 ring-1 ring-blue-100",
        complete:
          "bg-white border-green-500 ring-1 ring-green-500 shadow-green-100 opacity-80 hover:opacity-100",
        error: "bg-red-50 border-red-300 ring-1 ring-red-300 opacity-100",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);

export const panelHeader = "overflow-hidden rounded-t-lg";

export const panelBody = "flex-1 p-2 transition-colors duration-300";

export const panelWrapper = "relative outline-none";
