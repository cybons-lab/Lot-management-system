import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { DatabaseZap, AlertTriangle } from "lucide-react";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [resetResult, setResetResult] = useState<string>("");

  const resetMutation = useMutation({
    mutationFn: () => api.resetDatabase(),
    onSuccess: (data) => {
      setResetResult(`成功: ${data.message}`);
      // すべてのクエリを無効化して再取得
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      setResetResult(`エラー: ${error.message || "リセットに失敗しました"}`);
    },
  });

  const handleReset = () => {
    if (
      window.confirm(
        "⚠️ データベースをリセットします。\n\nすべてのデータが削除されます。本当によろしいですか？"
      )
    ) {
      resetMutation.mutate();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-destructive">
          管理機能
        </h2>
        <p className="text-muted-foreground">
          システム管理機能です。慎重に操作してください。
        </p>
      </div>
      {/* データベースリセット */}
      <div className="rounded-lg border border-destructive bg-destructive/10 p-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-destructive">
                データベースリセット
              </h3>
              <p className="text-sm text-muted-foreground">
                すべてのデータを削除し、データベースを初期状態に戻します。
                <br />
                <strong>この操作は取り消せません。</strong>
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={resetMutation.isPending}>
              <DatabaseZap className="mr-2 h-4 w-4" />
              {resetMutation.isPending
                ? "リセット中..."
                : "データベースをリセット"}
            </Button>

            {resetResult && (
              <div
                className={`rounded-md border p-3 text-sm ${
                  resetResult.startsWith("成功")
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}>
                {resetResult}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 使用方法の案内 */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-3 text-lg font-semibold">開発時のデータ投入方法</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            サンプルデータの投入は、バックエンドのスクリプトから実行してください:
          </p>
          <pre className="overflow-x-auto rounded bg-muted p-3">
            {`# バックエンドディレクトリで実行
cd backend
python scripts/run_api_smoke.py`}
          </pre>
          <p className="text-xs">
            ※ このスクリプトはマスタデータ、ロット、受注などの
            サンプルデータを一括で投入します。
          </p>
        </div>
      </div>
      {/* まとめ投入（複数ファイル） */}
      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            サンプルデータまとめ投入（複数JSON）
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          products / lots / receipts / orders / forecast
          を含む複数JSONを一括選択してください。
          ファイル名に含まれるキーワードで自動振り分けします（例:{" "}
          <code>products</code>, <code>lots</code>, <code>receipts</code>,{" "}
          <code>orders</code>, <code>forecast</code>）。
        </p>

        <input
          type="file"
          accept="application/json"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            if (!files.length) return;

            const samplePayload: any = {
              products: [],
              lots: [],
              receipts: [],
              orders: [],
            };
            const forecastPayload: any = { items: [] }; // ForecastBulkRequestに合わせる

            const readJSON = async (f: File) => JSON.parse(await f.text());
            const include = (name: string, kw: string) =>
              name.toLowerCase().includes(kw);

            for (const f of files) {
              const name = f.name;
              const json = await readJSON(f);

              if (include(name, "product"))
                samplePayload.products.push(...(json.products ?? json));
              else if (include(name, "lot"))
                samplePayload.lots.push(...(json.lots ?? json));
              else if (include(name, "receipt"))
                samplePayload.receipts.push(...(json.receipts ?? json));
              else if (include(name, "order"))
                samplePayload.orders.push(...(json.orders ?? json));
              else if (include(name, "forecast")) {
                // 既存の forecast JSON が {items:[...]} or 配列 の両対応に
                const items = Array.isArray(json) ? json : json.items ?? [];
                forecastPayload.items.push(...items);
              }
            }

            try {
              // 1) サンプル投入（空配列なら投げない）
              if (
                (samplePayload.products?.length ?? 0) +
                  (samplePayload.lots?.length ?? 0) +
                  (samplePayload.receipts?.length ?? 0) +
                  (samplePayload.orders?.length ?? 0) >
                0
              ) {
                const r1 = await api.loadFullSampleData(samplePayload);
                console.log("sample load:", r1);
              }
              // 2) フォーキャスト投入（あれば）
              if ((forecastPayload.items?.length ?? 0) > 0) {
                const r2 = await api.bulkImportForecast(forecastPayload);
                console.log("forecast bulk:", r2);
              }
              alert("まとめ投入が完了しました。");
            } catch (err: any) {
              alert(
                "まとめ投入に失敗しました: " + (err?.message ?? String(err))
              );
            }
          }}
        />
      </div>
      {/* サンプルデータ投入 */}
      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">サンプルデータ投入</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          JSON（<code>sample_data.json</code>互換）を選んで
          <code>/admin/load-full-sample-data</code> に投入します。
        </p>
        <input
          type="file"
          accept="application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const text = await file.text();
              const json = JSON.parse(text);
              const resp = await api.loadFullSampleData(json);
              alert(resp.message || "投入が完了しました。");
            } catch (err: any) {
              alert("投入に失敗しました: " + (err?.message ?? String(err)));
            }
          }}
          className="block"
        />
      </div>
      {/* フォーキャスト一括登録 */}
      <div className="rounded-2xl border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">フォーキャスト一括登録</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          JSON（<code>/forecast/bulk</code>互換:{" "}
          <code>ForecastBulkRequest</code>
          ）をアップロードします。
        </p>
        <input
          type="file"
          accept="application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const text = await file.text();
              const json = JSON.parse(text);
              const resp = await api.bulkImportForecast(json);
              alert(resp.message || "インポートが完了しました。");
            } catch (err: any) {
              alert(
                "インポートに失敗しました: " + (err?.message ?? String(err))
              );
            }
          }}
          className="block"
        />
      </div>

      {/* その他の管理情報 */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-3 text-lg font-semibold">システム情報</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">環境:</dt>
            <dd className="font-medium">Development</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">API エンドポイント:</dt>
            <dd className="font-medium">
              {import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">フロントエンドバージョン:</dt>
            <dd className="font-medium">1.0.0 (MVP)</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
