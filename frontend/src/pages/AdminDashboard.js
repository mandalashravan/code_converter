import React, { useEffect, useState, useCallback } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [processingId, setProcessingId] = useState(null); // 👈 New state for toggle speed
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        setError("Failed to fetch users.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (!decoded?.is_staff) {
        setShowPopup(true);
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              navigate("/");
            }
            return prev - 1;
          });
        }, 1000);
        return;
      }
      fetchUsers();
    } catch (err) {
      console.error("Invalid token", err);
      setError("Unauthorized access.");
      navigate("/");
    }
  }, [token, navigate, fetchUsers]);

  const toggleStatus = async (userId) => {
    setProcessingId(userId);
    try {
      await axios.post(
        `/admin/toggle-user/${userId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, is_active: !user.is_active }
            : user
        )
      );
    } catch (err) {
      console.error("Error toggling status:", err);
      alert("Failed to update user status.");
    } finally {
      setProcessingId(null);
    }
  };

  /*const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };*/

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans text-white">
      <Helmet>
        <title>Admin Dashboard</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Helmet>

      {showPopup ? (
        <div className="text-center text-lg bg-yellow-100 text-yellow-800 py-4 px-6 rounded-lg font-semibold">
          You are not an admin. Redirecting to Home page in {countdown} second{countdown !== 1 ? "s" : ""}...
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Admin Dashboard
            </h1>
          </div>

          {loading ? (
            <p className="text-center text-gray-300">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full bg-gray-800 text-white text-sm">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="py-3 px-4 text-left">Username</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-700 hover:bg-gray-700 transition"
                    >
                      <td className="py-2 px-4">{user.username}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            user.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => toggleStatus(user.id)}
                          disabled={processingId === user.id}
                          className={`px-4 py-1 rounded text-white font-semibold transition duration-150 ${
                            user.is_active
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          } ${
                            processingId === user.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {processingId === user.id
                            ? "Processing..."
                            : user.is_active
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
