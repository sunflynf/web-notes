import React, { FC } from "react";

const variantColor = {
  Y: "#ffe536", // Yellow
  O: "#ff8036", // Orange -> Beniukon Bronze
  G: "#b5ff36", // Green -> Sweet Venom
  C: "#36b5ff", // Cyan -> Cherenkov Rediation
  P: "#8036ff", // Purple -> Sweet Escape
};

type HighlightProps = {
  children: any;
  variant?: string;
  bgColor?: string;
  color?: string;
};

const Highlight: FC<HighlightProps> = ({
  children,
  variant = "Y",
  bgColor,
  color,
}) => {
  return (
    <span
      style={{
        backgroundColor: bgColor || variantColor[variant],
        color: color || "#333",
        padding: 3,
      }}
    >
      {children}
    </span>
  );
};

export default Highlight;
