import React, { useState } from "react";
import { forgotPassword } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            if (!email) {
                toast.warn("Email is required");
                return;
            }

            setLoading(true);

            const result = await forgotPassword({ email });

            if (result.status === "success") {
                toast.success("Reset link sent to your email");
                navigate("/login");
            } else {
                toast.error("Failed to send reset link");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow mx-auto" style={{ maxWidth: "400px" }}>

                    <div className="card-header bg-primary text-white text-center">
                        <h4>Forgot Password</h4>
                    </div>

                    <div className="card-body">

                        <div className="mb-3">
                            <label className="form-label">Enter your Email</label>

                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="d-flex justify-content-between">

                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate("/login")}
                            >
                                Back
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Link"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ForgotPassword;