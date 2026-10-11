import React, { useEffect, useState } from "react";
import { getAllMetros } from "../services/metroServices";

const MetroPage = () => {
  const [metros, setMetros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetros();
  }, []);

  const fetchMetros = async () => {
  try {
    const res = await getAllMetros();
    console.log("API Response:", res); // Debugging line

    // Only set state if res is actually an array
    if (Array.isArray(res)) {
      setMetros(res);
    } else {
      console.error("Expected an array but got:", res);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  if (loading) return <h2>Loading metros...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Available Metros</h2>

      <div className="metro-grid">
        {metros.map((metro) => (
          <div key={metro._id} className="metro-card">
            
            <h3>{metro.name}</h3>

            <p>
              <b>From:</b> {metro.from}
            </p>

            <p>
              <b>To:</b> {metro.to}
            </p>

            <p>
              <b>Departure:</b> {metro.departureTime}
            </p>

            <p>
              <b>Arrival:</b> {metro.arrivalTime}
            </p>

            <p>
              <b>Price:</b> ₹{metro.price}
            </p>

            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetroPage;