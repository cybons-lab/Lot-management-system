import { Loader2 } from "lucide-react";

import type { ProgressSectionProps } from "../types";

import { Badge } from "@/components/ui";


/**
 * Progress display section showing simulation status and logs
 */
export function ProgressSection({ taskId, progress }: ProgressSectionProps) {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">進捗状況</h3>
          {taskId && <div className="text-xs opacity-70">Task: {taskId}</div>}
        </div>
        <Badge variant={progress.status === "completed" ? "default" : "secondary"}>
          {progress.status === "running" && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
          {progress.phase} - {progress.progress_pct}%
        </Badge>
      </div>

      <div className="bg-muted h-[200px] overflow-auto rounded border p-3">
        <div className="space-y-1 font-mono text-xs">
          {progress.logs.map((log, i) => (
            <div key={i} className="text-muted-foreground">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
