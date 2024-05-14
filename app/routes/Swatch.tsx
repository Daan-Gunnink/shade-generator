import getShadeMap, { hexToHSL } from "~/helpers/getShademap";

type SwatchProps = {
  color: string;
  onRemove: () => void;
};

export default function Swatch({ color, onRemove }: SwatchProps) {
  const shades = getShadeMap(color);
  const darkShades = getShadeMap(color, true);

  return (
    <div
      className="bg-white/5 p-8 rounded-xl"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        style={{
          marginRight: "48px",
          width: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          onClick={onRemove}
          aria-hidden="true"
          className="flex cursor-pointer justify-center items-center bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          X
        </div>
      </div>
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          lineHeight: "1.8",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "4px",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "32px",
            backgroundColor: "#fff",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {Object.entries(shades).map(([key, shade]) => {
            let textColor = darkShades["s800"];
            if (
              key === "s50" ||
              key === "s100" ||
              key === "s200" ||
              key === "s300" ||
              key === "s400"
            ) {
              textColor = darkShades["s200"];
            }

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "105px",
                  height: "100%",
                  padding: "4px",
                  aspectRatio: 1,
                  backgroundColor: shade,
                }}
                key={key}
              >
                <span style={{ color: textColor }}>{key}</span>
                <span style={{ color: textColor }}>{shade}</span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            padding: "32px",
            backgroundColor: "#1A1B1F",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {Object.entries(darkShades).map(([key, shade]) => {
            let textColor = shades["s800"];
            if (
              key === "s50" ||
              key === "s100" ||
              key === "s200" ||
              key === "s300" ||
              key === "s400"
            ) {
              textColor = shades["s200"];
            }

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "105px",
                  height: "100%",
                  padding: "4px",
                  aspectRatio: 1,
                  backgroundColor: shade,
                }}
                key={key}
              >
                <span style={{ color: textColor }}>{key}</span>
                <span style={{ color: textColor }}>{shade}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
