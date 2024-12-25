import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import QuizeContext from './contexts/QuizeContext.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizeContext>
      <App />
    </QuizeContext>
  </React.StrictMode>
);
