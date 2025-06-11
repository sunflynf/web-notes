# View Template Engines

## JavaScript (Node.js)

| Template Engine      | Notes                                       | When to Use                                                                                                 |
| -------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **EJS**              | Familiar HTML with `<% %>` tags.            | When you want straightforward HTML templating with embedded JS; great for small to medium apps.             |
| **Pug (Jade)**       | Indentation-based, terse syntax.            | When you prefer concise syntax and don’t mind indentation-based structure. Great for rapid prototyping.     |
| **Handlebars (hbs)** | Logic-less templates with `{{}}`.           | When you want separation of logic and view, with helpers and partials. Often used with Express.             |
| **Mustache**         | Simpler than Handlebars, also logic-less.   | When you need simple rendering without logic-heavy templates, great for shared templates across platforms.  |
| **Nunjucks**         | Jinja2-inspired with inheritance.           | When you want template inheritance, macros, and a richer feature set; good for larger projects.             |
| **Marko**            | Streaming, fast rendering, component-based. | When performance is key, or you want component-driven server-side rendering.                                |
| **LiquidJS**         | Shopify-inspired Liquid templates.          | When you’re building an app that requires safe, user-editable templates or you’re integrating with Shopify. |

## Python

| Template Engine       | Notes                                   | When to Use                                                                                             |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Jinja2**            | Flask’s default, Django-like syntax.    | When you need powerful templating with control structures; widely used with Flask and other frameworks. |
| **Django Templates**  | Integrated with Django.                 | When you’re using Django and want tight integration with its features (tags, filters, inheritance).     |
| **Mako**              | More Pythonic, powerful.                | When you need advanced features like inline Python and performance.                                     |
| **Chameleon**         | Fast XML/HTML rendering.                | When performance is critical and you prefer compatibility with XML-based systems (e.g. Zope, Pyramid).  |
| **Tornado Templates** | Lightweight, part of Tornado framework. | When you’re using Tornado for async web apps and want simple templating.                                |

## Java

| Template Engine            | Notes                         | When to Use                                                                                   |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| **Thymeleaf**              | Modern, Spring-friendly.      | When you’re using Spring Boot and want modern HTML templates with easy integration.           |
| **Freemarker**             | Very flexible, widely used.   | When you need complex templating with lots of customization; used in Spring, Struts, etc.     |
| **JSP (JavaServer Pages)** | Part of Java EE, verbose.     | When you’re in a legacy Java EE environment or using Java web containers like Tomcat.         |
| **Velocity**               | Older, Apache project.        | When working on older codebases or needing email templating.                                  |
| **Pebble**                 | Similar to Thymeleaf, modern. | When you want a modern, lightweight alternative with easy syntax and support for Spring Boot. |

## Ruby

| Template Engine | Notes                                    | When to Use                                                                           |
| --------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| **ERB**         | Embedded Ruby, Rails default.            | When using Rails, or when you need simple, direct embedding of Ruby code in HTML.     |
| **Haml**        | Indentation-based.                       | When you like concise, whitespace-sensitive templates and want to avoid closing tags. |
| **Slim**        | Very terse, even more concise than Haml. | When you want minimal syntax and super clean templates.                               |

## PHP

| Template Engine | Notes                               | When to Use                                                                            |
| --------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| **Blade**       | Laravel’s powerful engine.          | When using Laravel; supports components, slots, and easy control structures.           |
| **Twig**        | Symfony’s default, Django-inspired. | When using Symfony or other frameworks; good for separation of logic and presentation. |
| **Smarty**      | Plugin-friendly, older.             | When working with legacy apps or when you want caching and plugin support.             |

## .NET (C#)

| Template Engine | Notes                  | When to Use                                                                     |
| --------------- | ---------------------- | ------------------------------------------------------------------------------- |
| **Razor**       | ASP.NET’s default.     | When using ASP.NET MVC, Razor Pages, or Blazor; great for mixing C# and HTML.   |
| **Spark**       | Flexible DSL for HTML. | When you want an alternative to Razor with different syntax; less common today. |
