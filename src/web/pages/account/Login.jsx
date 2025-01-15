import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Breadcrumb from "../../../shared/Breadcrumb";

const Login = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const breadcrumbs = [
    { title: "Trang chủ", href: "/" },
    { title: "Đăng nhập" },
  ];

  const navigate = useNavigate(); // Call useNavigate at the top level

  async function checkUserLogin(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch("http://localhost:8082/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: account.email,
          password: account.password,
        }),
        headers: myHeaders,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        navigate("/"); // Redirect to the homepage
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
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
      <div
        style={{
          backgroundImage:
            "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/Backgroung_gia_online_D_2_a2745b43fc.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen bg-gray-100 flex items-center justify-center"
      >
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">LOGIN</h1>

          <form className="space-y-4" onSubmit={checkUserLogin}>
            <input
              onChange={handleInputChange}
              value={account.email}
              type="text"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              onChange={handleInputChange}
              value={account.password}
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-500">Or</p>
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
              Do not have an account?{" "}
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
