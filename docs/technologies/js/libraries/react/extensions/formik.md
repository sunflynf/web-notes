# Formik

[**Documents**](https://formik.org/)

```bash
npm install formik --save
```

## Main structure

```jsx title="FormTemplates.jsx"
import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

export const FormTemplates = () => (
  <Formik
    initialValues={{ test: "123", test2: "" }}
    validate={(values) => {
      // values = { test }
      // do anything and return errors object
      const errors = {};
      if (!test.trim()) errors["test"] = "Required!";
      return errors;
    }}
    // validateSchema={testSchema_yup} // build with validation libraries like Yup, Zod
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 400);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>
        <input
          type="test"
          name="test"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values["test"]}
        />
        {errors["test"] && touched["test"] && errors["test"]}

        {/* Component support - Only use with same file */}

        <Field type="test2" name="test2" />
        <ErrorMessage name="test2" component="div" />

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>
);
```

## useFormik

```jsx
import React from "react";
import { useFormik } from "formik";

export const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```
