import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import AppRoutes from "./context/AppRouter";
import CopyRight from "./shared/CopyRight";

const App = () => {
  const notMainPageRoutes = ["/404", "/register", "/login"];
  const location = useLocation(); // Hook to get the current route

  const [notMainPage, setNotMainPage] = useState(
    notMainPageRoutes.includes(location.pathname)
  );

  useEffect(() => {
    setNotMainPage(notMainPageRoutes.includes(location.pathname));
  }, [location.pathname]); // Update when pathname changes

  return (
    <>
      <div className="w-full bg--400">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Header />
          {!notMainPage && <Navbar />}
          <AppRoutes />
          {!notMainPage && <Footer />}
        </div>
      </div>

      <CopyRight/>
    </>
  );
};

export default App;
