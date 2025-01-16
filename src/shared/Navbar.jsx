import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { assets } from "../web/assets/assets";
import Header from "./Header"
const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  // Update selected item based on current URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelectedItem("home");
    } else if (path.includes("postcategory")) {
      setSelectedItem("news");
    } else if (path.includes("about")) {
      setSelectedItem("about");
    } else if (path.includes("contact")) {
      setSelectedItem("contact");
    } else if (path.includes("products")) {
      setSelectedItem("products");
    } else {
      setSelectedItem("");
    }
  }, [location.pathname]);

  const userMenu = (
    <Menu style={{ width: "120px", fontSize: "10px" }}>
      {/* Đăng nhập */}
      <Menu.Item key="1" icon={<LoginOutlined style={{ fontSize: "16px" }} />} >
        <Link to="/login">Đăng nhập</Link>
      </Menu.Item>

      {/* Đăng ký */}
      <Menu.Item key="2" icon={<UserAddOutlined style={{ fontSize: "16px" }} />} >
        <Link to="/register">Đăng ký</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header />
      <div className="flex items-center justify-between py-5 font-medium sm:mt-32 xs:mt-32 xxs:mt-32 lg:mt-10 mt-16">
        {/* Logo và icon Danh mục */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={assets.logo} className="w-32" alt="Logo" />
          </Link>
          <div className="flex items-center gap-2 rounded-full bg-red-500 w-32">
            <button className="flex items-center justify-center w-10 h-10 text-white hover:bg-red-600 transition">
              <MenuOutlined style={{ fontSize: "20px" }} />
            </button>
            <span className="text-white text-base leading-relaxed font-bold">Danh mục</span>
          </div>
        </div>
        {/* Thanh tìm kiếm */}
        <div className="flex-1 mx-6 border-gray-200 border-2 rounded-full">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 px-4 border-gray-100 rounded-full text-gray-700 focus:outline-none"
              placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
            />
            <button className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-700 hover:text-gray-900">
              <SearchOutlined style={{ fontSize: "25px" }} />
            </button>
          </div>
        </div>

        {/* Icon người dùng và giỏ hàng */}
        <div className="flex items-center gap-6">
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <UserOutlined
              style={{ fontSize: "30px" }}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          </Dropdown>
          <Link to="/cart">
            <div className="relative">
              <ShoppingCartOutlined
                style={{ fontSize: "30px" }}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
