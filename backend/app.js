// app.js
const express = require("express");
const cors = require("cors");
const db = require("./services/db");
require("dotenv").config();
require("./services/mqtt");

const { getStatus } = require("./services/mqtt/index"); // ✅ lấy hàm getStatus từ mqtt
const { router: mqttRoutes } = require("./routes/mqtt");

const app = express();
app.use(cors());
app.use(express.json());

// attach db vào app.locals (nếu cần dùng ở nơi khác)
app.locals.db = db;

// Import routes
const authRoutes = require("./routes/auth");
const sensorRoutes = require("./routes/sensor");
const actionRoutes = require("./routes/action");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/mqtt", mqttRoutes);

// ✅ API check MQTT status
app.get("/api/status", (req, res) => {
    res.json({ mqttConnected: getStatus() });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
