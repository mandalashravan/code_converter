import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now + 60) {
          // Try to refresh
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const res = await axios.post("http://localhost:8000/api/token/refresh/", {
                refresh: refreshToken,
              });
              localStorage.setItem("token", res.data.access);
              token = res.data.access;
            } catch (err) {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
              throw err;
            }
          }
        }

        config.headers.Authorization = `Bearer ${token}`;
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        throw e;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
