import React from "react";
import AppRoutes from "./context/AppRouter";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
