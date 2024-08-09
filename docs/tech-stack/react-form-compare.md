---
description: Compasition table for popular form libraries/frameworks of React
---

# React Form Comparison

| Feature / Library | tanstack-form | react-hook-form | redux-form | formik |
|---|---|---|---|---|
| **Core Concept** | Controller-based | Hooks-based | Store-based (**Redux**) | Hooks-based |
| **Installation** | `@tanstack/react-form` | `react-hook-form` | `redux-form` | `formik` |
| **API Surface** | Simple and small | Simple and small | Large and complex | Simple and small |
| **Sync/Async  Validation** | `useController` | `useForm` and `useController` | `Field` | `useFormik` |
| **Error Handling** | Centralized (`useFormContext`) | Centralized (`useForm`) | **Decentralized** (`Field`) | Centralized (`useFormik`) |
| **Form State Management** | Local (per form) | Local (per form) | **Global** (Redux store) | Local (per form) |
| **Field Array** | `useFieldArray` | `useFieldArray` | `FieldArray` | `FieldArray` |
| **Form Submission** | `onSubmit` | `handleSubmit` | `onSubmit` | `handleSubmit` |
| **Community & Ecosystem** | Growing | Large and mature | Large and mature | Large and mature |
| **Official Documentation** | [tanstack-form Docs](https://tanstack.com/form) | [react-hook-form Docs](https://react-hook-form.com/docs) | [redux-form Docs](https://redux-form.com/8.2.2/docs/) | [formik Docs](https://formik.org/docs) |

:::info NOTES

1. All libraries support **JavaScript** and have plugins for additional functionality.
2. The community and ecosystem size can vary over time.
3. The comparison is based on the latest stable versions of the libraries at the time of writing.
4. This table focuses on the core features of each library; additional features may be available with plugins or extensions.
5. Some libraries, like `redux-form`, have a larger API surface due to their extensive feature set and history.
:::
