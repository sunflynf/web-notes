# React i18 next

## Project Structure

```txt
my-app/
├── public/
│   ├── index.html
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       ├── de/
│       │   └── translation.json
│       └── ...
├── src/
│   ├── i18n.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── components/
│       └── ExampleComponent.tsx
├── tsconfig.json
├── package.json
└── ...
```

## Step-by-Step Setup

1. **Install the necessary packages:**

   ```bash
   npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
   ```

2. **Create the translation files:**

   public/locales/en/translation.json

   ```json
   {
     "welcome": "Welcome",
     "description": "This is an example description."
   }
   ```

   public/locales/de/translation.json

   ```json
   {
     "welcome": "Willkommen",
     "description": "Dies ist eine Beispielbeschreibung."
   }
   ```

3. **Initialize i18next:**

   ```tsx
   // src/i18n.ts
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import HttpBackend from 'i18next-http-backend';
   import LanguageDetector from 'i18next-browser-languagedetector';

   i18n
     .use(HttpBackend)
     .use(LanguageDetector)
     .use(initReactI18next)
     .init({
       fallbackLng: 'en',
       debug: true,
       interpolation: {
         escapeValue: false,
       },
       backend: {
         loadPath: '/locales/{{lng}}/translation.json',
       },
     });

   export default i18n;
   ```

4. **Provide i18next to your React app:**

   ```tsx
   // src/index.tsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { I18nextProvider } from 'react-i18next';
   import App from './App';
   import i18n from './i18n';

   ReactDOM.render(
     <I18nextProvider i18n={i18n}>
       <App />
     </I18nextProvider>,
     document.getElementById('root')
   );
   ```

5. **Use the `useTranslation` hook in your components:**

   ```tsx
   // src/components/ExampleComponent.tsx
   import React from 'react';
   import { useTranslation } from 'react-i18next';

   const ExampleComponent: React.FC = () => {
     const { t, i18n: { changeLanguage } } = useTranslation();

     return (
       <div>
         <h1>{t('welcome')}</h1>
         <p>{t('description')}</p>
         <button onClick={() => changeLanguage('de')}>Deutsch</button>
         <button onClick={() => changeLanguage('en')}>English</button>
       </div>
     );
   };

   export default ExampleComponent;
   ```

6. **Use the component in your app:**

   ```tsx
   // src/App.tsx
   import React from 'react';
   import ExampleComponent from './components/ExampleComponent';

   const App: React.FC = () => {
     return (
       <div>
         <ExampleComponent />
       </div>
     );
   };

   export default App;
   ```

## Summary

1. **Install `react-i18next` and dependencies.**
2. **Create translation JSON files** in `public/locales`.
3. **Initialize `i18next`** in `src/i18n.ts` with `HttpBackend` and `LanguageDetector`.
4. **Wrap your app** with `I18nextProvider`.
5. **Use the `useTranslation` hook** in your components for translating text and changing languages.
