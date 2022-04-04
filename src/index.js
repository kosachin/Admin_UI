import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { UsersDataContextProvider } from "./context/UsersDataContextProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UsersDataContextProvider>
      <App />
    </UsersDataContextProvider>
  </StrictMode>
);
