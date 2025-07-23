//
//import React from "react";
//import ReactDOM from "react-dom/client";
//import HomePage from "./pages/index.js";
//import "./styles/globals.css";
//
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<HomePage />);
//import React from "react";
//import ReactDOM from "react-dom/client";
//import App from "./pages/index.tsx"; // corrige le chemin vers le bon fichier
//import "./styles/globals.css";
//
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/index.tsx";
import "./styles/globals.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//import React from "react";
//import ReactDOM from "react-dom/client";
//import App from "./App"; // ou "./pages/index" si tu as renommé
//import "./styles/globals.css"; // important pour activer Tailwind
//
//const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);
