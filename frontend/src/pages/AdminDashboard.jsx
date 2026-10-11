import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const loadStats = async () => {
        try {
            setLoading(true);

            const result = await getDashboardStats();

            if (result.status === "success") {
                setStats(result.data);
            } else {
                toast.error("Failed to load dashboard");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">Admin Dashboard</h2>

                <div className="row">

                    <div className="col-md-4">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-body">
                                <h5>Total Users</h5>
                                <h3>{stats.users || 0}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-body">
                                <h5>Total Bookings</h5>
                                <h3>{stats.bookings || 0}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5>Total Buses</h5>
                                <h3>{stats.buses || 0}</h3>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-4">

                    <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate("/admin/buses")}
                    >
                        Manage Buses
                    </button>

                    <button
                        className="btn btn-success me-2"
                        onClick={() => navigate("/admin/bookings")}
                    >
                        View Bookings
                    </button>

                    <button
                        className="btn btn-dark"
                        onClick={() => navigate("/admin/users")}
                    >
                        Manage Users
                    </button>

                </div>

            </div>
        </>
    );
}

export default AdminDashboard;