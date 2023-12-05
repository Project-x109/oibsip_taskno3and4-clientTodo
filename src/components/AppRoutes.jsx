import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ForgotPassword from "./forgotpassword";
import ResetPassword from "./resetpassword";
import ToDo from "./ToDo";
import { BrowserRouter } from "react-router-dom";
import AciveTodo from "./ActiveTodo";
import CompletedTodo from "./CompletedTodo";

function AppRouter() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to="/todo" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/activetodo" element={<AciveTodo />} />
        <Route path="/completedtodo" element={<CompletedTodo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
