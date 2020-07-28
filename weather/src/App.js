import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Root from './pages/Root'

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
