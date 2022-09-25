import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
  isAuth: boolean;
  redirectPath?: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  isAuth,
  redirectPath = "/login",
}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
