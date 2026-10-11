import api from "./axiosClient";


// ================= GET ALL FLIGHTS =================
export const getAllFlights = async () => {
  try {
    const res = await api.get("flights");
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};


// ================= SEARCH FLIGHTS =================
export const searchFlights = async (from, to, date) => {
  try {
    const res = await api.post("flights/search", {
      from,
      to,
      date,
    });

    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};


// ================= CREATE FLIGHT (ADMIN) =================
export const addFlight = async (flight) => {
  try {
    const res = await api.post("flights", flight);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};


// ================= UPDATE FLIGHT (ADMIN) =================
export const updateFlight = async (id, flight) => {
  try {
    const res = await api.put(`flights/${id}`, flight);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};


// ================= DELETE FLIGHT (ADMIN) =================
export const deleteFlight = async (id) => {
  try {
    const res = await api.delete(`flights/${id}`);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};


// ================= GET FLIGHT BY ID =================
export const getFlightById = async (id) => {
  try {
    const res = await api.get(`flights/${id}`);
    return res.data;
  } catch (err) {
    return {
      status: "error",
      message: err.message,
    };
  }
};