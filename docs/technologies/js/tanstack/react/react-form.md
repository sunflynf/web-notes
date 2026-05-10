---
description: Comprehensive guide to TanStack React Form - a powerful, type-safe form library for React applications
tags:
    - JavaScript
    - TypeScript
    - React
    - Forms
    - Validation
    - TanStack
---

# React Form

TanStack React Form is a powerful, type-safe form library for React that provides comprehensive form state management, validation, and field handling with excellent TypeScript support.

## Key Features

- **Type-safe**: Full TypeScript support with inferred types
- **Flexible validation**: Built-in and custom validation rules
- **Field management**: Automatic field registration and state tracking
- **Performance optimized**: Minimal re-renders and efficient updates
- **Framework agnostic**: Works with any React setup
- **Small bundle size**: Tree-shakable and lightweight

## Installation

```bash
npm install @tanstack/react-form
```

:::note
TanStack React Form requires React 16.8+ and has no other dependencies.
:::

## Basic Usage

### Creating a Simple Form

```tsx
import { useForm } from '@tanstack/react-form'

function MyForm() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="firstName"
        children={(field) => (
          <input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="First Name"
          />
        )}
      />

      <form.Field
        name="lastName"
        children={(field) => (
          <input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Last Name"
          />
        )}
      />

      <form.Field
        name="email"
        children={(field) => (
          <input
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            type="email"
            placeholder="Email"
          />
        )}
      />

      <button type="submit">Submit</button>
    </form>
  )
}
```

## Form Configuration

### Default Values

```tsx
const form = useForm({
  defaultValues: {
    user: {
      name: '',
      email: '',
      preferences: {
        theme: 'light',
        notifications: true,
      },
    },
  },
})
```

### Validation

TanStack React Form supports multiple validation strategies:

```tsx
const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
  validators: {
    onChange: ({ value }) => {
      if (!value.email) return 'Email is required'
      if (!value.password) return 'Password is required'
      if (value.password.length < 8) return 'Password must be at least 8 characters'
      return undefined
    },
    onSubmit: ({ value }) => {
      // Additional validation on submit
      return undefined
    },
  },
})
```

## Field API

### Field State

Each field provides access to its current state:

```tsx
<form.Field
  name="email"
  children={(field) => {
    const { state, handleChange, handleBlur } = field

    return (
      <div>
        <input
          name={field.name}
          value={state.value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
        />

        {state.meta.isTouched && state.meta.errors.length > 0 && (
          <div className="error">
            {state.meta.errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}
      </div>
    )
  }}
/>
```

### Field Validation

```tsx
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) =>
      !value
        ? 'Email is required'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? 'Invalid email format'
        : undefined,
    onBlur: ({ value }) => {
      // Additional blur validation
      return undefined
    },
  }}
  children={(field) => (
    <input
      type="email"
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  )}
/>
```

## Advanced Features

### Array Fields

```tsx
function TodoForm() {
  const form = useForm({
    defaultValues: {
      todos: [{ text: '', completed: false }],
    },
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <form.Field
        name="todos"
        mode="array"
        children={(field) => (
          <div>
            {field.state.value.map((_, index) => (
              <form.Field
                key={index}
                name={`todos[${index}].text`}
                children={(subField) => (
                  <div>
                    <input
                      value={subField.state.value}
                      onChange={(e) => subField.handleChange(e.target.value)}
                      placeholder="Todo item"
                    />
                    <button
                      type="button"
                      onClick={() => field.removeValue(index)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              />
            ))}
            <button
              type="button"
              onClick={() => field.pushValue({ text: '', completed: false })}
            >
              Add Todo
            </button>
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Conditional Fields

```tsx
function ConditionalForm() {
  const form = useForm({
    defaultValues: {
      hasNewsletter: false,
      email: '',
    },
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <form.Field
        name="hasNewsletter"
        children={(field) => (
          <label>
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            Subscribe to newsletter
          </label>
        )}
      />

      <form.Subscribe
        selector={(state) => state.values.hasNewsletter}
        children={(hasNewsletter) =>
          hasNewsletter ? (
            <form.Field
              name="email"
              children={(field) => (
                <input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Email for newsletter"
                />
              )}
            />
          ) : null
        }
      />
    </form>
  )
}
```

### Async Validation

```tsx
<form.Field
  name="username"
  validators={{
    onChangeAsync: async ({ value }) => {
      if (!value) return 'Username is required'

      // Simulate API call
      const response = await fetch(`/api/check-username?username=${value}`)
      const data = await response.json()

      return data.available ? undefined : 'Username already taken'
    },
  }}
  children={(field) => (
    <div>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isValidating && <span>Checking...</span>}
    </div>
  )}
/>
```

## Form State Management

### Form State

```tsx
function FormWithState() {
  const form = useForm({
    defaultValues: { name: '' },
  })

  return (
    <div>
      <form onSubmit={form.handleSubmit}>
        {/* Form fields */}
      </form>

      <form.Subscribe
        selector={(state) => [state.isSubmitting, state.canSubmit]}
        children={([isSubmitting, canSubmit]) => (
          <div>
            <button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}
      />
    </div>
  )
}
```

### Reset Form

```tsx
const form = useForm({
  defaultValues: { name: '', email: '' },
})

// Reset to default values
form.reset()

// Reset to specific values
form.reset({ name: 'John', email: 'john@example.com' })
```

## Integration with UI Libraries

### With React Hook Form Style

```tsx
// Custom hook for React Hook Form compatibility
function useField(form: any, name: string) {
  return form.Field({
    name,
    children: (field) => field,
  })
}
```

### With Validation Libraries

TanStack React Form works well with validation libraries like Zod:

```tsx
import { zodValidator } from '@tanstack/zod-form-validator'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older'),
})

const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    age: 0,
  },
  validators: {
    onChange: zodValidator(userSchema),
  },
})
```

## Best Practices

### Form Structure

:::tip
Keep forms modular by breaking complex forms into smaller components. Each component should handle its own validation and state.
:::

### Validation Strategy

:::note
Use `onChange` for immediate feedback and `onSubmit` for final validation. Combine with async validation for server-side checks.
:::

### Performance

:::warning
Avoid unnecessary re-renders by using `form.Subscribe` with specific selectors instead of accessing the entire form state.
:::

### TypeScript

```tsx
interface User {
  name: string
  email: string
  age: number
}

const form = useForm<User>({
  defaultValues: {
    name: '',
    email: '',
    age: 0,
  },
})
```

## Common Patterns

### Multi-Step Forms

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1)
  const form = useForm({
    defaultValues: {
      personal: { name: '', email: '' },
      address: { street: '', city: '' },
    },
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <form onSubmit={form.handleSubmit}>
      {step === 1 && (
        <div>
          <h3>Personal Information</h3>
          <form.Field
            name="personal.name"
            children={(field) => (
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Address Information</h3>
          <form.Field
            name="address.street"
            children={(field) => (
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  )
}
```

### File Upload

```tsx
function FileUploadForm() {
  const form = useForm({
    defaultValues: {
      files: [] as File[],
    },
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <form.Field
        name="files"
        children={(field) => (
          <input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              field.handleChange(files)
            }}
          />
        )}
      />
      <button type="submit">Upload</button>
    </form>
  )
}
```

## API Reference

### useForm Options

| Option | Type | Description |
|--------|------|-------------|
| `defaultValues` | `object` | Initial form values |
| `validators` | `object` | Form-level validators |
| `onSubmit` | `function` | Submit handler |

### Field Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Field name/path |
| `validators` | `object` | Field validators |
| `children` | `function` | Render function |
| `mode` | `string` | Field mode ('value' or 'array') |

### Field State

| Property | Type | Description |
|----------|------|-------------|
| `value` | `any` | Current field value |
| `meta` | `object` | Field metadata (touched, errors, etc.) |

## Migration from Other Libraries

### From React Hook Form

```tsx
// React Hook Form
const { register, handleSubmit, formState } = useForm()

// TanStack React Form
const form = useForm({
  defaultValues: { name: '' },
})
```

### From Formik

```tsx
// Formik
<Formik initialValues={{ name: '' }}>
  <Form>
    <Field name="name" />
  </Form>
</Formik>

// TanStack React Form
const form = useForm({
  defaultValues: { name: '' },
})
```

## Troubleshooting

### Common Issues

**Form not submitting**: Ensure `e.preventDefault()` and `e.stopPropagation()` are called in the submit handler.

**Validation not working**: Check that validators return `undefined` for valid values and error strings for invalid values.

**TypeScript errors**: Make sure to properly type your `defaultValues` and use the generic type parameter on `useForm`.

:::tip
For more advanced usage and examples, check the official TanStack React Form documentation at [tanstack.com/form](https://tanstack.com/form).
:::
