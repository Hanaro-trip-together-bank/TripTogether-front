import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthenticationProvider } from "./contexts/useAuth";
import { NavigationProvider } from "./contexts/useNavigation";
import { ExchangeRateProvider } from "./contexts/useExchangeRate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <ExchangeRateProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </ExchangeRateProvider>
    </AuthenticationProvider>
  </React.StrictMode>
);
