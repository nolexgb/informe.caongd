// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

// ORDEN CORRECTO DE ESTILOS
import "./styles/global.css";
import "leaflet/dist/leaflet.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
