import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { GlobalContextProvider } from './contexts/Global.Context';

import 'antd/dist/antd.css';

import Template from './componentes/template/Template'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalContextProvider>
          <Template />
        </GlobalContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
