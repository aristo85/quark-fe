import React, { FC } from "react";
import LoginForm from "modules/auth/containers/loginForm/LoginForm";
import { useAppSelector } from "modules/core/hooks";

const Login: FC = () => {
  const userLoginData = useAppSelector((state) => state.auth);
  console.log("userLoginData===>", userLoginData);

  return <LoginForm />;
};

export default Login;
