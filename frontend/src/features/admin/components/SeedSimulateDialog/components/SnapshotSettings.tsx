import type { SnapshotSettingsProps } from "../types";

import { Checkbox } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";


/**
 * Snapshot configuration settings component
 */
export function SnapshotSettings({
  saveSnapshot,
  snapshotName,
  onSaveSnapshotChange,
  onSnapshotNameChange,
}: SnapshotSettingsProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="save-snapshot"
          checked={saveSnapshot}
          onCheckedChange={(checked: boolean) => onSaveSnapshotChange(checked)}
        />
        <Label htmlFor="save-snapshot">スナップショット保存</Label>
      </div>

      {saveSnapshot && (
        <div className="space-y-2">
          <Label>スナップショット名（オプション）</Label>
          <Input
            placeholder="自動生成"
            value={snapshotName || ""}
            onChange={(e) => onSnapshotNameChange(e.target.value || null)}
          />
        </div>
      )}
    </div>
  );
}
