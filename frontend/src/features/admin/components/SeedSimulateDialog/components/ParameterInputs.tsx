import { DEFAULT_FORM, LOT_SPLIT_OPTIONS, ORDER_LINE_OPTIONS } from "../constants";
import type { ParameterInputsProps } from "../types";

import { Checkbox } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";

/**
 * Number input field component
 */
function NumberInput({
  label,
  value,
  placeholder,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number | null | undefined;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange: (value: number | null) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        min={min}
        max={max}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      />
    </div>
  );
}

/**
 * Select input field component
 */
function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: readonly number[];
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Forecast checkbox component
 */
function ForecastCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>需要予測データ</Label>
      <div className="flex items-center gap-2 rounded border p-2">
        <Checkbox
          id="forecasts"
          checked={checked}
          onCheckedChange={(c) => onChange(c === true ? 1 : 0)}
        />
        <Label htmlFor="forecasts" className="m-0 cursor-pointer">
          需要予測を生成する
        </Label>
      </div>
    </div>
  );
}

/** Parameter inputs grid component */
export function ParameterInputs({ form, onFormChange }: ParameterInputsProps) {
  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    onFormChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <NumberInput
        label="Random Seed"
        value={form.random_seed}
        placeholder="自動生成"
        onChange={(v) => updateField("random_seed", v)}
      />
      <NumberInput
        label="倉庫数（1〜10）"
        value={form.warehouses ?? DEFAULT_FORM.warehouses}
        min={1}
        max={10}
        onChange={(v) => updateField("warehouses", v ?? DEFAULT_FORM.warehouses)}
      />
      <NumberInput
        label="顧客数（0以上）"
        value={form.customers}
        placeholder="プロファイル既定"
        min={0}
        onChange={(v) => updateField("customers", v)}
      />
      <NumberInput
        label="仕入先数（0以上）"
        value={form.suppliers}
        placeholder="プロファイル既定"
        min={0}
        onChange={(v) => updateField("suppliers", v)}
      />
      <NumberInput
        label="製品数（0以上）"
        value={form.products}
        placeholder="プロファイル既定"
        min={0}
        onChange={(v) => updateField("products", v)}
      />
      <NumberInput
        label="ロット数（0以上）"
        value={form.lots}
        placeholder="プロファイル既定"
        min={0}
        onChange={(v) => updateField("lots", v)}
      />
      <NumberInput
        label="受注数（0以上）"
        value={form.orders}
        placeholder="プロファイル既定"
        min={0}
        onChange={(v) => updateField("orders", v)}
      />
      <SelectInput
        label="受注明細行上限（1〜5）"
        value={form.order_line_items_per_order ?? DEFAULT_FORM.order_line_items_per_order ?? 1}
        options={ORDER_LINE_OPTIONS}
        onChange={(v) => updateField("order_line_items_per_order", v)}
      />
      <SelectInput
        label="ロット分割上限（1〜3）"
        value={form.lot_split_max_per_line ?? DEFAULT_FORM.lot_split_max_per_line ?? 1}
        options={LOT_SPLIT_OPTIONS}
        onChange={(v) => updateField("lot_split_max_per_line", v)}
      />
      <ForecastCheckbox
        checked={(form.forecasts ?? 0) > 0}
        onChange={(v) => updateField("forecasts", v)}
      />
      <div className="space-y-2 md:col-span-2">
        <Label>納品先上限（固定=5）</Label>
        <Input type="text" value="5" disabled className="bg-muted" />
      </div>
    </div>
  );
}
