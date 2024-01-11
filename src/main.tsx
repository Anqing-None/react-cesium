import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

interface customWindow extends Window {
  CESIUM_BASE_URL: string;
}

declare const window: customWindow;

// The window.CESIUM_BASE_URL global variable must be set before CesiumJS is imported. It must point to the URL where those four directories are served.
window.CESIUM_BASE_URL = "/static/Cesium/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
