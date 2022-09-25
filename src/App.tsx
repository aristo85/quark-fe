import ToastProvider from "modules/auth/containers/toastProvider/ToastProvider";
import React from "react";
import "./App.css";
import RoutesProvider from "./modules/core/containers/RoutesProvider";
import StoreProvider from "./modules/core/containers/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <RoutesProvider />
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
