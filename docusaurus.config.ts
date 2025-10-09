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
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
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
    algolia: {
      appId: "ZE2R3K1GKF",
      apiKey: "f099734d82028cf0858416286df9ebc5",
      indexName: "sunflynfio",

      // Optional: see doc section below
      // contextualSearch: true,

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: "/docs/", // or as RegExp: /\/docs\//
      //   to: "/",
      // },

      // Optional: Algolia search parameters
      // searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      // searchPagePath: "search",
      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      // insights: false,
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
        "cypher",
        "dart",
        "docker",
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
        "yaml",
        "zig",
      ],
    },
  } satisfies Preset.ThemeConfig,

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true, // required
    },
    // Note: This is experimental and may change in future versions
    experimental_faster: {
      ssgWorkerThreads: true,
      rspackBundler: true,
      rspackPersistentCache: true,
    },
  },
};

export default config;
