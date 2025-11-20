import type {
  SimulateProgressResponse,
  SimulateResultResponse,
  SimulateSeedRequest,
} from "@/features/admin/api/admin-simulate";

/**
 * Props for the main SeedSimulateDialog component
 */
export type SeedSimulateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Preview counts for each entity type
 */
export type PreviewCounts = {
  warehouses: number | null;
  customers: number | null;
  suppliers: number | null;
  products: number | null;
  lots: number | null;
  orders: number | null;
  forecasts: number | null;
};

/**
 * Preview totals grouped by category
 */
export type PreviewTotals = {
  masters: number | null;
  inventory: number | null;
  orders: number | null;
  forecasts: number | null;
  overall: number | null;
};

/**
 * Combined preview data
 */
export type PreviewData = {
  counts: PreviewCounts;
  totals: PreviewTotals;
};

/**
 * Simulation state managed by useSimulationPolling
 */
export type SimulationState = {
  taskId: string | null;
  progress: SimulateProgressResponse | null;
  result: SimulateResultResponse | null;
};

/**
 * Return type for useSimulationForm hook
 */
export type UseSimulationFormReturn = {
  form: SimulateSeedRequest;
  setForm: React.Dispatch<React.SetStateAction<SimulateSeedRequest>>;
  handleProfileChange: (profile: string) => void;
  resetForm: () => void;
};

/**
 * Return type for useSimulationPolling hook
 */
export type UseSimulationPollingReturn = {
  taskId: string | null;
  progress: SimulateProgressResponse | null;
  result: SimulateResultResponse | null;
  startSimulation: (payload: SimulateSeedRequest) => void;
  isStarting: boolean;
  isRunning: boolean;
  reset: () => void;
};

/**
 * Props for ProfileSelect component
 */
export type ProfileSelectProps = {
  value: string | null;
  onChange: (profile: string) => void;
};

/**
 * Props for ParameterInputs component
 */
export type ParameterInputsProps = {
  form: SimulateSeedRequest;
  onFormChange: React.Dispatch<React.SetStateAction<SimulateSeedRequest>>;
};

/**
 * Props for SnapshotSettings component
 */
export type SnapshotSettingsProps = {
  saveSnapshot: boolean;
  snapshotName: string | null;
  onSaveSnapshotChange: (checked: boolean) => void;
  onSnapshotNameChange: (name: string | null) => void;
};

/**
 * Props for PreviewSection component
 */
export type PreviewSectionProps = {
  preview: PreviewData;
};

/**
 * Props for ProgressSection component
 */
export type ProgressSectionProps = {
  taskId: string | null;
  progress: SimulateProgressResponse;
};

/**
 * Props for ResultSection component
 */
export type ResultSectionProps = {
  result: SimulateResultResponse;
};
