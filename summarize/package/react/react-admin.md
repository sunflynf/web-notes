# React-admin

> **The React Framework for B2B Apps**

`react-admin` is a popular framework built on top of React that simplifies the creation of admin interfaces. It provides various components, hooks, and utilities to manage data CRUD (Create, Read, Update, Delete) operations, with built-in support for data providers like REST, GraphQL, and custom backends. Here's a summary of its key features, along with code samples to help you get started.

## Key Features

1. **CRUD Operations**: Easily create, read, update, and delete data using intuitive components and hooks.
2. **Data Providers**: Out-of-the-box support for REST, GraphQL, and custom data providers.
3. **Authentication**: Built-in mechanisms to handle authentication and authorization.
4. **Internationalization**: Supports multiple languages for a global user base.
5. **Customizable**: Highly customizable through theming, custom components, and hooks.
6. **Responsive**: Mobile-friendly out of the box.

## Basic Setup

1. **Install `react-admin` and necessary packages:**

   ```bash
   npm install react-admin ra-data-json-server
   ```

2. **Set up a simple admin interface:**

   ```tsx
   // src/App.tsx
   import React from 'react';
   import { Admin, Resource, ListGuesser } from 'react-admin';
   import jsonServerProvider from 'ra-data-json-server';

   const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

   const App = () => (
     <Admin dataProvider={dataProvider}>
       <Resource name="posts" list={ListGuesser} />
       <Resource name="users" list={ListGuesser} />
     </Admin>
   );

   export default App;
   ```

3. **Render the App:**

   ```tsx
   // src/index.tsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';

   ReactDOM.render(<App />, document.getElementById('root'));
   ```

## Customizing Resources

To create more complex resources, you can define custom components for list, create, edit, and show views.

```tsx
// src/posts.tsx
import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, Create, Filter } from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PostList = props => (
    <List filters={<PostFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="userId" reference="users"><TextField source="name" /></ReferenceField>
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users"><SelectInput optionText="name" /></ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);
```

## Integrate Custom Resources

```tsx
// src/App.tsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate } from './posts';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    <Resource name="users" />
  </Admin>
);

export default App;
```

### Handling Authentication

To handle authentication, you can create an authentication provider.

```tsx
// src/authProvider.ts
const authProvider = {
  login: ({ username, password }) => {
    localStorage.setItem('username', username);
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  checkError: (error) => {
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
```

Then, pass it to the `Admin` component:

```tsx
// src/App.tsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate } from './posts';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    <Resource name="users" />
  </Admin>
);

export default App;
```

### Summary

- **Install `react-admin`** and necessary packages.
- **Set up a basic admin interface** using `Admin` and `Resource` components.
- **Customize resources** by creating custom list, edit, create, and show components.
- **Handle authentication** by providing an `authProvider`.
