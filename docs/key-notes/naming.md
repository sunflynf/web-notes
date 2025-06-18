---
description: How to naming things in code.
tags:
  - Clean code
---

# Naming conventions

## Alternate Names for Variable

| **Common Name**          | **Also Called**                                                       | **Format**                                  |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------------------- |
| **camelCase**            | _lower camel case_ <br/> _dromedary case_                             | `startsLowerCaseThenCapitalizesEachWord`    |
| **PascalCase**           | _UpperCamelCase_ <br/> _CapitalizedCamelCase_                         | `EachWordStartsWithCapital`                 |
| **snake_case**           | _underscore_case_ <br/> _pothole_case_ <br/> _lower snake case_       | `lower_case_words_separated_by_underscores` |
| **SCREAMING_SNAKE_CASE** | _constant case_ <br/> _all caps snake case_ <br/> _upper snake case_  | `UPPER_CASE_WITH_UNDERSCORES`               |
| **kebab-case**           | _dash-case_ <br/> _lisp-case_ <br/> _spinal-case_ <br/> _hyphen-case_ | `lower-case-with-hyphens`                   |
| **Hungarian Notation**   | _type prefixing_ <br/> _Apps Hungarian_ (or _Systems Hungarian_)      | `prefixTypeVariableName`                    |
| **dot.notation**         | _object property access_ <br/> _member access syntax_                 | `object.property`                           |
| **UPPERCASE**            | _shouting case_ (colloquial) <br/> _all-caps_                         | `ALLUPPERCASE`                              |

## Common usages and examples

| **Naming Convention**    | **Usage**                                                                                 | **Example**                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **camelCase**            | Common in **JS**, **Java**, and some **Python** code for `variables` and `function` names | `let userName = "FeeFight";`                                         |
| **PascalCase**           | Used for `class` names in **C#**, **Java**, **TypeScript** <br/> constructors in **JS**   | `class UserProfile {}`                                               |
| **snake_case**           | Common in **Python** for `variables`, `function`, file names                              | `user_profile = "FeeFight"`                                          |
| **SCREAMING_SNAKE_CASE** | **Constants** in **Python**, **JS**, **C++**                                              | `MAX_CONNECTIONS = 100`                                              |
| **kebab-case**           | Used in URLs, CSS classes, file names                                                     | `background-color: #fff;` <br/> `user-profile.html`                  |
| **Hungarian Notation**   | Older **C/C++** style, not used much in modern code                                       | `strName = "FeeFight"` <br/> (prefix indicates type: `str` = string) |
| **dot.notation**         | Used for accessing object properties or nested values                                     | `user.profile.name`                                                  |
| **UPPERCASE**            | Legacy style, sometimes used for constants or macros                                      | `DEBUG = TRUE`                                                       |

## Quick Notes

- **camelCase**: Standard in **JS**, **Java**, **C++**, often for functions and variables.
- **PascalCase**: Ideal for **classes**, **components**, and **constructors**.
- **snake_case**: Preferred in **Python**, also common in configs and databases.
- **SCREAMING_SNAKE_CASE**: Great for **environment variables** and **constants**.
- **kebab-case**: Only valid in filenames, CSS, and HTML—not in most programming languages (it breaks in JS/Python).
- **Hungarian Notation**: Old-school, can be useful in embedded systems but not recommended in modern high-level languages.
- **dot.notation**: Not a naming convention itself, but a way of referencing properties in an object.
