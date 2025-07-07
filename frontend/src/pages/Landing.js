import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PreviewConverter from "../components/PreviewConverter";

const Landing = () => {
  //const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.admin === true) {
          // 🚫 Redirect admin to dashboard
          window.location.href = "http://localhost:3000/admin/dashboard";
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white min-h-screen flex flex-col items-center px-6 py-16 space-y-10 font-sans">
      <h1 className="text-6xl font-extrabold text-center drop-shadow-lg bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
        Welcome to Code Converter
      </h1>

      <p className="max-w-5xl text-center text-xl text-gray-300 leading-relaxed">
        Instantly convert code across a diverse set of programming languages with the power of AI. Whether you're learning, debugging, migrating systems, or exploring new technologies, our platform streamlines the process—saving time, reducing errors, and keeping your focus on logic rather than syntax.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mt-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-pink-600/30 transition duration-300">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Convert between Python, JavaScript, Java, C++, PHP, Swift, and more.</li>
            <li>Clean, readable, and functional code output.</li>
            <li>Preview conversion on the landing page before signing in.</li>
            <li>Intuitive UI with smooth interaction and modern UX.</li>
            <li>AI-powered logic for accurate syntax translation.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-pink-600/30 transition duration-300">
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
            Why Use Us?
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Fast & secure code transformation.</li>
            <li>Ideal for students, professionals, and hobby coders.</li>
            <li>Handles syntax, structure, and style automatically.</li>
            <li>No setup or installation required.</li>
            <li>Open-source spirit with cutting-edge AI integration.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 max-w-4xl text-center text-lg text-gray-400 leading-relaxed">
        <p className="mb-4">
          Whether you’re building cross-platform apps, learning backend development, or
          just testing logic in multiple languages—our tool saves time, increases productivity, 
          and lets you focus on what truly matters: clean and working code.
        </p>
        <p>
          Start with 3 free conversions. No account? No problem. Once you're ready, sign up for
          unlimited access and unlock the full power of AI-assisted code generation.
        </p>
      </div>

      <Link
        to="/convert"
        className="mt-6 bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-lg hover:shadow-pink-500/30 transition hover:scale-105"
      >
        Try the Code Converter
      </Link>

      <div className="w-full max-w-6xl mt-16 border-t border-gray-700 pt-10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
          ✨ Live Preview
        </h2>
        <PreviewConverter />
      </div>
    </div>
  );
};

export default Landing;
