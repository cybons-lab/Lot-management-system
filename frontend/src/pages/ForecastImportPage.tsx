import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";

export default function ForecastImportPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    // TODO: Implement upload logic
    console.log("Uploading file:", file.name);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Forecast インポート</h2>
        <p className="text-muted-foreground">
          需要予測データをCSVファイルからインポートします
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">ファイルアップロード</h3>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-primary hover:underline">
                    ファイルを選択
                  </span>
                  またはドラッグ&ドロップ
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  CSV形式のみ対応
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-primary" />
              <span className="flex-1">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
              >
                削除
              </Button>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file}
            className="w-full"
          >
            アップロード
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">CSVフォーマット</h3>
        <div className="bg-muted p-4 rounded-lg font-mono text-sm">
          <div>product_code,forecast_date,quantity</div>
          <div>PROD-001,2025-01-01,100</div>
          <div>PROD-002,2025-01-01,200</div>
        </div>
      </div>
    </div>
  );
}
