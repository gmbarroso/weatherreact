import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { br, en, es } from './i18n'
import Root from './pages/Root'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { common: en },
      br: { common: br },
      es: { common: es }
    },
    lng: "br",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  )
}

export default App;
