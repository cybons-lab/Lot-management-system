import { Loader2 } from "lucide-react";
import { useEffect } from "react";


import { ParameterInputs } from "./components/ParameterInputs";
import { PreviewSection } from "./components/PreviewSection";
import { ProfileSelect } from "./components/ProfileSelect";
import { ProgressSection } from "./components/ProgressSection";
import { ResultSection } from "./components/ResultSection";
import { SnapshotSettings } from "./components/SnapshotSettings";
import { useSimulationForm } from "./hooks/useSimulationForm";
import { useSimulationPolling } from "./hooks/useSimulationPolling";
import { useSimulationPreview } from "./hooks/useSimulationPreview";
import type { SeedSimulateDialogProps } from "./types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";

/**
 * Dialog component for generating test seed data with simulation
 */
export function SeedSimulateDialog({ open, onOpenChange }: SeedSimulateDialogProps) {
  const { form, setForm, handleProfileChange } = useSimulationForm();
  const { taskId, progress, result, startSimulation, isStarting, isRunning, reset } =
    useSimulationPolling();
  const preview = useSimulationPreview(form);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const handleStart = () => {
    startSimulation(form);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl">
        <DialogHeader>
          <DialogTitle>テストデータ生成シミュレーション</DialogTitle>
          <DialogDescription>
            プロファイルを選択し、パラメータを設定してテストデータを生成します
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(90vh-200px)] overflow-auto">
          <div className="space-y-6 p-1">
            <ProfileSelect value={form.profile ?? null} onChange={handleProfileChange} />

            <ParameterInputs form={form} onFormChange={setForm} />

            <PreviewSection preview={preview} />

            <SnapshotSettings
              saveSnapshot={form.save_snapshot || false}
              snapshotName={form.snapshot_name ?? null}
              onSaveSnapshotChange={(checked) => setForm((prev) => ({ ...prev, save_snapshot: checked }))}
              onSnapshotNameChange={(name) => setForm((prev) => ({ ...prev, snapshot_name: name }))}
            />

            {progress && <ProgressSection taskId={taskId} progress={progress} />}

            {result && <ResultSection result={result} />}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            閉じる
          </Button>
          <Button onClick={handleStart} disabled={isStarting || isRunning}>
            {isStarting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                開始中...
              </>
            ) : (
              "実行"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
