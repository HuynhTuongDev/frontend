import React, { useContext } from "react";
import Header from './components/shared/Header';
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
const App = () => {
  const is404Page = window.location.pathname === '/404';
  return (
    <>
      <div className="w-full bg--400">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Header />
          {!is404Page && (
            <Navbar />
          )}
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
