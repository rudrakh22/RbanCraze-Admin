import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Services/Operations/LoginApi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserShield } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === "admin@rbancraze.com" &&
      formData.password === "rbanCraze@9858"
    ) {
      dispatch(login(formData.email, formData.password, navigate));
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#D8A48E] to-[#F5E9E2]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        {/* Icon and Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <FaUserShield className="text-[#D67D67] text-5xl mb-3" />
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-sm text-[#B0533B] mt-1">Sign in to your admin panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#D67D67] mb-2">
              Email Address <sup className="text-red-500">*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full px-4 py-3 border border-[#e7b6a5] rounded-lg bg-[#FFF5F0] text-[#D67D67] placeholder:text-[#D67D67] focus:outline-none focus:ring-2 focus:ring-[#D67D67]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-[#D67D67] mb-2">
              Password <sup className="text-red-500">*</sup>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 border border-[#e7b6a5] rounded-lg bg-[#FFF5F0] text-[#D67D67] placeholder:text-[#D67D67] focus:outline-none focus:ring-2 focus:ring-[#D67D67]"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[50%] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#B0533B" />
              ) : (
                <AiOutlineEye fontSize={22} fill="#B0533B" />
              )}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D67D67] to-[#B0533B] hover:from-[#B0533B] hover:to-[#D67D67] text-white font-bold py-3 rounded-lg transition-shadow hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
