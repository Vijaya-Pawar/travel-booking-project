import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/favoriteServices";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = async () => {
        try {
            setLoading(true);

            const result = await getFavorites();

            if (result.status === "success") {
                setFavorites(result.data);
            } else {
                toast.error("Failed to load favorites");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        try {
            const result = await removeFavorite(id);

            if (result.status === "success") {
                toast.success("Removed from favorites");
                loadFavorites();
            } else {
                toast.error("Failed to remove");
            }

        } catch (error) {
            toast.error("Server error");
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <h2>Your Favorites</h2>

                <div className="row mt-3">

                    {favorites.length === 0 ? (
                        <p>No favorites added</p>
                    ) : (
                        favorites.map((item) => (
                            <div className="col-md-4 mb-3" key={item._id}>
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h5>{item.name}</h5>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRemove(item._id)}
                                        >
                                            Remove
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

export default Favorites;