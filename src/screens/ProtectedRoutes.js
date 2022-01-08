import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const user = useSelector((state) => state.auth.value);

  return user ? <Outlet /> : <Navigate to="/signin" />;
}
