import type { ForecastHeader } from "../api";
import { useForecastHeader } from "../hooks";

import { ForecastDetailCard } from "./ForecastDetailCard";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ForecastListCardProps {
  header: ForecastHeader;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  isOpen: boolean;
  isActive: boolean;
  onToggle: (id: number) => void;
}

export function ForecastListCard({
  header,
  onDelete,
  isDeleting,
  isOpen,
  isActive,
  onToggle,
}: ForecastListCardProps) {
  const { data: fullForecast, isLoading: isLoadingDetail } = useForecastHeader(header.forecast_id);
  if (isLoadingDetail) {
    return (
      <Card data-forecast-number={header.forecast_number}>
        <CardHeader className="p-4 text-sm text-gray-500">明細を読み込み中...</CardHeader>
      </Card>
    );
  }

  if (!fullForecast) {
    return (
      <Card data-forecast-number={header.forecast_number}>
        <CardContent className="p-4 text-sm text-gray-500">明細の取得に失敗しました</CardContent>
      </Card>
    );
  }

  return (
    <ForecastDetailCard
      forecast={fullForecast}
      onDelete={onDelete}
      isDeleting={isDeleting}
      isOpen={isOpen}
      isActive={isActive}
      onToggle={onToggle}
    />
  );
}
