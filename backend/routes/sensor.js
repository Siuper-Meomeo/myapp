// routes/sensorRoutes.js
const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData");

// API cho chart (1 loại sensor)
router.get("/chart/:type", (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const type = req.params.type; // "temperature", "humidity", "light"

    SensorData.getDataForChart(type, limit, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        // dữ liệu từ DB đã ORDER BY id DESC
        // nếu muốn chart hiển thị trái → phải theo thời gian tăng dần thì reverse ở đây
        res.json(data); // giữ nguyên: ID giảm dần
    });
});

// API: Lấy dữ liệu cảm biến mới nhất
router.get("/latest", (req, res) => {
    SensorData.getLatestSensorData((err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(data);
    });
});

// API cho bảng dữ liệu (cả 3 loại sensor)
router.get("/table", (req, res) => {
    const limit = parseInt(req.query.limit) || 100;

    SensorData.getMergedData(limit, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        // dữ liệu đã ORDER BY id DESC trong models
        res.json(data); // giữ nguyên: ID giảm dần
    });
});

router.get("/search", (req, res) => {

    // Sửa lại để match với model function
    let { field = "ALL", query = "", sortBy = "id", sortOrder = "desc", page = 1, limit = 50 } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;

    // Validate sortOrder
    const validatedSortOrder = (sortOrder === "asc" || sortOrder === "ASC") ? "asc" : "desc";

    const params = {
        field,
        query,
        sortBy,           // Thay đổi từ 'sort' thành 'sortBy'
        sortOrder: validatedSortOrder,  // Thay đổi từ 'sort' thành 'sortOrder'
        page: pageNum,
        limit: limitNum
    };


    SensorData.searchSensorData(params, (err, result) => {
        if (err) {
            console.error("Error in searchSensorData:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json(result);
    });
});

module.exports = router;