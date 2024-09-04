import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./store/provider";
import { initialState, reducer } from "./store/reducer";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider initialState={initialState} reducer={reducer}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
