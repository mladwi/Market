import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import "./assets/style/main.scss";
import Navbar from "./components/navbar";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />

      <Navbar />
      <Router />
    </BrowserRouter>
  </StrictMode>
);
