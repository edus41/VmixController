import React, { useEffect, useState } from "react";

const Title = ({ text, color = "#1976D2" }) => {
  const [color2, setcolor2] = useState("");

  function calculateGradientColor(color) {
    const darkRGB = color.match(/\w\w/g).map((str) => parseInt(str, 16));

    const r = Math.round((255 + darkRGB[0]) / 2);
    const g = Math.round((255 + darkRGB[1]) / 2);
    const b = Math.round((255 + darkRGB[2]) / 2);

    const gradientColor =
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");

    return gradientColor;
  }

  useEffect(() => {
    setcolor2(calculateGradientColor(color));
  }, [text, color]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${color2} 0%, ${color} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: `100%`,
        }}
      >
        <h4
          style={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: "1px",
            fontSize: "1rem",
          }}
        >
          {text}
        </h4>
      </div>
    </div>
  );
};

export default Title;
