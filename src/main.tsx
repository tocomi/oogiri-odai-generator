import { scan } from "react-scan";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

scan({
  enabled: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
