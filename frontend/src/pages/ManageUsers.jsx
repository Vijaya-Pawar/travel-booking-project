import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "../services/adminServices";
import { safeApiCall } from "../utils/safeApiCall";

function ManageUsers() {
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        const data = await safeApiCall(getUsers, []);
        setUsers(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await deleteUser(id);

            if (res.status === "success") {
                toast.success("User deleted");
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

                <h3>Manage Users</h3>

                <table className="table table-bordered shadow">

                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4">No users found</td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(u._id)}
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

export default ManageUsers;