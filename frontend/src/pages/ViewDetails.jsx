import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getTransportById,
    bookTransport,
} from "../services/adminServices";

function ViewDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    const fetchDetails = async () => {
        try {
            setLoading(true);

            const result = await getTransportById(id);

            if (result?.status === "success") {
                setData(result.data);
            } else {
                toast.error("Failed to load details");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchDetails();
    }, [id]);

    const handleBooking = async () => {
        try {
            if (!data) return;

            const user = sessionStorage.getItem("name") || "Guest";

            const routeParts = data.route?.split("-");

            if (!routeParts || routeParts.length < 2) {
                toast.error("Invalid route format");
                return;
            }

            setBookingLoading(true);

            const booking = {
                user,
                from: routeParts[0],
                to: routeParts[1],
                type: data.type,
            };

            const result = await bookTransport(booking);

            if (result?.status === "success") {
                toast.success("Booked successfully 🚀");
                navigate("/my-bookings");
            } else {
                toast.error(result?.message || "Booking failed");
            }

        } catch (error) {
            toast.error("Server error while booking");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <h3 className="text-center mt-5">Loading...</h3>
            </>
        );
    }

    if (!data) {
        return (
            <>
                <Navbar />
                <h3 className="text-center mt-5">No details found</h3>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h3>{data.name}</h3>

                    <p><strong>Type:</strong> {data.type}</p>

                    <p><strong>Route:</strong> {data.route}</p>

                    <button
                        className="btn btn-success mt-3"
                        onClick={handleBooking}
                        disabled={bookingLoading}
                    >
                        {bookingLoading ? "Booking..." : "Book Now"}
                    </button>

                </div>

            </div>
        </>
    );
}

export default ViewDetails;