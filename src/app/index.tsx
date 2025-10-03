import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@App/styles/globals.scss";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
