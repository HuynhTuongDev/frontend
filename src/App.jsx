import React, { useContext } from "react";
import Header from './shared/Header';
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import AppRoutes from "./context/AppRouter";
const App = () => {
  const is404Page = window.location.pathname === '/404';
  return (
    <>
      <div className="w-full bg--400">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          {!is404Page && <Header />}
          {!is404Page && <Navbar />}
          <AppRoutes />
          {!is404Page && <Footer />}
        </div>
      </div>


      {!is404Page && (
        <div className="bg-black">
          <hr />
          <p className="py-5 text-sm text-center text-white"> Copyright 2024@ - All Right Reserved </p>
        </div>
      )}
    </>
  );
};

export default App;
