/**
 * LotStatsCards.tsx
 *
 * ���q�1�h:Y���ɳ������
 */

import type { LotStats } from "../hooks/useLotStats";

import { StatCard } from "./StatCard";

interface LotStatsCardsProps {
  /** q�1 */
  stats: LotStats;
}

/**
 * ���q�1���
 */
export function LotStatsCards({ stats }: LotStatsCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <StatCard title="����p" value={stats.totalLots.toString()} />
      <StatCard title="	����p" value={stats.activeLots.toString()} highlight />
      <StatCard
        title="�(�p"
        value={stats.totalQuantity.toLocaleString()}
        description="h���"
      />
    </div>
  );
}
