import { useEffect, useState } from "react";

export type shadeConfig = {
  luminosityIncreaseStep: number;
  luminosityDecreaseStep: number;
};

interface ControlsProps {
  onConfigChange: (config: shadeConfig) => void;
}

export default function Controls({ onConfigChange }: ControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [increaseLuminosityStep, setIncreaseLuminosityStep] = useState(5);
  const [decreaseLuminosityStep, setDecreaseLuminosityStep] = useState(6);

  useEffect(() => {
    const updatedConfig: shadeConfig = {
      luminosityDecreaseStep: decreaseLuminosityStep,
      luminosityIncreaseStep: increaseLuminosityStep,
    };

    onConfigChange(updatedConfig);
  }, [increaseLuminosityStep, decreaseLuminosityStep, onConfigChange]);

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
      )}
    </div>
  );
}
