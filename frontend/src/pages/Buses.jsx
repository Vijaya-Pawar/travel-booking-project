import React, { useEffect, useState } from "react";
import { getAllBuses } from "../services/busServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Bus() {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadBuses = async () => {
        try {
            setLoading(true);

            const result = await getAllBuses();

            if (result.status === "success") {
                setBuses(result.data);
            } else {
                toast.error("Failed to load buses");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBuses();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2>Available Buses</h2>

                <div className="row mt-3">

                    {buses.length === 0 ? (
                        <p>No buses available</p>
                    ) : (
                        buses.map((bus) => (
                            <div className="col-md-4 mb-3" key={bus._id}>
                                <div className="card shadow">
                                    <div className="card-body">

                                        <h5>{bus.from} → {bus.to}</h5>
                                        <p>Price: ₹{bus.price}</p>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate("/booking", { state: bus })}
                                        >
                                            Book
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </>
    );
}

export default Bus;