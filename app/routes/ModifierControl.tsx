import { useEffect, useState } from "react";

export type ModifierEvent = {
  key: string;
  value: number;
};

interface ModifierControlProps {
  label: string;
  initialMultiplierValue: number;
  onChange?: (value: ModifierEvent) => void;
  disabled?: boolean;
}

export default function ModifierControl({
  label,
  initialMultiplierValue,
  onChange,
  disabled = false,
}: ModifierControlProps) {
  const [multiplierValue, setMultiplierValue] = useState(
    initialMultiplierValue
  );

  return (
    <div className="bg-white/5 p-4 rounded-lg max-w-28">
      <span className="text-white">{label}</span>
      <div className="flex flex-col mt-2">
        <input
          disabled={disabled}
          type="number"
          step={0.1}
          value={multiplierValue}
          onChange={(event) => {
            setMultiplierValue(parseFloat(event?.target?.value));

            if (!onChange) {
              return;
            }
            onChange({ key: label, value: parseFloat(event?.target?.value) });
          }}
          min={0}
          max={20}
        />
      </div>
    </div>
  );
}
