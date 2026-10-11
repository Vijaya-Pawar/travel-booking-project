import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { searchTransport } from "../services/adminServices";
import { toast } from "react-toastify";

function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const type = params.get("type");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const data = await searchTransport(query);

            const safeData = Array.isArray(data) ? data : [];

            const filtered = safeData.filter(
                (item) => item.type === type
            );

            setResults(filtered);

        } catch (error) {
            toast.error("Failed to fetch search results");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query && type) {
            fetchData();
        }
    }, [query, type]);

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h3>Search Results</h3>

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
                        ) : results.length === 0 ? (
                            <tr>
                                <td colSpan="4">No results found</td>
                            </tr>
                        ) : (
                            results.map((r) => (
                                <tr key={r._id}>
                                    <td>{r.type}</td>
                                    <td>{r.name}</td>
                                    <td>{r.route}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() =>
                                                navigate(`/view-details/${r._id}`)
                                            }
                                        >
                                            View Details
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

export default SearchResults;