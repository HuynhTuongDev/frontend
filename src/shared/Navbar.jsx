import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MobileOutlined, LaptopOutlined, TabletOutlined, AppleOutlined, AndroidOutlined, AudioOutlined, BuildOutlined } from "@ant-design/icons";
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
import Header from "./Header";
import { getCategories } from "../web/services/CategoryService";
import { getBrands } from "../web/services/BrandService";

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const [categories, setCategories] = useState([]); // Dữ liệu danh mục
  const [brands, setBrands] = useState([]); // Dữ liệu thương hiệu
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  // Cập nhật item được chọn dựa trên URL hiện tại
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
    } else {
      setSelectedItem("");
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesRes = await getCategories(); // Gọi hàm getCategories từ dịch vụ
        const brandsRes = await getBrands(); // Gọi hàm getBrands từ dịch vụ
        setCategories(categoriesRes.data); // Cập nhật danh mục
        setBrands(brandsRes.data); // Cập nhật thương hiệu
      } catch (error) {
        setError("Lỗi khi tải danh mục và thương hiệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (categoryID) => {
    navigate(`/products?categoryID=${categoryID}`);
  };

  const handleBrandSelect = (brandID) => {
    navigate(`/products?brandID=${brandID}`);
  };

  const menu = (
    <Menu style={{ width: "auto" }} className="bg-gray-100 p-4">
      <div className="flex flex-wrap gap-6">
        {/* Danh mục */}
        <div className="flex-[0.005] min-w-[300px]">
          <Menu.ItemGroup title={<div className="text-lg font-semibold mb-2">Danh mục</div>}>
            <div
              className={`grid ${categories.length > 24
                ? "grid-cols-4 gap-4"
                : categories.length > 16
                  ? "grid-cols-3 gap-4"
                  : categories.length > 8
                    ? "grid-cols-2 gap-4"
                    : "grid-cols-1 gap-4"
                }`}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Menu.Item
                    key={category.categoryID}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl border-0 py-2 px-3 text-center transition"
                    onClick={() => handleCategorySelect(category.categoryID)} // Handle click for category
                  >
                    {category.categoryName}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item
                  disabled
                  className="bg-pink-500 text-white rounded-full border-2 border-pink-700 py-2 px-3 text-center"
                >
                  Không có Thể loại
                </Menu.Item>
              )}
            </div>
          </Menu.ItemGroup>
        </div>

        {/* Thương hiệu */}
        <div className="flex-3 min-w-[300px]">
          <Menu.ItemGroup title={<div className="text-lg font-semibold mb-2">Thương hiệu</div>}>
            <div
              className={`grid ${brands.length > 24
                ? "grid-cols-5 gap-4"
                : brands.length > 18
                  ? "grid-cols-4 gap-4"
                  : brands.length > 12
                    ? "grid-cols-3 gap-4"
                    : brands.length > 4
                      ? "grid-cols-2 gap-4"
                      : "grid-cols-1 gap-4"
                }`}
            >
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <Menu.Item
                    key={brand.brandID}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full border-0 py-2 px-3 text-center transition"
                    onClick={() => handleBrandSelect(brand.brandID)} // Handle click for brand
                  >
                    {brand.brandName}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item
                  disabled
                  className="bg-pink-500 text-white rounded-full border-2 border-pink-700 py-2 px-3 text-center"
                >
                  Không có thương hiệu
                </Menu.Item>
              )}
            </div>
          </Menu.ItemGroup>
        </div>
      </div>

      {/* Nút Toàn bộ sản phẩm */}
      <div className="mt-6">
        <Menu.Item
          onClick={() => {
            // Điều hướng đến trang Collection không có bộ lọc
            navigate(`/products`);
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-0 py-3 px-4 text-center font-semibold transition"
        >
          Tất cả sản phẩm
        </Menu.Item>
      </div>
    </Menu>
  );

  // Dropdown menu cho người dùng
  const userMenu = (
    <Menu style={{ width: "120px", fontSize: "10px" }}>
      {/* Đăng nhập */}
      <Menu.Item key="1" icon={<LoginOutlined style={{ fontSize: "16px" }} />}>
        <Link to="/login">Đăng nhập</Link>
      </Menu.Item>

      {/* Đăng ký */}
      <Menu.Item key="2" icon={<UserAddOutlined style={{ fontSize: "16px" }} />}>
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
          <div className="flex items-center gap-2 rounded-full bg-red-500 w-32 hover:bg-red-700">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex items-center w-full h-full cursor-pointer">
                {/* Icon menu */}
                <button className="flex items-center justify-center w-10 h-10 text-white transition">
                  <MenuOutlined style={{ fontSize: "20px" }} />
                </button>
                {/* Text Danh mục */}
                <span className="text-white text-base leading-relaxed font-bold">Danh mục</span>
              </div>
            </Dropdown>
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

        {/* Giỏ hàng */}
        <div className="flex items-center gap-5">
          <Link to="/cart">
            <button className="relative flex items-center justify-center w-10 h-10 text-black hover:text-red-500 transition">
              <ShoppingCartOutlined style={{ fontSize: "35px", marginLeft: "10px" }} />
            </button>
          </Link>
          {/* Tài khoản người dùng */}
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer">
              <UserOutlined style={{ fontSize: "35px", marginLeft: "10px" }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Navbar;
