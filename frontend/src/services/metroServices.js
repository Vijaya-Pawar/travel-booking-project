import api from "./axiosClient";

// ================= BOOK METRO =================
export const bookMetro = async (data) => {
  try {
    const res = await api.post("/bookings", data);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};

// ================= GET ALL METRO ROUTES =================
// metroServices.js
export const getAllMetros = async () => {
  try {
    const res = await api.get("metros");
    // If your backend uses result.success, the array is likely in res.data.data
    // Check both locations to be safe
    return res.data.data || res.data; 
  } catch (err) {
    console.error("Fetch error:", err);
    return []; // Return empty array on error to prevent .map() crashes
  }
};

// ================= SEARCH METRO =================
export const searchMetros = async (from, to) => {
  try {
    const res = await api.post("metros/search", { from, to });
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};

// ================= GET METRO BY ID =================
export const getMetroById = async (id) => {
  try {
    const res = await api.get(`metros/${id}`);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};

// ================= CREATE METRO (ADMIN) =================
export const addMetro = async (metro) => {
  try {
    const res = await api.post("metros", metro);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};

// ================= UPDATE METRO (ADMIN) =================
export const updateMetro = async (id, metro) => {
  try {
    const res = await api.put(`metros/${id}`, metro);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};

// ================= DELETE METRO (ADMIN) =================
export const deleteMetro = async (id) => {
  try {
    const res = await api.delete(`metros/${id}`);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};