const { broadcastStatus } = require("../../routes/mqtt"); // ✅ Import hàm broadcast
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

    // ✅ Handler cho status từ ESP32 (phiên bản có validation)
    "status": (topic, msg) => {
        try {
            const deviceName = topic.split("/")[0];
            const action = msg.toLowerCase();

            // Validation
            const validDevices = ["led1", "led2", "led3"];
            const validActions = ["on", "off"];

            if (!validDevices.includes(deviceName)) {
                console.error(`❌ Invalid device: ${deviceName}`);
                return;
            }

            if (!validActions.includes(action)) {
                console.error(`❌ Invalid action: ${action}`);
                return;
            }

            console.log(`📡 Status update: ${deviceName} => ${action}`);

            // Lưu vào DB
            db.query(
                "INSERT INTO device_control (device_name, action, created_at) VALUES (?, ?, NOW())",
                [deviceName, action],
                (err, result) => {
                    if (err) {
                        console.error("❌ Device control save error:", err.message);
                    } else {
                        console.log(`✅ Device action saved: ${deviceName} => ${action} (ID: ${result.insertId})`);
                    }
                }
            );

            // Broadcast đến SSE clients
            broadcastStatus(deviceName, action);

        } catch (err) {
            console.error("❌ Status handler error:", err);
        }
    }
};

module.exports = handlers;