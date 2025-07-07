import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { jwtDecode } from "jwt-decode";

const buttonSizeClasses = "w-32 h-11 flex items-center justify-center";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setIsAdmin] = useState(false);

  const checkTokenStatus = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded?.admin === true || decoded?.is_staff === true);
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkTokenStatus();
    const handler = () => checkTokenStatus();
    window.addEventListener("authChanged", handler);
    return () => window.removeEventListener("authChanged", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("trialCount");
    setMenuOpen(false);
    window.dispatchEvent(new Event("authChanged")); // notify others
    navigate("/login");
  };

  const navButton = (label, to, external = false) =>
    external ? (
      <a
        href={to}
        className={`bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition ${buttonSizeClasses}`}
      >
        {label}
      </a>
    ) : (
      <Link
        to={to}
        className={`bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition ${buttonSizeClasses}`}
      >
        {label}
      </Link>
    );

  return (
    <header className="bg-gradient-to-r from-gray-950 via-gray-900 to-black shadow-md z-50 sticky top-0">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full shadow-lg" />
          <span className="font-bold text-2xl bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
            Code Converter
          </span>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-purple hover:to-brand-pink"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 font-sans">
          {!isLoggedIn ? (
            <>
              {navButton("Login", "/login")}
              {navButton("Register", "/register")}
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className={`bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition ${buttonSizeClasses}`}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-0 right-0 w-full h-full bg-black/80 z-40 flex justify-end">
            <div className="flex flex-col bg-gradient-to-b from-gray-900 via-gray-950 to-black h-full w-fit pl-[5px] pr-4 py-10 shadow-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-pink-400"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Buttons */}
              <div className="mt-12 flex flex-col gap-6">
                {!isLoggedIn ? (
                  <>
                    {navButton("Login", "/login")}
                    {navButton("Register", "/register")}
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className={`bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition ${buttonSizeClasses}`}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1" onClick={() => setMenuOpen(false)} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
