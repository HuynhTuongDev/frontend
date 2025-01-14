import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { assets } from "../web/assets/assets";
import AllProducts from "../web/components/homepage/AllProduct";
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
    <Menu style={{ width: "120px", fontSize: "16px" }}>
      {
        <>
          <Menu.Item key="1">
            <Link to="/login"> Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/register"> Đăng ký</Link>
          </Menu.Item>
        </>
      }
    </Menu>
  );

  return (
    <>
      <Header />
      <div className="flex items-center justify-between py-5 font-medium sm:mt-32 xs:mt-32 xxs:mt-32 lg:mt-10 mt-16">
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="Logo" />
        </Link>
        <div className="flex items-center gap-12 ml-auto">
          <ul className="hidden md:flex gap-24 text-md font-semibold text-gray-800">
            <NavLink
              to="/"
              className="nav-link flex flex-col items-center gap-3"
              onClick={() => setSelectedItem("home")}
            >
              <p className="text">TRANG CHỦ</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${selectedItem === "home" ? "" : "hidden"
                  }`}
              />
            </NavLink>
            <NavLink
              to="/postcategory/all"
              className="nav-link flex flex-col items-center gap-3"
              onClick={() => setSelectedItem("news")}
            >
              <p>TIN TỨC</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${selectedItem === "news" ? "" : "hidden"
                  }`}
              />
            </NavLink>
            <NavLink
              to="/about"
              className="nav-link flex flex-col items-center gap-3"
              onClick={() => setSelectedItem("about")}
            >
              <p>VỀ CHÚNG TÔI</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${selectedItem === "about" ? "" : "hidden"
                  }`}
              />
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link flex flex-col items-center gap-3"
              onClick={() => setSelectedItem("contact")}
            >
              <p>LIÊN HỆ</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${selectedItem === "contact" ? "" : "hidden"
                  }`}
              />
            </NavLink>
          </ul>
        </div>
        <div className="flex items-center gap-12 ml-auto">
          <SearchOutlined
            style={{ fontSize: "35px" }}
            onClick={() => setShowSearch((prev) => !prev)}
            className="cursor-pointer hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-in-out"
            alt="Search Icon"
          />
          <div className="relative">
            <Link to="/cart">
              <ShoppingCartOutlined
                style={{ fontSize: "35px" }}
                className="cursor-pointer hover:scale-110 hover:text-green-500 transition-transform duration-300 ease-in-out"
                alt="Cart Icon"
              />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {/* Insert cart count */}
              </p>
            </Link>
          </div>
          <Dropdown menu={{
            items: [
              { label: <Link to="/login">Đăng nhập</Link>, key: '1' },
              { label: <Link to="/register">Đăng ký</Link>, key: '2' }
            ]
          }} trigger={['click']}>
            <UserOutlined
              style={{ fontSize: '35px' }}
              className='cursor-pointer hover:scale-110 hover:text-purple-500 transition-transform duration-300 ease-in-out'
            />
          </Dropdown>

          <img
            onClick={() => setIsMobileMenuVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer md:hidden"
            alt="Menu Icon"
          />
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 mt-32 overflow-hidden bg-white transition-all ${isMobileMenuVisible ? "w-full z-50" : "w-0"
            }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setIsMobileMenuVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                className="h-4 rotate-180"
                alt="Dropdown Icon"
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => setIsMobileMenuVisible(false)}
              className="py-2 pl-6 border menu-item"
              to="/"
            >
              TRANG CHỦ
            </NavLink>
            <div className="py-2 pl-6 border menu-item">
              <AllProducts
                closeMenu={() => setIsMobileMenuVisible(false)}
                onSelectCollection={() => setSelectedItem("collection")}
              />
            </div>
            <NavLink
              onClick={() => setIsMobileMenuVisible(false)}
              className="py-2 pl-6 border menu-item"
              to="/postcategory/all"
            >
              TIN TỨC
            </NavLink>
            <NavLink
              onClick={() => setIsMobileMenuVisible(false)}
              className="py-2 pl-6 border menu-item"
              to="/about"
            >
              VỀ Chúng tôi
            </NavLink>
            <NavLink
              onClick={() => setIsMobileMenuVisible(false)}
              className="py-2 pl-6 border menu-item"
              to="/contact"
            >
              LIÊN HỆ
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
