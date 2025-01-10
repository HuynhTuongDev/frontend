import React, { useContext, useState } from "react";
import Header from './components/shared/Header';
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import Page404 from "./components/shared/Page404";
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
          ) : <Page404 onReturned={check404Page}/>}
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
