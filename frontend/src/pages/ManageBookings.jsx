import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { getBookings, deleteBooking } from "../services/adminServices";
import { safeApiCall } from "../utils/safeApiCall";

function ManageBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const data = await safeApiCall(getBookings, []);
        setBookings(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await deleteBooking(id);

            if (res.status === "success") {
                toast.success("Booking deleted");
                fetchData();
            } else {
                toast.error("Delete failed");
            }

        } catch {
            toast.error("Server error");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h3 className="mb-4">Manage Bookings</h3>

                <table className="table table-bordered shadow">

                    <thead className="table-dark">
                        <tr>
                            <th>User</th>
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
                                            Delete
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

export default ManageBookings;