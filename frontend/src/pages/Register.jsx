import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { registerUser } from "../services/authServices";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
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
        if (!user.name || !user.email || !user.password) {
            toast.warn("All fields required");
            return;
        }

        const result = await registerUser(user);

        console.log(result);

        if (result.status === "success") {
            toast.success("Registered Successfully");
            navigate("/login");
        } else {
            toast.error(result.message || "Registration Failed");
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
                        <h4>Register</h4>
                    </div>

                    <div className="card-body">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="form-control mb-3"
                            value={user.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control mb-3"
                            value={user.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control mb-3"
                            value={user.password}
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-success w-100"
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;