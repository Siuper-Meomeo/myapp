const handlers = require("./handler");
const { mqttClient, getStatus } = require("./client");

mqttClient.on("connect", () => {
    const topics = ["sensor/all", "led1/status", "led2/status", "led3/status"];
    mqttClient.subscribe(topics, (err) => {
        if (!err) console.log("📡 Subscribed:", topics.join(", "));
    });
});

// ✅ Đặt message handler ở đây (không lồng trong connect)
mqttClient.on("message", (topic, message) => {
    const msg = message.toString();
    console.log(`📨 MQTT Received [${topic}]: ${msg}`);

    if (handlers[topic]) {
        handlers[topic](msg);
    } else if (topic.endsWith("/status")) { // ✅ Sửa thành "/status"
        handlers["status"](topic, msg);
    } else {
        console.log("⚠️ Unknown topic:", topic);
    }
});

const publish = {
    ledControl: (ledName, action) => {
        return new Promise((resolve, reject) => {
            const topic = `${ledName}/control`;
            mqttClient.publish(topic, action, (err) => {
                if (err) {
                    console.error(`❌ Publish error [${topic}]:`, err.message);
                    reject(err);
                } else {
                    console.log(`📤 Published [${topic}] => ${action}`);
                    resolve();
                }
            });
        });
    }
};

module.exports = { publish, mqttClient, getStatus };