# React Hook Forms

## Quick start

```bash
npm i react-hook-form
```

```tsx
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
  firstName: string
  name: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input type="email" {...register("email")} />
      <input type="submit" />
    </form>
  )
}
```

## useForm

```ts
const {
  watch, 
  // watch(name?: string | string[] | (data, options?) => any)) => any
  getValues, 
  // getValues(string | string[]) => any
  // - NOTE: getValues not trigger re-renders or subcribe to input changes
  setValue, 
  // setValue(name, value, configs?) 
  // + configs: { shouldValidate, shouldDirty, shouldTouch }
  setFocus, 
  // setFocus('f', { shouldSelect: boolean })
  resetField, 
  // resetField(name, options?) 
  // + options: { keepError, keepDirty, keepTouched, defaultValue }
  reset,
  // reset(values: T | (v: T) => any, options?)
  // + options: { keepError, keepDirty, keepDirtyValues, keepValues, keepDefaultValues, keepIsSubmitted, keepTouched, keepIsValid, keepSubmitCount }
  getFieldState,
  // getFieldState(name) => ({ isDirty, isTouched, invalid, error })
  // - VERSION: 7.25.0
  formState: { 
    defaultValues, 
    isDirty, // true if user modifies any field
    dirtyFields, // object with the user-modified fields
    touchedFields, // containing all fields user intereacted with
    isSubmitted, 
    isSubmitSuccessful,
    isSubmitting,
    isLoading, // true if form is currently loading async defaultValues
    submitCount, 
    isValid, 
    isValidating, 
    validatingFields, 
    errors
  },
  trigger,
  // trigger(name?: string | string[], options?) => Promise<boolean>
  // + options: { shouldFocus }
  setError,
  // setError(name, error, config?)
  // + error: { type: string, message?: string }
  // + config: { shouldFocus }
  clearErrors,
  // clearErrors(name?: string | string[])
  control,
  // - NOTE: use with Controller, useControl | useWatch | useFieldArray
  handleSubmit,
  // handleSubmit(onSubmit, onSubmitError)
  // + onSubmit = (data, event) => Promise<void>
  // + onSubmitError = (error, event) => void
  register,
  // register(name, options?) => ({ onChange, onBlur, name, ref })
  // + options: {
  //    required, minLength, maxLength, min, max, pattern: any | { value: any, message: string } - rules
  //    validate: (value, formValues) => any | { [ruleKey: string]: (v, fv) => any } - special rules
  //    valueAsNumber, valueAsDate: boolean - return right type
  //    value
  //    onChange, onBlur: (e) => void
  //    shouldUnregister: boolean - remove when unmount
  //    deps: string | string[] - trigger when value in deps change
  // }
  unregister
  // unregister(name: string | string[], options?)
  // + options: { keepError, keepDirty, keepTouched, keepDefaultValue, keepValue, keepIsValid }
} = useForm({
  mode: "onSubmit" | "onChange" | "onBlur", // validate before submit - onSubmit
  reValidateMode: "onSubmit" | "onChange" | "onBlur", // validate after submit - onChange
  defaultValues, // {} | async () => await fetch('api')
  shouldFocusError,
  shouldUnregister, // reset values & errors when unmount
  criteriaMode: "firstError" | "all"
  resolver, // Integrates with your preferred schema validation library
  context, // A context object to supply for your schema validation.
});
```

## FormProvider & useFormContext

```jsx
import React from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"

export default function App() {
  const formCtx = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <FormProvider {...formCtx}>
      // pass all methods into the context
      <form onSubmit={formCtx.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  )
}

function NestedInput() {
  const { register } = useFormContext() // retrieve all hook methods
  return <input {...register("test")} />
}
```

## useWatch

```jsx
const watchData = useWatch({
    name, // string | string[]
    control, // optional if use FormProvider
    defaultValue, // Optional: value return before initial render  
})

const watchDob = useWatch({ name: 'dob' });
const [watchFirstName, watchLastName] = useWatch({ name: ['firstName', 'lastName'] });

// Custom hook for newest data
const useFormValues = () => {
  const { getValues } = useFormContext()
  return {
    ...useWatch(), // subscribe to form value updates
    ...getValues(), // always merge with latest form values
  }
}
```

## useFormState

```jsx
const { 
  defaultValues, 
  isDirty, // true if user modifies any field
  dirtyFields, // object with the user-modified fields
  touchedFields, // containing all fields user intereacted with
  isSubmitted, 
  isSubmitSuccessful,
  isSubmitting,
  isLoading, // true if form is currently loading async defaultValues
  submitCount, 
  isValid, 
  isValidating, 
  validatingFields, 
  errors
} = useFormState({
    control, // optional if use FormProvider
    name // Optional: string | string[]
})
```

## Controller && useController

```jsx
const {
    field: { onChange, onBlur, value, disabled, name, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState
} = useController({
    name, // string
    control, // optional if use FormProvider
    // Optional
    rules, 
    shouldUnregister,
    disabled
})
```

```jsx
<Controller
    name='' // required
    control={control} // optional if use FormProvider
    defaultValue={{}}
    rules={{}}
    shouldUnregister
    disabled
    // Main Components
    render={({ field, fieldState, formState }) => ()}
/>
```

## useFieldArray

```jsx
const {

} = useFieldArray({
    name, // string
    control, // optional if use FormProvider
    shouldUnregister,
    rules
});
```
