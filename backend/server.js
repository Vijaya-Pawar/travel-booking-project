const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());


// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));


// ================= ROUTES =================

// 🔐 AUTH ROUTES (Users)
app.use("/api/auth", require("./routes/users/register"));
app.use("/api/auth", require("./routes/users/login"));
app.use("/api/auth", require("./routes/users/forgotPassword"));

// 👤 USER PROFILE ROUTES
app.use("/api/users", require("./routes/users/user"));


// 🎫 BOOKINGS
app.use("/api/bookings", require("./routes/bookings/booking"));


// ================= TRANSPORT =================
app.use("/api/buses", require("./routes/buses/bus"));
app.use("/api/trains", require("./routes/trains/train"));
app.use("/api/metros", require("./routes/metro/metro"));
app.use("/api/flights", require("./routes/flights/flight"));


// 🌐 COMMON
app.use("/api/common", require("./routes/common/common"));
// app.use("/api/transport", require("./routes/transport/transportRoutes"));

// 🛠 ADMIN
app.use("/api/admin", require("./routes/admin/admin"));
app.use("/api/admin/users", require("./routes/admin/manageUsers"));
app.use("/api/admin/bookings", require("./routes/admin/manageBookings"));
app.use("/api/admin/transport", require("./routes/admin/manageTransport"));
// app.use("/api/admin/transport", require("./routes/admin/manageTransport"));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Smart Transit API running 🚀");
});


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});