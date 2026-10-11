import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/authServices";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Profile() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const data = await getProfile();

            if (data?.status === "success") {
                setUser(data.data);
            } else {
                toast.error(data?.message || "Failed to load profile");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow mx-auto" style={{ maxWidth: "500px" }}>

                    <div className="card-header bg-dark text-white text-center">
                        <h4>My Profile</h4>
                    </div>

                    <div className="card-body">

                        <p>
                            <strong>Name:</strong>{" "}
                            {user.name || "Not available"}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {user.email || "Not available"}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {user.role || "user"}
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Profile;