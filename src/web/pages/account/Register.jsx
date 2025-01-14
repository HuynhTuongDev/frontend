import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Breadcrumb from "../../../shared/Breadcrumb";
import CopyRight from "../../../shared/CopyRight";
import Header from "../../../shared/Header";

const Register = () => {
  const breadcrumbs = [{ title: "Trang chủ", href: "/" }, { title: "Đăng ký" }];
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setAccount((prev) => {
      const updatedAccount = { ...prev, [name]: value };

      // Check if passwords match
      if (name === "confirmPassword") {
        setPasswordsMatch(
          updatedAccount.password === updatedAccount.confirmPassword
        );
      }

      return updatedAccount;
    });
  }

  async function handleRegister(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch("http://localhost:8082/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: account.fullName,
          email: account.email,
          password: account.password,
          phone: account.phone,
          address: account.address,
        }),
        headers: myHeaders,
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbs} />
      <div
        style={{
          backgroundImage:
            "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/Backgroung_gia_online_D_2_a2745b43fc.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">REGISTER</h1>

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={account.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={account.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={account.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={account.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={account.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={account.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}

            <button
              disabled={!passwordsMatch}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              SIGN UP
            </button>
          </form>

          {/* Social Login */}
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

          {/* Already have an account */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  );
};

export default Register;
