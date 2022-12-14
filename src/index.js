import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from './App';
import './css/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

//reportWebVitals();
