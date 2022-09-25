import React, { FC, ReactNode } from "react";
import { SnackbarProvider } from "notistack";

type ToastProviderProps = {
  children: ReactNode;
};

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default ToastProvider;
