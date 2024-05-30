import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthenticationProvider } from "./contexts/useAuth";
import { NavigationProvider } from "./contexts/useNavigation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </AuthenticationProvider>
  </React.StrictMode>
);
