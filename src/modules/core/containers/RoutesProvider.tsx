import React, { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "pages/Login";
import { useAppSelector } from "../hooks";
import PrivateRoute from "./PrivateRoute";
import Landing from "pages/Landing";

const RoutesProvider: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.userToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={!!isAuth}>
              <Landing />
            </PrivateRoute>
          }
        />
        {!isAuth && <Route path="/login" element={<Login />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesProvider;
