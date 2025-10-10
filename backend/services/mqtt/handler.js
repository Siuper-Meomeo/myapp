// services/mqtt/handler.js
const db = require("../db");

const handlers = {
    // Xử lý sensor data
    "sensor/all": (msg) => {
        const { temperature, humidity, light } = JSON.parse(msg);
        db.query(
            "INSERT INTO sensor_data (temperature, humidity, light, created_at) VALUES (?, ?, ?, NOW())",
            [temperature, humidity, light],
            (err) => {
                if (err) console.error("❌ Sensor save error:", err.message);
                else console.log("✅ Sensor data saved:", { temperature, humidity, light });
            }
        );
    },

    // Xử lý LED status (feedback từ ESP32)
    "status": (topic, msg) => {
        const ledName = topic.split("/")[0]; // led1, led2, led3
        const action = msg; // "on" hoặc "off"

        db.query(
            "INSERT INTO device_control (device_name, action, created_at) VALUES (?, ?, NOW())",
            [ledName, action],
            (err) => {
                if (err) console.error(`❌ ${ledName} status save error:`, err.message);
                else console.log(`✅ ${ledName.toUpperCase()} confirmed: ${action}`);
            }
        );
    }
};

module.exports = handlers;