import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Precios from "./pages/Precios.jsx";
import Contacto from "./pages/Contacto.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/precios" element={<Precios />} />
        <Route path="/contacto" element={<Contacto />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);