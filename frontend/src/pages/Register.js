import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PopupMessage from "../components/PopupMessage";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "error" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPopup({ message: "Passwords do not match.", type: "warning" });
      return;
    }
    if (!fullName.trim() || !email.trim()) {
      setPopup({ message: "Please fill all fields.", type: "warning" });
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/register/", {
        name: fullName,
        email: email,
        password: password,
      });
      setPopup({ message: "Registration successful! Please log in.", type: "success" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setPopup({ message: "Registration failed. Email may already exist.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center px-4 py-16 font-sans">
      <PopupMessage
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, message: "" })}
      />
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition focus:border-transparent focus:shadow-[0_0_0_2px_#a259ff,0_0_6px_1px_#ff5cdb]"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition focus:border-transparent focus:shadow-[0_0_0_2px_#a259ff,0_0_6px_1px_#ff5cdb]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition pr-12 focus:border-transparent focus:shadow-[0_0_0_2px_#a259ff,0_0_6px_1px_#ff5cdb]"
                placeholder="Create a password"
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition pr-12 focus:border-transparent focus:shadow-[0_0_0_2px_#a259ff,0_0_6px_1px_#ff5cdb]"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
                tabIndex={-1}
              >
                {showConfirm ? (
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
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent hover:opacity-80">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
