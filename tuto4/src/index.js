import React from 'react';
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { SessionProvider } from "@inrupt/solid-ui-react";

ReactDOM.render(
  <SessionProvider>
    <App />
  </SessionProvider>,
  document.getElementById("root")
);
