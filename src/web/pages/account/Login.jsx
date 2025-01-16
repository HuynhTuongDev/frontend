import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Breadcrumb from "../../../shared/Breadcrumb";
import { loginUser } from "../../services/UserService";

const Login = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState(null); // Quản lý thông báo
  const navigate = useNavigate();

  const breadcrumbs = [
    { title: "Trang chủ", href: "/" },
    { title: "Đăng nhập" },
  ];

  async function checkUserLogin(event) {
    event.preventDefault();

    try {
      const response = await loginUser({
        email: account.email,
        password: account.password,
      });
      setNotification({ message: "Login successful!", type: "success" }); // Hiển thị thông báo thành công
      setTimeout(() => {
        setNotification(null);
        navigate("/");
      }, 1000); // Chuyển hướng sau 2 giây
    } catch (error) {
      setNotification({ message: "An error occurred. Please try again.", type: "error" }); // Hiển thị lỗi
      setTimeout(() => setNotification(null), 4000); // Tự động ẩn sau 3 giây
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      {notification && (
        <div
          className={`fixed top-30 right-4 px- py-3 rounded-2xl shadow-md text-white  w-auto max-w-xl ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          role="alert"
        >
          {notification.message}
        </div>
      )}

      <div
        style={{
          // backgroundImage:
          //   "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/Backgroung_gia_online_D_2_a2745b43fc.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen bg-gray-200 flex items-center justify-center"
      >
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl transform transition hover:scale-105 hover:shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>

          <form className="space-y-6" onSubmit={checkUserLogin}>
            <div className="relative">
              <input
                onChange={handleInputChange}
                value={account.email}
                type="text"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            <div className="relative">
              <input
                onChange={handleInputChange}
                value={account.password}
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-500">Or sign in with</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link
                to="https://www.facebook.com/"
                className="text-blue-600 text-2xl hover:scale-110 transition-transform duration-300"
              >
                <FaFacebook />
              </Link>
              <Link
                to="https://www.google.com/"
                className="text-red-600 text-2xl hover:scale-110 transition-transform duration-300"
              >
                <FaGoogle />
              </Link>
              <Link
                to="https://www.github.com/"
                className="text-black-600 text-2xl hover:scale-110 transition-transform duration-300"
              >
                <FaGithub />
              </Link>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
