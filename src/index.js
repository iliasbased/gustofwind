import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "react-auth-kit";
import createStore from 'react-auth-kit/createStore';
import GustOfWind from "./gustofwind";
import { StatsProvider } from "./context/statsContext";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StatsProvider>
  <AuthProvider
    store={store}
  >
    <BrowserRouter>
      <GustOfWind />
    </BrowserRouter>
  </AuthProvider>
  </StatsProvider>
);
