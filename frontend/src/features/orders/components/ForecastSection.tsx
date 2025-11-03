// frontend/src/features/orders/components/ForecastSection.tsx
import React from "react";

type Props = {
  productCode?: string;
};

export default function ForecastSection({ productCode }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!productCode) return null;

  return (
    <div className="border rounded-lg p-3">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="text-sm font-medium">フォーキャスト</span>
        <span className="text-gray-400">{isOpen ? "▼" : "▶"}</span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-gray-600">
            この製品の需要予測や在庫推移を確認できます。
          </p>
          <a
            href={`/forecast?product=${encodeURIComponent(productCode)}`}
            className="inline-block px-3 py-1.5 rounded bg-sky-600 text-white text-sm hover:bg-sky-700">
            フォーキャストを見る →
          </a>
        </div>
      )}
    </div>
  );
}
