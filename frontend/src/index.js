import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {GoogleOAuthProvider} from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1065945153182-59fkhtjn04rsftv1dqldm6pmiqcrmhdf.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();

// 1065945153182-fg3tt5taukvkrddoh0es1582l7gvslf4.apps.googleusercontent.com
// /* *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