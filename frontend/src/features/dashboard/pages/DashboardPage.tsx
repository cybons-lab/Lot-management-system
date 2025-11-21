/**
 * ダッシュボードページ
 * GET /api/admin/stats を使用して統計情報を表示
 */

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import { Dashboard } from "../components/Dashboard";

export function DashboardPage() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: api.getDashboardStats,
    // エラー時も表示を崩さないように
    retry: 1,
  });

  return <Dashboard stats={stats} isLoading={isLoading} isError={isError} />;
}
