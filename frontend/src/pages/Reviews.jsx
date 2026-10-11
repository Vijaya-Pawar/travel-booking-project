import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { addReview, getReviews } from "../services/adminServices";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const data = await getReviews();

            if (data?.status === "success") {
                setReviews(data.data);
            } else {
                toast.error("Failed to load reviews");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async () => {
        try {
            if (!text.trim()) {
                toast.warn("Enter review");
                return;
            }

            const user = sessionStorage.getItem("name");

            setSubmitting(true);

            const result = await addReview({
                text,
                user
            });

            if (result?.status === "success") {
                toast.success("Review added");
                setText("");
                fetchReviews();
            } else {
                toast.error("Failed to add review");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h3>Reviews</h3>

                {/* INPUT CARD */}
                <div className="card p-3 mb-4 shadow">

                    <textarea
                        className="form-control mb-2"
                        placeholder="Write your review..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? "Posting..." : "Submit Review"}
                    </button>

                </div>

                {/* LIST */}
                <ul className="list-group">

                    {loading ? (
                        <li className="list-group-item">
                            Loading reviews...
                        </li>
                    ) : reviews.length === 0 ? (
                        <li className="list-group-item">
                            No reviews yet
                        </li>
                    ) : (
                        reviews.map((r) => (
                            <li key={r._id} className="list-group-item">

                                <strong>{r.user || "Anonymous"}:</strong>{" "}
                                {r.text}

                            </li>
                        ))
                    )}

                </ul>

            </div>
        </>
    );
}

export default Reviews;