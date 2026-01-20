import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './views/Home';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-GDKN4EEKX6');
ReactGA.send({ hitType: 'pageview', page: '/' });

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
