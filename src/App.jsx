import React, { useContext, useState } from "react";
import Header from './shared/Header';
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import Page404 from "./shared/Page404";
import AppRoutes from "./context/AppRouter";
const App = () => {
  const [is404Page, setIs404Page] = useState(window.location.pathname === '/404');

  function check404Page() {
    setIs404Page(window.location.pathname === '/404');
  }

  return (
    <>
      <div className="w-full bg--400">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Header />
          {!is404Page ? (
            <Navbar />
          ) : <Page404 onReturned={check404Page} />}
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
