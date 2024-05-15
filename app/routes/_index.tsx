import type { MetaFunction } from "@remix-run/node";
import Swatch from "./Swatch";
import { useCallback, useEffect, useState } from "react";
import Controls, { shadeConfig } from "./Controls";
export const meta: MetaFunction = () => {
  return [
    { title: "Shade Generator" },
    {
      name: "description",
      content: "Visualize the different shades generated",
    },
  ];
};

export default function Index() {
  const [colors, setColors] = useState(["#FD9727", "#F85A69", "#2ACA79"]);
  const [inputValue, setInputValue] = useState("");
  const [isValidHex, setIsValidHex] = useState(true);
  const [config, setConfig] = useState<shadeConfig>(null);

  useEffect(() => {
    const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
    setIsValidHex(hexColorRegex.test(inputValue));
  }, [inputValue]);

  const onChangeConfig = useCallback((newConfig: shadeConfig) => {
    setConfig(newConfig);
  }, []);

  const onRemoveColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const onAddColor = () => {
    setColors([inputValue, ...colors]);
    setInputValue("");
  };

  return (
    <div
      style={{
        marginTop: "48px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          paddingBottom: "8px",
          width: "100%%",
        }}
      >
        <div className="flex flex-row justify-center items-center gap-4 mb-8">
          <input
            className="shadow appearance-none border rounded w-32 h-12 text-white px-2 leading-tight focus:outline-none focus:shadow-outline bg-white/10"
            id="username"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Hex"
          />
          <button
            disabled={!isValidHex}
            onClick={onAddColor}
            aria-hidden="true"
            className="flex curor-pointer self-center justify-center items-center bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-20 disabled:hover:bg-blue-500"
          >
            +
          </button>
        </div>
        <div>
          <Controls onConfigChange={onChangeConfig} />
        </div>
        {colors.map((color, index) => {
          return (
            <Swatch
              key={`${color}-${index}`}
              config={config}
              color={color}
              onRemove={() => {
                onRemoveColor(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
