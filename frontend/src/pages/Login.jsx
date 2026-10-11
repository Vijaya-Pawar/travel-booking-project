import React, { useState } from "react";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (user.email === "" || user.password === "") {
            toast.warn("Email and Password are required");
            return;
        }

        const res = await loginUser(user.email, user.password);

        if (res.status === "success") {
            toast.success("Login Successful");

            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("role", res.data.role);
            sessionStorage.setItem("name", res.data.name);

            navigate("/");
        } else {
            toast.error(res.message || "Invalid Credentials");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <div
                    className="card shadow mx-auto"
                    style={{ maxWidth: "400px" }}
                >
                    <div className="card-header bg-primary text-white text-center">
                        <h4>Login</h4>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span
                                style={{
                                    cursor: "pointer",
                                    color: "blue",
                                }}
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot Password?
                            </span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;