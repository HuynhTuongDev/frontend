// src/components/Register/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Breadcrumb from "../../../shared/Breadcrumb";
import { registerUser } from "../../services/UserService"; // Import registerUser

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
  const [notification, setNotification] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setAccount((prev) => {
      const updatedAccount = { ...prev, [name]: value };

      // Check if passwords match
      if (name === "confirmPassword") {
        setPasswordsMatch(updatedAccount.password === updatedAccount.confirmPassword);
      }

      return updatedAccount;
    });
  }

  async function handleRegister(event) {
    event.preventDefault();

    try {
      setNotification(null);

      await registerUser({
        fullName: account.fullName,
        email: account.email,
        password: account.password,
        phone: account.phone,
        address: account.address,
      });

      setNotification({ message: "Registration successful!", type: "success" });
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setNotification({ message: `Registration failed: ${error.response?.data?.message || error.message}`, type: "error" });
      setTimeout(() => setNotification(null), 4000);
    }
  }

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      {notification && (
        <div
          className={`fixed top-30 right-4  px-6 py-3 rounded-2xl shadow-lg text-white transition-all duration-300 ease-in-out ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          role="alert"
        >
          {notification.message}
        </div>
      )}
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen bg-gray-200 flex items-center justify-center"
      >
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
          <h1 className="text-3xl font-bold text-center mb-6 animate__animated animate__fadeIn">Register</h1>

          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={account.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={account.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={account.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={account.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={account.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={account.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300 ease-in-out"
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
            <button
              disabled={!passwordsMatch}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Sign Up
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
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
