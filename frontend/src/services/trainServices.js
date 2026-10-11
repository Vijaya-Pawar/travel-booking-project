import api from "./axiosClient";

// ================= GET ALL TRAINS =================
export const getTrains = async () => {
  try {
    const res = await api.get("/trains");
    return res.data;
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// ================= SEARCH TRAINS =================
export const searchTrains = async (query) => {
  try {
    const res = await api.get(`/trains/search?query=${query}`);
    return res.data;
  } catch (err) {
    return { status: "error", message: err.message };
  }
};

// ================= GET DESTINATIONS =================
export const getTrainDestinations = async () => {
  try {
    const res = await api.get("/trains/destinations");
    return res.data;
  } catch (err) {
    return { status: "error", message: err.message };
  }
};