import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

import { POLLING_INTERVAL_MS } from "../constants";
import type { UseSimulationPollingReturn } from "../types";

import {
  getSimulateProgress,
  getSimulateResult,
  postSimulateSeedData,
  type SimulateProgressResponse,
  type SimulateResultResponse,
  type SimulateSeedRequest,
} from "@/features/admin/api/admin-simulate";

/**
 * Hook for managing simulation execution and progress polling
 */
export function useSimulationPolling(): UseSimulationPollingReturn {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState<SimulateProgressResponse | null>(null);
  const [result, setResult] = useState<SimulateResultResponse | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPolling = useCallback(
    (tid: string) => {
      clearPolling();

      const pollProgress = async () => {
        try {
          const prog = await getSimulateProgress(tid);
          setProgress(prog);

          if (prog.status === "completed" || prog.status === "failed") {
            clearPolling();

            if (prog.status === "completed") {
              const res = await getSimulateResult(tid);
              setResult(res);
            } else {
              setResult({
                success: false,
                error: prog.error || "Unknown error",
              });
            }
          }
        } catch (err) {
          console.error("Progress polling error:", err);
        }
      };

      // Execute immediately, then poll at interval
      pollProgress();
      intervalRef.current = setInterval(pollProgress, POLLING_INTERVAL_MS);
    },
    [clearPolling],
  );

  const startMutation = useMutation({
    mutationFn: (payload: SimulateSeedRequest) => postSimulateSeedData(payload),
    onSuccess: (res) => {
      setTaskId(res.task_id);
      setProgress(null);
      setResult(null);
      toast.success(res.message);
      startPolling(res.task_id);
    },
    onError: (err: Error) => {
      toast.error(`失敗: ${err.message || "Unknown error"}`);
    },
  });

  const startSimulation = useCallback(
    (payload: SimulateSeedRequest) => {
      startMutation.mutate(payload);
    },
    [startMutation],
  );

  const reset = useCallback(() => {
    clearPolling();
    setTaskId(null);
    setProgress(null);
    setResult(null);
  }, [clearPolling]);

  const isRunning = progress?.status === "running";

  return {
    taskId,
    progress,
    result,
    startSimulation,
    isStarting: startMutation.isPending,
    isRunning,
    reset,
  };
}
