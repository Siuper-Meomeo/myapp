const express = require("express");
const router = express.Router();

// Store SSE clients
const sseClients = [];

// SSE endpoint để stream MQTT status
router.get("/stream", (req, res) => {
    console.log("🔌 New SSE client connected");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();

    // Thêm client vào danh sách
    sseClients.push(res);
    console.log(`📡 Total SSE clients: ${sseClients.length}`);

    // Gửi initial connection message
    res.write(`: connected\n\n`);

    // Gửi heartbeat mỗi 30s để giữ kết nối
    const heartbeat = setInterval(() => {
        res.write(`: heartbeat\n\n`);
    }, 30000);

    // Xóa client khi ngắt kết nối
    req.on("close", () => {
        clearInterval(heartbeat);
        const index = sseClients.indexOf(res);
        if (index > -1) sseClients.splice(index, 1);
        console.log(`📡 SSE client disconnected. Total: ${sseClients.length}`);
    });
});

// Function để broadcast status đến tất cả clients
function broadcastStatus(device, status) {
    console.log(`\n🔔 broadcastStatus() CALLED!`);
    console.log(`   Device: ${device}`);
    console.log(`   Status: ${status}`);
    console.log(`   SSE Clients: ${sseClients.length}`);

    if (sseClients.length === 0) {
        console.log(`⚠️ WARNING: No SSE clients connected!`);
        return;
    }

    const data = JSON.stringify({ device, status, timestamp: Date.now() });
    console.log(`📤 Broadcasting data:`, data);

    sseClients.forEach((client, index) => {
        try {
            client.write(`data: ${data}\n\n`);
            console.log(`✅ Successfully sent to client ${index}`);
        } catch (err) {
            console.error(`❌ Error sending to client ${index}:`, err.message);
        }
    });
    console.log(`📤 Broadcast complete!\n`);
}

module.exports = { router, broadcastStatus };