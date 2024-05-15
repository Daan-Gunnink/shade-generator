import { shadeConfig } from "~/routes/Controls";

interface RGBObject {
  r: number;
  g: number;
  b: number;
}

type ColorShade =
  | "s50"
  | "s100"
  | "s200"
  | "s300"
  | "s400"
  | "s500"
  | "s600"
  | "s700"
  | "s800"
  | "s900"
  | "s950";

// Define the ShadeObject type
export type ShadeObject = {
  [key in ColorShade]: string;
};

function HSLToRGB(hue: number, s: number, l: number): RGBObject {
  const saturation = s / 100;
  const luminosity = l / 100;
  const hueFactor = (n: number) => (n + hue / 30) % 12;
  const amount = saturation * Math.min(luminosity, 1 - luminosity);
  const calculatePureColorStrength = (n: number) =>
    luminosity -
    amount *
      Math.max(-1, Math.min(hueFactor(n) - 3, Math.min(9 - hueFactor(n), 1)));
  return {
    r: Math.round(255 * calculatePureColorStrength(0)),
    g: Math.round(255 * calculatePureColorStrength(8)),
    b: Math.round(255 * calculatePureColorStrength(4)),
  };
}

function HSLtoHex(hue: number, saturation: number, luminosity: number): string {
  const { r, g, b } = HSLToRGB(hue, saturation, luminosity);
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}

/*
  Converts a hex value to HSL
*/
export function hexToHSL(hex: string) {
  // Convert hex to RGB first
  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    // eslint-disable-next-line no-console
    console.error("Invalid Hex Code");
  }

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let saturation;
  const luminosity = (max + min) / 2;

  if (max === min) {
    // achromatic
    hue = 0;
    saturation = 0;
  } else {
    const difference = max - min;
    saturation =
      luminosity > 0.5
        ? difference / (2 - max - min)
        : difference / (max + min);
    switch (max) {
      case r:
        hue = (g - b) / difference + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / difference + 2;
        break;
      case b:
        hue = (r - g) / difference + 4;
        break;
      default:
        break;
    }
    hue /= 6; // TODO check on zero value??
  }

  return {
    hue: hue * 360,
    saturation: saturation * 100,
    luminosity: luminosity * 100,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}

function getLuminosityMapDarkMode(
  baseLuminosity: number,
  stepIncreaseSize = 7,
  stepDecreaseSize = 7
) {
  return [
    {
      key: 50,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 4.5, 0, 100),
    },
    {
      key: 100,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 4, 0, 100),
    },
    {
      key: 200,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 3, 0, 100),
    },
    {
      key: 300,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 2, 0, 100),
    },
    { key: 400, luminosity: clamp(baseLuminosity - stepDecreaseSize, 0, 100) },
    { key: 500, luminosity: baseLuminosity },
    { key: 600, luminosity: clamp(baseLuminosity + stepIncreaseSize, 0, 100) },
    {
      key: 700,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 2, 0, 100),
    },
    {
      key: 800,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 3, 0, 100),
    },
    {
      key: 900,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 4, 0, 100),
    },
    {
      key: 950,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 4.5, 0, 100),
    },
  ];
}

function getLuminosityMap(
  baseLuminosity: number,
  stepIncreaseSize = 7,
  stepDecreaseSize = 7
) {
  return [
    {
      key: 50,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 4.5, 0, 100),
    },
    {
      key: 100,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 4, 0, 100),
    },
    {
      key: 200,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 3, 0, 100),
    },
    {
      key: 300,
      luminosity: clamp(baseLuminosity + stepIncreaseSize * 2, 0, 100),
    },
    { key: 400, luminosity: clamp(baseLuminosity + stepIncreaseSize, 0, 100) },
    { key: 500, luminosity: baseLuminosity },
    { key: 600, luminosity: clamp(baseLuminosity - stepDecreaseSize, 0, 100) },
    {
      key: 700,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 2, 0, 100),
    },
    {
      key: 800,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 3, 0, 100),
    },
    {
      key: 900,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 4, 0, 100),
    },
    {
      key: 950,
      luminosity: clamp(baseLuminosity - stepDecreaseSize * 4.5, 0, 100),
    },
  ];
}

export default function getShadeMap(
  baseColor: string,
  isDarkMode: boolean = false,
  config?: shadeConfig
) {
  let configWithDefaults = config as shadeConfig;
  if (!configWithDefaults) {
    configWithDefaults = {
      luminosityIncreaseStep: 5,
      luminosityDecreaseStep: 6,
    };
  }

  // Retrieve the HSL of the given hex color
  const baseHSL = hexToHSL(baseColor);
  const decreaseSize = Math.round(
    baseHSL.luminosity / configWithDefaults.luminosityDecreaseStep
  );
  const increaseSize = Math.round(
    (100 - baseHSL.luminosity) / configWithDefaults.luminosityIncreaseStep
  );

  const luminosityMap = isDarkMode
    ? getLuminosityMapDarkMode(baseHSL.luminosity, increaseSize, decreaseSize)
    : getLuminosityMap(baseHSL.luminosity, increaseSize, decreaseSize);

  return luminosityMap.reduce((acc, { key, luminosity }) => {
    const keyString = `s${key}` as ColorShade;
    acc[keyString] = HSLtoHex(baseHSL.hue, baseHSL.saturation, luminosity);
    return acc;
  }, {} as ShadeObject);
}
