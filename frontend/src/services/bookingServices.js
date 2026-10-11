import api from "./axiosClient";


// ================= GET BOOKINGS =================
export const getBookings = async () => {
    try {
        const res = await api.get("bookings");
        return res.data;

    } catch (err) {
        return {
            status: "error",
            message: err.response?.data?.message || "Failed to fetch bookings",
        };
    }
};


// ================= ADD BOOKING =================
export const addBooking = async (data) => {
    try {
        const res = await api.post("bookings", data);
        return res.data;

    } catch (err) {
        return {
            status: "error",
            message: err.response?.data?.message || "Booking failed",
        };
    }
};


// ================= DELETE BOOKING =================
export const deleteBooking = async (id) => {
    try {
        const res = await api.delete(`bookings/${id}`);
        return res.data;

    } catch (err) {
        return {
            status: "error",
            message: err.response?.data?.message || "Delete failed",
        };
    }
};