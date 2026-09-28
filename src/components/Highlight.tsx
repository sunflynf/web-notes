import React, { FC, ReactNode } from "react";

const variantColor = {
  Y: "#ffe536", // Yellow
  O: "#ff8036", // Orange -> Beniukon Bronze
  G: "#b5ff36", // Green -> Sweet Venom
  C: "#36b5ff", // Cyan -> Cherenkov Rediation
  P: "#8036ff", // Purple -> Sweet Escape
};

// Text color that stays readable on each marker, in light and dark mode
const variantInk: Record<keyof typeof variantColor, string> = {
  Y: "var(--wn-marker-ink)",
  O: "var(--wn-marker-ink)",
  G: "var(--wn-marker-ink)",
  C: "var(--wn-marker-ink)",
  P: "#ffffff",
};

type HighlightProps = {
  children: ReactNode;
  variant?: keyof typeof variantColor;
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
    <mark
      style={{
        backgroundColor: bgColor || variantColor[variant],
        color: color || variantInk[variant],
        padding: "0.05em 0.3em",
        margin: "0 -0.05em",
        borderRadius: "0.3em 0.15em 0.35em 0.2em",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
};

export default Highlight;
