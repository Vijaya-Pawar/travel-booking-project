import React, { useState } from "react";
import { createBooking } from "../services/bookingServices";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Booking() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [booking, setBooking] = useState({
        from: "",
        to: "",
        date: "",
        transport_type: "",
        passengers: "",
    });

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            if (!booking.from || !booking.to || !booking.date) {
                toast.warn("Please fill all required fields");
                return;
            }

            if (booking.passengers <= 0) {
                toast.warn("Passengers must be at least 1");
                return;
            }

            setLoading(true);

            const result = await createBooking(booking);

            if (result.status === "success") {
                toast.success("Booking successful");

                setBooking({
                    from: "",
                    to: "",
                    date: "",
                    transport_type: "",
                    passengers: "",
                });

                navigate("/my-bookings");
            } else {
                toast.error("Booking failed");
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

            <div className="container mt-4">
                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Book Your Ticket</h4>
                    </div>

                    <div className="card-body">

                        <div className="mb-3">
                            <label className="form-label">From</label>
                            <input
                                type="text"
                                name="from"
                                className="form-control"
                                value={booking.from}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">To</label>
                            <input
                                type="text"
                                name="to"
                                className="form-control"
                                value={booking.to}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Travel Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={booking.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Transport Type</label>
                            <select
                                name="transport_type"
                                className="form-control"
                                value={booking.transport_type}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="bus">Bus</option>
                                <option value="train">Train</option>
                                <option value="flight">Flight</option>
                                <option value="metro">Metro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Passengers</label>
                            <input
                                type="number"
                                name="passengers"
                                className="form-control"
                                value={booking.passengers}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-flex justify-content-end">

                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Booking..." : "Confirm Booking"}
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;