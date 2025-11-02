import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Package, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.getStats(),
    refetchInterval: 30000, // 30秒ごとに更新
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
        <p className="text-destructive">統計情報の取得に失敗しました</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">ダッシュボード</h2>
        <p className="text-muted-foreground">
          システムの概要とKPIを確認できます
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="総在庫数"
          value={stats?.total_stock || 0}
          icon={Package}
          description="現在の総在庫量"
          colorClass="border-l-4 border-l-blue-500"
        />
        <StatCard
          title="総受注数"
          value={stats?.total_orders || 0}
          icon={ShoppingCart}
          description="登録された受注件数"
          colorClass="border-l-4 border-l-green-500"
        />
        <StatCard
          title="未引当受注"
          value={stats?.unallocated_orders || 0}
          icon={AlertTriangle}
          description="引当が必要な受注"
          colorClass="border-l-4 border-l-destructive"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
  colorClass: string;
}

function StatCard({ title, value, icon: Icon, description, colorClass }: StatCardProps) {
  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${colorClass}`}>
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
