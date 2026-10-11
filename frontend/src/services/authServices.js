import api from "./axiosClient";


// ================= LOGIN =================
export async function loginUser(email, password) {
    try {
        const res = await api.post("/auth/signin", {
            email,
            password,
        });

        return res.data;

    } catch (err) {
        return {
            status: "error",
            message: err.response?.data?.message || "Login failed",
        };
    }
}


// ================= REGISTER =================
export async function registerUser(user) {
    try {
        const res = await api.post("/auth/register", user);

        return res.data;

    } catch (err) {
        return {
            status: "error",
            message: err.response?.data?.message || "Registration failed",
        };
    }
}


// ================= PROFILE =================
export async function getProfile() {
    try {
        const res = await api.get("/auth/profile");

        return res.data;

    } catch (err) {
        return {
            status: "error",
            message: err.response?.data?.message || "Failed to load profile",
        };
    }
}