---
description: Compasition table for popular form libraries/frameworks of React
---

# React Form Comparison

| Feature / Library          | tanstack-form                                   | react-hook-form                                          | formik                                 |
| -------------------------- | ----------------------------------------------- | -------------------------------------------------------- | -------------------------------------- |
| **Core Concept**           | Controller-based                                | Hooks-based                                              | Hooks-based                            |
| **Installation**           | `@tanstack/react-form`                          | `react-hook-form`                                        | `formik`                               |
| **API Surface**            | Simple and small                                | Simple and small                                         | Simple and small                       |
| **Sync/Async Validation**  | `useController`                                 | `useForm` and `useController`                            | `useFormik`                            |
| **Error Handling**         | Centralized (`useFormContext`)                  | Centralized (`useForm`)                                  | Centralized (`useFormik`)              |
| **Form State Management**  | Local (per form)                                | Local (per form)                                         | Local (per form)                       |
| **Field Array**            | `useFieldArray`                                 | `useFieldArray`                                          | `FieldArray`                           |
| **Form Submission**        | `onSubmit`                                      | `handleSubmit`                                           | `handleSubmit`                         |
| **Community & Ecosystem**  | Growing                                         | Large and mature                                         | Large and mature                       |
| **Official Documentation** | [tanstack-form Docs](https://tanstack.com/form) | [react-hook-form Docs](https://react-hook-form.com/docs) | [formik Docs](https://formik.org/docs) |

:::info NOTES

1. All libraries support **JavaScript** and have plugins for additional functionality.
2. The community and ecosystem size can vary over time.
3. The comparison is based on the latest stable versions of the libraries at the time of writing.
4. This table focuses on the core features of each library; additional features may be available with plugins or extensions.

:::
