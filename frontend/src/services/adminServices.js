import api from "./axiosClient";


// ================= LOGIN =================
export async function loginUser(email, password) {
  try {
    const response = await api.post("auth/signin", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    return {
      status: "error",
      message: err.response?.data?.message || err.message,
    };
  }
}


// ================= REGISTER =================
export async function registerUser(user) {
  try {
    const response = await api.post("auth/register", user);

    return response.data;
  } catch (err) {
    return {
      status: "error",
      message: err.response?.data?.message || err.message,
    };
  }
}


// ================= PROFILE =================
export async function getProfile() {
  try {
    const response = await api.get("auth/profile");
    return response.data;
  } catch (err) {
    return {
      status: "error",
      message: err.response?.data?.message || err.message,
    };
  }
}


// ================= HOME PAGE DATA (ADD THIS) =================
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