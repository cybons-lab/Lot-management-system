/**
 * TopNavLayout.tsx
 *
 * 上部水平ナビゲーションレイアウト
 * - Sticky ヘッダー（スクロール時も固定）
 * - モダン＋ポップなデザイン
 * - 左サイドバーなし
 */

import { useLocation } from "react-router-dom";
import { TopNav } from "@/components/layouts/TopNav";

// ============================================
// メインコンポーネント
// ============================================

interface TopNavLayoutProps {
  children: React.ReactNode;
}

export function TopNavLayout({ children }: TopNavLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav currentPath={location.pathname} />

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-[1920px]">{children}</main>
    </div>
  );
}
