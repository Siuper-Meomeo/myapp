const mqtt = require("mqtt");
require("dotenv").config();

const brokerUrl = `${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

const client = mqtt.connect(brokerUrl, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clean: true
});

let connected = false;

client.on("connect", () => {
    connected = true;
    console.log("✅ MQTT Connected");
});

client.on("close", () => {
    connected = false;
    console.log("⚠️ MQTT Disconnected");
});

client.on("error", (err) => {
    connected = false;
    console.error("❌ MQTT Error:", err.message);
});

// ✅ thêm hàm getStatus
function getStatus() {
    return connected;
}

module.exports = {
    mqttClient: client,   // export client đúng tên
    getStatus
};
