import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/web-notes/__docusaurus/debug',
    component: ComponentCreator('/web-notes/__docusaurus/debug', '01d'),
    exact: true
  },
  {
    path: '/web-notes/__docusaurus/debug/config',
    component: ComponentCreator('/web-notes/__docusaurus/debug/config', '24d'),
    exact: true
  },
  {
    path: '/web-notes/__docusaurus/debug/content',
    component: ComponentCreator('/web-notes/__docusaurus/debug/content', '8f4'),
    exact: true
  },
  {
    path: '/web-notes/__docusaurus/debug/globalData',
    component: ComponentCreator('/web-notes/__docusaurus/debug/globalData', '61f'),
    exact: true
  },
  {
    path: '/web-notes/__docusaurus/debug/metadata',
    component: ComponentCreator('/web-notes/__docusaurus/debug/metadata', 'a58'),
    exact: true
  },
  {
    path: '/web-notes/__docusaurus/debug/registry',
    component: ComponentCreator('/web-notes/__docusaurus/debug/registry', '4f7'),
    exact: true
  },
  {
    path: '/web-notes/__docusaurus/debug/routes',
    component: ComponentCreator('/web-notes/__docusaurus/debug/routes', '469'),
    exact: true
  },
  {
    path: '/web-notes/blog',
    component: ComponentCreator('/web-notes/blog', '8a2'),
    exact: true
  },
  {
    path: '/web-notes/blog/archive',
    component: ComponentCreator('/web-notes/blog/archive', 'dea'),
    exact: true
  },
  {
    path: '/web-notes/blog/first-blog-post',
    component: ComponentCreator('/web-notes/blog/first-blog-post', '429'),
    exact: true
  },
  {
    path: '/web-notes/blog/long-blog-post',
    component: ComponentCreator('/web-notes/blog/long-blog-post', '309'),
    exact: true
  },
  {
    path: '/web-notes/blog/mdx-blog-post',
    component: ComponentCreator('/web-notes/blog/mdx-blog-post', '2bf'),
    exact: true
  },
  {
    path: '/web-notes/blog/tags',
    component: ComponentCreator('/web-notes/blog/tags', '18f'),
    exact: true
  },
  {
    path: '/web-notes/blog/tags/docusaurus',
    component: ComponentCreator('/web-notes/blog/tags/docusaurus', 'dfe'),
    exact: true
  },
  {
    path: '/web-notes/blog/tags/facebook',
    component: ComponentCreator('/web-notes/blog/tags/facebook', '55a'),
    exact: true
  },
  {
    path: '/web-notes/blog/tags/hello',
    component: ComponentCreator('/web-notes/blog/tags/hello', '9e2'),
    exact: true
  },
  {
    path: '/web-notes/blog/tags/hola',
    component: ComponentCreator('/web-notes/blog/tags/hola', '0a5'),
    exact: true
  },
  {
    path: '/web-notes/blog/welcome',
    component: ComponentCreator('/web-notes/blog/welcome', 'c5a'),
    exact: true
  },
  {
    path: '/web-notes/markdown-page',
    component: ComponentCreator('/web-notes/markdown-page', 'e90'),
    exact: true
  },
  {
    path: '/web-notes/docs',
    component: ComponentCreator('/web-notes/docs', 'e0d'),
    routes: [
      {
        path: '/web-notes/docs',
        component: ComponentCreator('/web-notes/docs', '684'),
        routes: [
          {
            path: '/web-notes/docs/tags',
            component: ComponentCreator('/web-notes/docs/tags', 'cc8'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/backend',
            component: ComponentCreator('/web-notes/docs/tags/backend', '5f0'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/bootstrap',
            component: ComponentCreator('/web-notes/docs/tags/bootstrap', 'ffc'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/clean-code',
            component: ComponentCreator('/web-notes/docs/tags/clean-code', 'c80'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/css',
            component: ComponentCreator('/web-notes/docs/tags/css', '2b8'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/database',
            component: ComponentCreator('/web-notes/docs/tags/database', '858'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/dbms',
            component: ComponentCreator('/web-notes/docs/tags/dbms', '5eb'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/docusaurus',
            component: ComponentCreator('/web-notes/docs/tags/docusaurus', '0f5'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/environment',
            component: ComponentCreator('/web-notes/docs/tags/environment', '8ad'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/extension',
            component: ComponentCreator('/web-notes/docs/tags/extension', '943'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/extensions',
            component: ComponentCreator('/web-notes/docs/tags/extensions', '534'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/frontend',
            component: ComponentCreator('/web-notes/docs/tags/frontend', '62c'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/git',
            component: ComponentCreator('/web-notes/docs/tags/git', '303'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/github',
            component: ComponentCreator('/web-notes/docs/tags/github', 'c0a'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/java',
            component: ComponentCreator('/web-notes/docs/tags/java', '2ed'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/java-script',
            component: ComponentCreator('/web-notes/docs/tags/java-script', '619'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/json',
            component: ComponentCreator('/web-notes/docs/tags/json', '57a'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/kotlin',
            component: ComponentCreator('/web-notes/docs/tags/kotlin', 'c43'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/less-js',
            component: ComponentCreator('/web-notes/docs/tags/less-js', '5fd'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/library',
            component: ComponentCreator('/web-notes/docs/tags/library', 'fa2'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/mobile',
            component: ComponentCreator('/web-notes/docs/tags/mobile', 'ec1'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/mvc',
            component: ComponentCreator('/web-notes/docs/tags/mvc', '1a2'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/no-sql',
            component: ComponentCreator('/web-notes/docs/tags/no-sql', '3d2'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/oop',
            component: ComponentCreator('/web-notes/docs/tags/oop', 'f51'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/programming-lang',
            component: ComponentCreator('/web-notes/docs/tags/programming-lang', '593'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/react',
            component: ComponentCreator('/web-notes/docs/tags/react', '420'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/redux',
            component: ComponentCreator('/web-notes/docs/tags/redux', '5de'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/res-tapis',
            component: ComponentCreator('/web-notes/docs/tags/res-tapis', '31a'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/sass',
            component: ComponentCreator('/web-notes/docs/tags/sass', '8d1'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/spring',
            component: ComponentCreator('/web-notes/docs/tags/spring', 'd09'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/spring-boot',
            component: ComponentCreator('/web-notes/docs/tags/spring-boot', '706'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/sql',
            component: ComponentCreator('/web-notes/docs/tags/sql', '3da'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/system',
            component: ComponentCreator('/web-notes/docs/tags/system', '7bf'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/type-script',
            component: ComponentCreator('/web-notes/docs/tags/type-script', '5ab'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/ui-framework',
            component: ComponentCreator('/web-notes/docs/tags/ui-framework', '9e4'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/ui-libraries',
            component: ComponentCreator('/web-notes/docs/tags/ui-libraries', '376'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/ui-library',
            component: ComponentCreator('/web-notes/docs/tags/ui-library', 'd4b'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/web-socket',
            component: ComponentCreator('/web-notes/docs/tags/web-socket', 'fc3'),
            exact: true
          },
          {
            path: '/web-notes/docs/tags/xml',
            component: ComponentCreator('/web-notes/docs/tags/xml', 'a6a'),
            exact: true
          },
          {
            path: '/web-notes/docs',
            component: ComponentCreator('/web-notes/docs', '367'),
            routes: [
              {
                path: '/web-notes/docs/bonjour',
                component: ComponentCreator('/web-notes/docs/bonjour', 'd3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/category/tutorial---basics',
                component: ComponentCreator('/web-notes/docs/category/tutorial---basics', 'd8c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/category/tutorial---extras',
                component: ComponentCreator('/web-notes/docs/category/tutorial---extras', 'f34'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/cheat-sheet/markdown',
                component: ComponentCreator('/web-notes/docs/cheat-sheet/markdown', '5b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/cheat-sheet/naming',
                component: ComponentCreator('/web-notes/docs/cheat-sheet/naming', 'cdc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/greeting',
                component: ComponentCreator('/web-notes/docs/greeting', '4a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/intro',
                component: ComponentCreator('/web-notes/docs/intro', '42c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/api/JDBC',
                component: ComponentCreator('/web-notes/docs/summarize/api/JDBC', 'aba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/backend/Java/SpringBoot',
                component: ComponentCreator('/web-notes/docs/summarize/backend/Java/SpringBoot', '5b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/backend/JS/Express',
                component: ComponentCreator('/web-notes/docs/summarize/backend/JS/Express', '010'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/backend/JS/Hono',
                component: ComponentCreator('/web-notes/docs/summarize/backend/JS/Hono', '6da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/backend/JS/Koa',
                component: ComponentCreator('/web-notes/docs/summarize/backend/JS/Koa', '164'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/backend/JS/Nest',
                component: ComponentCreator('/web-notes/docs/summarize/backend/JS/Nest', '8bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/database/DBMS/MySQL',
                component: ComponentCreator('/web-notes/docs/summarize/database/DBMS/MySQL', '053'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/database/NoSQL/MongoDB',
                component: ComponentCreator('/web-notes/docs/summarize/database/NoSQL/MongoDB', '75b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/database/SQL',
                component: ComponentCreator('/web-notes/docs/summarize/database/SQL', '7cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/database/SQL_Advance',
                component: ComponentCreator('/web-notes/docs/summarize/database/SQL_Advance', 'b30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/env/bun',
                component: ComponentCreator('/web-notes/docs/summarize/env/bun', 'e5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/env/nodejs',
                component: ComponentCreator('/web-notes/docs/summarize/env/nodejs', '8e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/frontend/framework/Angular',
                component: ComponentCreator('/web-notes/docs/summarize/frontend/framework/Angular', '733'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/frontend/library/jQuery',
                component: ComponentCreator('/web-notes/docs/summarize/frontend/library/jQuery', 'ba9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/frontend/library/React',
                component: ComponentCreator('/web-notes/docs/summarize/frontend/library/React', '735'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/languages/Java',
                component: ComponentCreator('/web-notes/docs/summarize/languages/Java', 'f53'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/languages/JavaScript',
                component: ComponentCreator('/web-notes/docs/summarize/languages/JavaScript', '62e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/languages/TypeScript',
                component: ComponentCreator('/web-notes/docs/summarize/languages/TypeScript', '970'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/mobile/ReactNative',
                component: ComponentCreator('/web-notes/docs/summarize/mobile/ReactNative', 'b71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/orm/Java/JPA',
                component: ComponentCreator('/web-notes/docs/summarize/orm/Java/JPA', 'b19'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/orm/JS/Drizzle',
                component: ComponentCreator('/web-notes/docs/summarize/orm/JS/Drizzle', '361'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/orm/JS/Prisma',
                component: ComponentCreator('/web-notes/docs/summarize/orm/JS/Prisma', '4ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/orm/JS/TypeORM',
                component: ComponentCreator('/web-notes/docs/summarize/orm/JS/TypeORM', 'd17'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/lodash',
                component: ComponentCreator('/web-notes/docs/summarize/package/lodash', '753'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/notistack',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/notistack', '77e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-admin',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-admin', '47c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-bootstrap',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-bootstrap', '4dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-helmet',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-helmet', '896'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-hook-form',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-hook-form', '315'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-i18next',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-i18next', '6dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-number-format',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-number-format', '412'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-redux',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-redux', '896'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-router',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-router', '30f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-select',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-select', 'f4c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-toastify',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-toastify', 'a97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/react-window',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/react-window', '8fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/RTK-query',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/RTK-query', '906'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/styled-component',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/styled-component', '049'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/tanstack/react-form',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/tanstack/react-form', '0af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/tanstack/react-query',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/tanstack/react-query', 'cf2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/tanstack/react-router',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/tanstack/react-router', '9ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/tanstack/react-table',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/tanstack/react-table', '784'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/package/react/tanstack/react-virtual',
                component: ComponentCreator('/web-notes/docs/summarize/package/react/tanstack/react-virtual', 'baa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/styles/bootstrap5',
                component: ComponentCreator('/web-notes/docs/summarize/styles/bootstrap5', '076'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/styles/cores/CSS3',
                component: ComponentCreator('/web-notes/docs/summarize/styles/cores/CSS3', '772'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/styles/cores/Lessjs',
                component: ComponentCreator('/web-notes/docs/summarize/styles/cores/Lessjs', 'ffc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/styles/cores/SASS',
                component: ComponentCreator('/web-notes/docs/summarize/styles/cores/SASS', 'c37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/styles/tailwindcss',
                component: ComponentCreator('/web-notes/docs/summarize/styles/tailwindcss', '59e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/tools/CommandLine',
                component: ComponentCreator('/web-notes/docs/summarize/tools/CommandLine', 'd83'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/summarize/tools/Git',
                component: ComponentCreator('/web-notes/docs/summarize/tools/Git', '3c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/web-notes/docs/tutorial-basics/congratulations', 'e87'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/web-notes/docs/tutorial-basics/create-a-blog-post', 'ba5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/web-notes/docs/tutorial-basics/create-a-document', 'a7a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/web-notes/docs/tutorial-basics/create-a-page', 'b89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/web-notes/docs/tutorial-basics/deploy-your-site', '844'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/web-notes/docs/tutorial-basics/markdown-features', 'dfd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/web-notes/docs/tutorial-extras/manage-docs-versions', 'f08'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/web-notes/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/web-notes/docs/tutorial-extras/translate-your-site', '70c'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/web-notes/',
    component: ComponentCreator('/web-notes/', '506'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
