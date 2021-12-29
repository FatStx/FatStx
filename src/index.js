import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import StacksBoard from './views/StacksBoard';
import reportWebVitals from './reportWebVitals';
import ReactGA from "react-ga4";

ReactGA.initialize('G-GDKN4EEKX6');
ReactGA.send("Homepage");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StacksBoard />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
