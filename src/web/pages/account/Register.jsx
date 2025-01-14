import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import Breadcrumb from '../../../shared/Breadcrumb';
const Register = () => {
  const breadcrumbs = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Đăng ký' },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">REGISTER</h1>

          {/* Registration Form */}
          <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
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
              Already have an account?{' '}
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