import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Web Notes",
  tagline: "Phi note everything about Web (anything he see)!",
  favicon: "img/favicon.ico",
  url: "https://github.com",

  // FOR DEPLOY
  baseUrl: "/web-notes/",
  organizationName: "sunflynf",
  projectName: "web-notes",
  deploymentBranch: "gh-pages",

  // URL Configs
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // TODO: Add Languages (VI)
  // i18n: {
  //   defaultLocale: "en",
  // },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/sunflynf/web-notes/tree/main/",
          // Remove this if low perf
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/sunflynf/web-notes/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // TODO: replace image
    image: "img/docusaurus-social-card.jpg",
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    navbar: {
      title: "FI-FINE",
      logo: {
        alt: "Docusaurus Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "documentSidebar",
          position: "left",
          label: "Documents",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/sunflynf",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} FI-FINE. Built with Docusaurus.`,
    },
    // Highlight Code
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "csharp",
        "dart",
        "ejs",
        "handlebars",
        "java",
        "less",
        "markdown",
        "mermaid",
        "mongodb",
        "php",
        "powershell",
        "properties",
        "sass",
        "scss",
        "solidity",
        "sql",
        "zig",
      ],
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
};

export default config;
