import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import PopupMessage from "../components/PopupMessage";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState(""); // sent as username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "error" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login/", {
        username: email,
        password,
      });

      // ✅ Save tokens
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      localStorage.removeItem("trialCount"); // optional clear

      // ✅ Decode token to check admin flag
      const decoded = jwtDecode(res.data.access);
      const isAdmin = decoded?.admin === true || decoded?.is_staff === true;

      // ✅ Notify Navbar
      window.dispatchEvent(new Event("authChanged"));

      setPopup({
        message: "Login successful!",
        type: "success",
      });

      // ✅ Redirect based on admin flag
      setTimeout(() => {
        if (isAdmin) {
          window.location.href = "http://localhost:3000/admin/dashboard";
        } else {
          navigate("/convert");
        }
      }, 800);
    } catch (err) {
      const errorMsg =
        err.response?.status === 401
          ? "Invalid credentials or user not activated yet."
          : "Something went wrong. Please try again.";
      setPopup({ message: errorMsg, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center px-4 py-16 font-sans">
      <PopupMessage
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, message: "" })}
      />
      <div className="w-full max-w-md bg-gray-900 text-white p-10 rounded-2xl shadow-2xl border border-gray-800 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading leading-tight">
          Login to Continue
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email / Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition focus:border-transparent focus:shadow-[0_0_0_2px_#a259ff,0_0_6px_1px_#ff5cdb]"
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition pr-12 focus:border-transparent focus:shadow-[0_0_0_2px_#a259ff,0_0_6px_1px_#ff5cdb]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white font-bold py-3 rounded-xl shadow-lg transition hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent hover:opacity-80"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
