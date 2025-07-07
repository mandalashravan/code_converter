import React from "react";

const COLORS = {
  success: {
    border: "border-green-500",
    text: "text-green-700",
    icon: "✅",
  },
  error: {
    border: "border-red-500",
    text: "text-red-700",
    icon: "⛔",
  },
  warning: {
    border: "border-yellow-500",
    text: "text-yellow-700",
    icon: "⚠️",
  },
  info: {
    border: "border-blue-500",
    text: "text-blue-700",
    icon: "ℹ️",
  },
};

// Door with arrow left (Home)
const DoorHomeIcon = () => (
  <svg className="inline-block mr-2" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Door */}
    <rect x="3" y="6" width="7" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="#e5e7eb" />
    {/* Arrow */}
    <path d="M16 12H7" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M10 9l-3 3 3 3" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Door with arrow right (Login)
const DoorLoginIcon = () => (
  <svg className="inline-block ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Door */}
    <rect x="14" y="6" width="7" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="#e5e7eb" />
    {/* Arrow */}
    <path d="M8 12h9" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M15 9l3 3-3 3" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Door with plus (Register)
const DoorRegisterIcon = () => (
  <svg className="inline-block ml-2" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {/* Door */}
    <rect x="14" y="6" width="7" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="#e5e7eb" />
    {/* Plus */}
    <path d="M7 12h6" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M10 9v6" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// Remove unused icon components if not used in this file
// export them if you want to use them elsewhere, or just delete if not needed

const PopupMessage = ({ type = "info", message, onClose, actions, hideClose }) => {
  if (!message) return null;
  const color = COLORS[type] || COLORS.info;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all"></div>
      {/* Popup */}
      <div
        className={`relative z-10 bg-white px-5 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 border-l-8 ${color.border} animate-popup-fast min-w-[90vw] max-w-[95vw] sm:min-w-[380px] sm:max-w-[500px] md:min-w-[420px] md:max-w-[600px]`}
        style={{ fontFamily: "'Poppins', 'Clash Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif" }}
      >
        <div className="flex items-center gap-4 w-full">
          <span className="text-2xl">{color.icon}</span>
          <span className={`text-lg font-semibold ${color.text}`}>{message}</span>
          {!hideClose && (
            <button
              onClick={onClose}
              className="ml-auto text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none absolute top-2 right-4 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
          )}
        </div>
        {actions && actions.length > 0 && (
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center mt-6">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="px-4 py-2 rounded bg-gradient-to-r from-brand-purple to-brand-pink text-white font-semibold shadow hover:scale-105 transition flex items-center"
              >
                {action.label === "Go to Home" && <DoorHomeIcon />}
                {action.label === "Go to Login" && <DoorLoginIcon />}
                {action.label === "Go to Register" && <DoorRegisterIcon />}
                <span className="ml-1">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupMessage;