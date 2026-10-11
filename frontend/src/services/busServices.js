import api from "./axiosClient";


// ================= GET ALL BUSES =================
export const getAllBuses = async () => {
    try {
        const res = await api.get("/buses");
        return res.data;

    } catch (error) {
        return {
            status: "error",
            message: error.response?.data?.message || "Failed to fetch buses",
        };
    }
};


// ================= SEARCH BUSES =================
export const searchBuses = async (search) => {
    try {
        const res = await api.get(`/buses`);
        return res.data;

    } catch (error) {
        return {
            status: "error",
            message: error.response?.data?.message || "Search failed",
        };
    }
};


// ================= GET BUS DETAILS =================
export const getBusDetails = async (id) => {
    try {
        const res = await api.get(`/buses/${id}`);
        return res.data;

    } catch (error) {
        return {
            status: "error",
            message: "Failed to fetch bus details",
        };
    }
};


// ================= ADD BUS (ADMIN) =================
export const addBus = async (bus) => {
    try {
        const res = await api.post("/buses", bus);
        return res.data;

    } catch (error) {
        return {
            status: "error",
            message: error.response?.data?.message || "Add bus failed",
        };
    }
};


// ================= UPDATE BUS (ADMIN) =================
export const updateBus = async (id, bus) => {
    try {
        const res = await api.put(`/buses/${id}`, bus);
        return res.data;

    } catch (error) {
        return {
            status: "error",
            message: "Update failed",
        };
    }
};


// ================= DELETE BUS (ADMIN) =================
export const deleteBus = async (id) => {
    try {
        const res = await api.delete(`/buses/${id}`);
        return res.data;

    } catch (error) {
        return {
            status: "error",
            message: "Delete failed",
        };
    }
};