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
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "105px",
                  height: "100%",
                  aspectRatio: 1,
                  backgroundColor: shade,
                }}
                key={key}
              >
                <span style={{ color: darkShades[key] }}>{key}</span>
                <span style={{ color: darkShades[key] }}>{shade}</span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            padding: "32px",
            alignItems: "center",
            backgroundColor: "#1A1B1F",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {Object.values(darkShades).map((shade) => {
            return (
              <div
                style={{
                  width: "105px",
                  height: "100%",
                  aspectRatio: 1,
                  backgroundColor: shade,
                }}
                key={shade}
              >
                {shade}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
