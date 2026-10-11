import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTrainDestinations } from "../services/trainServices";

function Trains() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);

    // ================= LOAD DESTINATIONS =================
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await getTrainDestinations();

                if (res.status === "success") {
                    setDestinations(res.data);
                } else {
                    toast.error(res.message || "Failed to load destinations");
                }
            } catch (err) {
                toast.error("Something went wrong");
            }
        };

        fetchDestinations();
    }, []);

    // ================= SEARCH =================
    const handleSearch = () => {
        const trimmed = search.trim();

        if (!trimmed) {
            toast.warn("Please enter destination");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            navigate(
                `/search-results?query=${encodeURIComponent(trimmed)}&type=train`
            );
            setLoading(false);
        }, 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                {/* ================= DESTINATIONS ================= */}
                <div className="mb-4">
                    <h5 className="mb-3">Popular Train Destinations 🚆</h5>

                    <div className="d-flex flex-wrap gap-2">
                        {destinations.map((item, index) => (
                            <span
                                key={index}
                                className="badge bg-secondary p-2"
                                style={{
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                                onClick={() => setSearch(item)}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ================= SEARCH BOX ================= */}
                <div
                    className="card shadow mx-auto p-4 text-center"
                    style={{ maxWidth: "500px" }}
                >
                    <h4>Search Trains 🚆</h4>

                    <input
                        type="text"
                        placeholder="Enter destination"
                        className="form-control my-3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

            </div>
        </>
    );
}

export default Trains;