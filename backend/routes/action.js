const express = require("express");
const router = express.Router();
const ActionHistory = require("../models/ActionHistory");
const { publish } = require("../services/mqtt/index"); // Import MQTT

// POST: điều khiển thiết bị (LUỒNG CHÍNH)
router.post("/control", async (req, res) => {
    const { device_name, action } = req.body;

    // Validation
    if (!device_name || !action) {
        return res.status(400).json({ error: "Missing device_name or action" });
    }

    if (!["led1", "led2", "led3"].includes(device_name)) {
        return res.status(400).json({ error: "Invalid device name. Use: led1, led2, led3" });
    }

    if (!["on", "off"].includes(action.toLowerCase())) {
        return res.status(400).json({ error: "Invalid action. Use: on or off" });
    }

    try {
        // Bước 3: Publish lệnh xuống ESP32 qua MQTT
        await publish.ledControl(device_name, action.toLowerCase());

        // Bước 9: Trả response ngay
        res.json({
            success: true,
            message: `${device_name.toUpperCase()} set to ${action}`,
            device: device_name,
            action: action
        });

        // Note: Việc lưu DB sẽ được xử lý tự động trong mqtt/handler.js
        // khi backend subscribe topic led1/control, led2/control, led3/control

    } catch (error) {
        console.error("❌ Control error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to send command to device"
        });
    }
});

// GET: Lấy trạng thái hiện tại của 1 thiết bị cụ thể
router.get("/device/:deviceName", (req, res) => {
    const deviceName = req.params.deviceName;

    ActionHistory.getDevice(deviceName, (err, deviceStatus) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(deviceStatus);
    });
});

// GET: lấy lịch sử điều khiển thiết bị
router.get("/table", (req, res) => {
    const limit = parseInt(req.query.limit) || 100;

    ActionHistory.getData(limit, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

// GET: Lấy trạng thái tất cả LED
router.get("/devices/all", (req, res) => {
    const devices = ["led1", "led2", "led3"];
    let completed = 0;
    let results = {};

    devices.forEach(device => {
        ActionHistory.getDevice(device, (err, status) => {
            if (!err) {
                results[device] = status;
            }
            completed++;

            if (completed === devices.length) {
                res.json(results);
            }
        });
    });
});

// GET: Search với filter và pagination
router.get("/search", (req, res) => {
    let {
        deviceFilter = "ALL",
        actionFilter = "ALL",
        query = "",
        sortBy = "id",
        sortOrder = "desc",
        page = 1,
        limit = 50
    } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;

    // Validate sortOrder
    const validatedSortOrder = (sortOrder === "asc" || sortOrder === "ASC") ? "asc" : "desc";

    const params = {
        deviceFilter,
        actionFilter,
        query,
        sortBy,
        sortOrder: validatedSortOrder,
        page: pageNum,
        limit: limitNum
    };

    ActionHistory.searchActionHistory(params, (err, result) => {
        if (err) {
            console.error("Error in searchActionHistory:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(result);
    });
});

module.exports = router;