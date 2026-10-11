import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
    getTransport,
    addTransport,
    deleteTransport,
} from "../services/adminServices";
import { safeApiCall } from "../utils/safeApiCall";

function ManageTransport() {
    const [transport, setTransport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        type: "",
        name: "",
        route: "",
    });

    const fetchData = async () => {
        setLoading(true);

        const data = await safeApiCall(getTransport, []);
        setTransport(data);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdd = async () => {
        try {
            const { type, name, route } = form;

            if (!type || !name || !route) {
                toast.warn("All fields required");
                return;
            }

            setSubmitting(true);

            const res = await addTransport(form);

            if (res.status === "success") {
                toast.success("Transport added");

                setForm({ type: "", name: "", route: "" });
                fetchData();
            } else {
                toast.error("Failed to add transport");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;

        try {
            const res = await deleteTransport(id);

            if (res.status === "success") {
                toast.success("Deleted");
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

                <h3>Manage Transport</h3>

                {/* FORM */}
                <div className="card p-3 mb-4 shadow">

                    <input
                        name="type"
                        placeholder="Type (Bus/Train/Flight)"
                        className="form-control mb-2"
                        value={form.type}
                        onChange={handleChange}
                    />

                    <input
                        name="name"
                        placeholder="Name"
                        className="form-control mb-2"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        name="route"
                        placeholder="Route"
                        className="form-control mb-2"
                        value={form.route}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleAdd}
                        disabled={submitting}
                    >
                        {submitting ? "Adding..." : "Add Transport"}
                    </button>

                </div>

                {/* TABLE */}
                <table className="table table-bordered shadow">

                    <thead className="table-dark">
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Route</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : transport.length === 0 ? (
                            <tr>
                                <td colSpan="4">No transport found</td>
                            </tr>
                        ) : (
                            transport.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.type}</td>
                                    <td>{t.name}</td>
                                    <td>{t.route}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(t._id)}
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

export default ManageTransport;