import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { StateProvider } from './contextApi/StateProvider';
import reducer, { initialState } from './contextApi/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={ initialState } reducer={ reducer } >
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
