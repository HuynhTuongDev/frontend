import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AdminLayout, UserLayout } from "./layouts";
import Home from "../Home";
import Register from "../web/pages/account/Register";
import Login from "../web/pages/account/Login";
import Page404 from "../shared/Page404";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    const validRoutes = ["/", "/register", "/login"];

    // Skip validation if URL contains vnpayment parameters
    if (!location.search.includes("vnp_Amount=")) {
      const pathExists = validRoutes.some((route) => {
        const regexPattern = route
          .replace(/:[^/]+/, "[^/]+")
          .replace(/\/$/, "\\/?");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(location.pathname);
      });

      if (!pathExists && location.pathname !== "/404") {
        navigate("/404");
      }
    }
  }, [location, navigate]);

  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="404" element={<Page404 />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Dashboard</div>} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
