import axios from "axios";
import config from "./config";

const API = config.BASE_URL;

// Create axios instance
const api = axios.create({
    baseURL: API,
});

// Attach token automatically to every request
api.interceptors.request.use(
    (req) => {
        const token =
            sessionStorage.getItem("token") ||
            localStorage.getItem("token");

        if (token) {
            req.headers.token = token;
        }

        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Global response handler (useful for debugging)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // You can handle global errors here if needed
        return Promise.reject(error);
    }
);

export async function getHomeTransportData() {
  try {
    const response = await api.get("transport/home");
    return response.data;
  } catch (err) {
    return {
      status: "error",
      message: err.response?.data?.message || err.message,
    };
  }
}

export default api;