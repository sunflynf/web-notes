import { useColorMode } from "@docusaurus/theme-common";
import Mermaid from "@theme-original/Mermaid";
import type MermaidType from "@theme/Mermaid";
import type { ComponentProps } from "react";

// Remount on color mode change so each render gets a fresh Mermaid id.
// Otherwise the light and dark renders started during hydration share an id
// and race, leaving some diagrams empty on a dark-mode first load.
export default function MermaidWrapper(props: ComponentProps<typeof MermaidType>) {
  const { colorMode } = useColorMode();
  return <Mermaid key={colorMode} {...props} />;
}
