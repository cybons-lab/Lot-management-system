export default function ForecastListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Forecast 一覧</h2>
        <p className="text-muted-foreground">
          登録されている需要予測データを確認できます
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">需要予測データは準備中です...</p>
      </div>
    </div>
  );
}
