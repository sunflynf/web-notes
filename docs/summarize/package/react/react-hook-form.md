---
description: best extension for FORM control in React
tags:
    - JavaScript
    - TypeScript
    - React
    - Extension
---

# React Hook Forms

## Quick start

```bash
npm i react-hook-form
npm i -D @hookform/devtools
```

```tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools"; // OPTIONAL

type FormValues = {
  firstName: string
  name: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input type="email" {...register("email")} />
        <input type="submit" />
      </form>
      <DevTool control={control} />
    </>
  )
}
```

## useForm

```ts
const {
  watch, 
  // watch(name?: string | string[] | (data, options?) => any)) => any
  getValues, 
  // getValues(name?: string | string[]) => any
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
      {/* pass all methods into the context */}
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
// + focusOptions: { shouldFocus, focusIndex, focusName }
const {
    fields, 
    // object & { id: string }
    prepend, 
    // prepend(obj: object | object[], focusOptions?)
    append, 
    // append(obj: object | object[], focusOptions?)
    insert, 
    // insert(index, value: object | object[], focusOption?)
    update,
    // update(index, value: object)
    replace,
    // replace(values: object[])
    remove, 
    // remove(index?: number | number[])
    swap, 
    // swap(firstIndex, secondIndex)
    move, 
    // move(currentIndex, toIndex)
} = useFieldArray({
    name, // string
    control, // optional if use FormProvider
    shouldUnregister,
    rules
});
```

```tsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    defaultValues: { test: [] } 
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });
  
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`test.${index}.firstName`)} />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}
```

## Resolvers

```bash
npm install @hookform/resolvers
```

### [Joi](https://github.com/react-hook-form/resolvers#joi)

The **most powerful data validation** library for JS.

```tsx
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
});

const resolver = joiResolver(schema);
```

### [Zod](https://github.com/react-hook-form/resolvers#zod)

**TypeScript-first** schema validation with *static* type inference

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
});

const resolver = zodResolver(schema);
```

### [Yup](https://github.com/react-hook-form/resolvers#yup)

**Dead simple Object** schema validation.

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required();

const resolver = yupResolver(schema);
```

### [class-validator](https://github.com/react-hook-form/resolvers#class-validator)

**Decorator-based property** validation for classes.

```json title='tsconfig.json'
{
  // add 2 lines below to file
  "strictPropertyInitialization": false,
  "experimentalDecorators": true,
}
```

```tsx
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Length, Min, IsEmail } from 'class-validator';

class User {
  @Length(2, 30)
  username: string;

  @IsEmail()
  email: string;
}

const resolver = classValidatorResolver(User);
```

### [io-ts](https://github.com/react-hook-form/resolvers#io-ts)

Validate your data with **powerful decoders**.

```tsx
import { ioTsResolver } from '@hookform/resolvers/io-ts';
import t from 'io-ts';
// you don't have to use io-ts-types, but it's very useful
import tt from 'io-ts-types';

const schema = t.type({
  username: t.string,
  age: tt.NumberFromString,
});

const resolver = ioTsResolver(schema);
```

### [superstruct](https://github.com/react-hook-form/resolvers#superstruct)

**A simple and composable way** to validate data in JavaScript (or TypeScript).

```tsx
import { superstructResolver } from '@hookform/resolvers/superstruct';
import { object, string, number } from 'superstruct';

const schema = object({
  name: string(),
  age: number(),
});

const resolver = superstructResolver(schema);
```

### Compare

| Feature               | [Yup](https://yup-docs.vercel.app/)         | [Zod](https://zod.dev/)         | [Joi](https://joi.dev/)         | [class-validator](https://github.com/typestack/class-validator) | [io-ts](https://www.npmjs.com/package/io-ts)       | [Superstruct](https://www.npmjs.com/package/superstruct)  |
|-----------------------|-------------|-------------|-------------|-----------------|-------------|--------------|
| **TypeScript Support**| Good        | **Excellent**   | Limited     | **Excellent**       | **Excellent**   | Good         |
| **API Style**         | Fluent      | Fluent      | Fluent      | Declarative     | *Functional*  | Fluent       |
| **Popularity**        | High        | **Growing**     | High        | Popular in [**NestJS**](../../backend/js/nest.md) | Niche      | Moderate     |
| **Validation Type**   | Sync/**Async**  | Sync        | Sync/**Async**  | Sync/**Async**      | Sync        | Sync         |
| **Use Case**          | Forms, general validation | Type-safe validation | Node.js services, general validation | Class-based validation | Functional programming | General validation |
