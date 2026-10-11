import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { getMyBookings, deleteBooking } from "../services/adminServices";
import { safeApiCall } from "../utils/safeApiCall";

function MyBookings() {
    const [bookings, setBookings] = useState([]);

    const fetchData = async () => {
        const data = await safeApiCall(getMyBookings, []);
        setBookings(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await deleteBooking(id);

            if (res.status === "success") {
                toast.success("Booking cancelled");
                fetchData();
            } else {
                toast.error("Cancel failed");
            }

        } catch {
            toast.error("Server error");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h3 className="mb-4">My Bookings</h3>

                <table className="table table-bordered shadow">

                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="5">No bookings found</td>
                            </tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b._id}>
                                    <td>{b.user}</td>
                                    <td>{b.type}</td>
                                    <td>{b.from}</td>
                                    <td>{b.to}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(b._id)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>
        </>
    );
}

export default MyBookings;