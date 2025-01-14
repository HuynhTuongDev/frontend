import React, { useEffect, useState } from "react";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import AppRoutes from "./context/AppRouter";
import CopyRight from "./shared/CopyRight";
const App = () => {
  const is404Page = window.location.pathname === '/404';

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!is404Page && (
          <Navbar />
        )}
      </div>
      <AppRoutes />
      {!is404Page && <Footer />}
      {!is404Page && (
        <CopyRight />
      )}
    </>
  );
};

export default App;
