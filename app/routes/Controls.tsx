import { useCallback, useEffect, useState } from "react";
import ModifierControl, { ModifierEvent } from "./ModifierControl";

export type shadeConfig = {
  luminosityIncreaseStep?: number;
  luminosityDecreaseStep?: number;
  luminosityMultiplierModifiers?: {
    [key: string]: number;
  };
};

interface ControlsProps {
  onConfigChange: (config: shadeConfig) => void;
}

export default function Controls({ onConfigChange }: ControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const [increaseLuminosityStep, setIncreaseLuminosityStep] = useState(5);
  const [decreaseLuminosityStep, setDecreaseLuminosityStep] = useState(6);
  const [luminosityMultipliers, setLuminosityMultipliers] = useState({});

  useEffect(() => {
    const updatedConfig: shadeConfig = {
      luminosityDecreaseStep: decreaseLuminosityStep,
      luminosityIncreaseStep: increaseLuminosityStep,
      luminosityMultiplierModifiers: luminosityMultipliers,
    };

    onConfigChange(updatedConfig);
  }, [
    increaseLuminosityStep,
    decreaseLuminosityStep,
    luminosityMultipliers,
    onConfigChange,
  ]);

  const onMultiplierChange = useCallback(
    (change: ModifierEvent) => {
      setLuminosityMultipliers({
        ...luminosityMultipliers,
        [change.key]: change.value,
      });
    },
    [luminosityMultipliers]
  );

  return (
    <div
      className={`${isExpanded ? "bg-white/5" : "bg-none"}
         p-8 rounded-xl flex flex-col w-full`}
    >
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        aria-hidden="true"
        className="flex cursor-pointer justify-center self-center items-center bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {isExpanded ? "↑" : "↓"}
      </div>
      {isExpanded && (
        <div>
          <div className="flex flex-row gap-8 mt-8 justify-center">
            <div className="flex flex-col gap-2 items-center">
              <span className="text-white">Luminosity Decrease</span>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-white">{decreaseLuminosityStep}</span>
                <input
                  type="range"
                  onChange={(event) => {
                    setDecreaseLuminosityStep(parseInt(event?.target?.value));
                  }}
                  value={decreaseLuminosityStep}
                  min={0}
                  max={20}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-white">Luminosity Increase</span>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-white">{increaseLuminosityStep}</span>
                <input
                  type="range"
                  value={increaseLuminosityStep}
                  onChange={(event) => {
                    setIncreaseLuminosityStep(parseInt(event?.target?.value));
                  }}
                  min={0}
                  max={20}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-8 justify-center">
            <span className="text-white self-center font-bold">Multiplier</span>
            <div className="flex flex-row gap-2 justify-center mt-2">
              <ModifierControl
                label="s50"
                initialMultiplierValue={4.5}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s100"
                initialMultiplierValue={4}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s200"
                initialMultiplierValue={3}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s300"
                initialMultiplierValue={2}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s400"
                initialMultiplierValue={1}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s500"
                initialMultiplierValue={1}
                onChange={onMultiplierChange}
                disabled
              />
              <ModifierControl
                label="s600"
                initialMultiplierValue={1}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s700"
                initialMultiplierValue={2}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s800"
                initialMultiplierValue={3}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s900"
                initialMultiplierValue={4}
                onChange={onMultiplierChange}
              />
              <ModifierControl
                label="s950"
                initialMultiplierValue={4.5}
                onChange={onMultiplierChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
