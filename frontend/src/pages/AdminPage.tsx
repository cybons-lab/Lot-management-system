import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { DatabaseZap, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [resetResult, setResetResult] = useState<string>('');

  const resetMutation = useMutation({
    mutationFn: () => api.resetDatabase(),
    onSuccess: (data) => {
      setResetResult(`成功: ${data.message}`);
      // すべてのクエリを無効化して再取得
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      setResetResult(`エラー: ${error.message || 'リセットに失敗しました'}`);
    },
  });

  const handleReset = () => {
    if (
      window.confirm(
        '⚠️ データベースをリセットします。\n\nすべてのデータが削除されます。本当によろしいですか？'
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
              disabled={resetMutation.isPending}
            >
              <DatabaseZap className="mr-2 h-4 w-4" />
              {resetMutation.isPending ? 'リセット中...' : 'データベースをリセット'}
            </Button>

            {resetResult && (
              <div
                className={`rounded-md border p-3 text-sm ${
                  resetResult.startsWith('成功')
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
              >
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
              {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}
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
