import { useCallback, useState } from "react";


import { DEFAULT_FORM, DEFAULT_PROFILE_VALUE, PROFILE_WAREHOUSE_MAP } from "../constants";
import type { UseSimulationFormReturn } from "../types";

import type { SimulateSeedRequest } from "@/features/admin/api/admin-simulate";

/**
 * Hook for managing simulation form state and handlers
 */
export function useSimulationForm(): UseSimulationFormReturn {
  const [form, setForm] = useState<SimulateSeedRequest>(DEFAULT_FORM);

  const handleProfileChange = useCallback((profile: string) => {
    setForm((prev) => {
      if (profile === DEFAULT_PROFILE_VALUE) {
        return {
          ...prev,
          profile: null,
          warehouses: DEFAULT_FORM.warehouses,
        };
      }

      const warehouses =
        PROFILE_WAREHOUSE_MAP[profile] ?? prev.warehouses ?? DEFAULT_FORM.warehouses;

      return {
        ...prev,
        profile,
        warehouses,
      };
    });
  }, []);

  const resetForm = useCallback(() => {
    setForm(DEFAULT_FORM);
  }, []);

  return {
    form,
    setForm,
    handleProfileChange,
    resetForm,
  };
}
