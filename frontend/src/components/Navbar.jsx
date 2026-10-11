import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check login status
  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");

    setIsLoggedIn(false);

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Book Travel</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/flights" style={styles.link}>Flights</Link>
        <Link to="/bus" style={styles.link}>Bus</Link>
        <Link to="/train" style={styles.link}>Train</Link>
        <Link to="/metro" style={styles.link}>Metro</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: "#0B3C5D",
    color: "#FFFFF0",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  logo: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "24px",
  },

  links: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    color: "#FFFFF0",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
  },

  button: {
    background: "#FFFFF0",
    color: "#0B3C5D",
    border: "none",
    padding: "7px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Navbar;