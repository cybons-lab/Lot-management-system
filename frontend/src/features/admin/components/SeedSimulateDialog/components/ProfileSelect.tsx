import { DEFAULT_PROFILE_VALUE, PROFILE_OPTIONS } from "../constants";
import type { ProfileSelectProps } from "../types";

import { Label } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";


/**
 * Profile selection dropdown component
 */
export function ProfileSelect({ value, onChange }: ProfileSelectProps) {
  return (
    <div className="space-y-2">
      <Label>プロファイル</Label>
      <Select value={value ?? DEFAULT_PROFILE_VALUE} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="プロファイルを選択" />
        </SelectTrigger>
        <SelectContent>
          {PROFILE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
