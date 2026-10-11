import React, { useEffect, useState } from "react";
import { getAllFlights } from "../services/flightServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Flights() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadFlights = async () => {
        try {
            setLoading(true);

            const result = await getAllFlights();

            if (result.status === "success") {
                setFlights(result.data);
            } else {
                toast.error("Failed to load flights");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFlights();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2 className="mb-3">Available Flights</h2>

                <div className="row">

                    {flights.length === 0 ? (
                        <p>No flights available</p>
                    ) : (
                        flights.map((flight) => (
                            <div className="col-md-4 mb-3" key={flight._id}>
                                <div className="card shadow">
                                    <div className="card-body">

                                        <h5>{flight.from} → {flight.to}</h5>
                                        <p>Price: ₹{flight.price}</p>
                                        <p>Date: {flight.date}</p>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate("/booking", { state: flight })
                                            }
                                        >
                                            Book Now
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

export default Flights;