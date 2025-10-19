// models/ActionHistory.js
const db = require("../services/db");

// Lấy trạng thái hiện tại của 1 thiết bị (giữ nguyên logic cũ)
function getDevice(deviceName, callback) {
    const sql = `
        SELECT action, created_at
        FROM device_control 
        WHERE device_name = ? 
        ORDER BY created_at DESC 
        LIMIT 1
    `;
    db.query(sql, [deviceName], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(null, {
                device_name: deviceName,
                state: "OFF",
                last_updated: null
            });
        }
        callback(null, {
            device_name: deviceName,
            state: results[0].action,
            last_updated: results[0].created_at
        });
    });
}

// ✅ Lấy toàn bộ dữ liệu (bỏ giới hạn 100 bản ghi)
function getData(callback) {
    const sql = `
        SELECT 
            id,
            device_name,
            action,
            created_at AS time
        FROM device_control
        ORDER BY id DESC;
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

// ✅ Tìm kiếm + lọc + sắp xếp + phân trang KHÔNG GIỚI HẠN
function searchActionHistory({ deviceFilter, actionFilter, query, sortBy, sortOrder, page, limit }, callback) {

    const allowedDevices = ["ALL", "led1", "led2", "led3"];
    const allowedActions = ["ALL", "on", "off"];
    const allowedSortCols = ["id", "device_name", "action", "created_at"];

    // Validation
    if (!allowedDevices.includes(deviceFilter)) {
        return callback(new Error("Invalid device filter"));
    }
    if (!allowedActions.includes(actionFilter)) {
        return callback(new Error("Invalid action filter"));
    }

    const sortColumn = allowedSortCols.includes(sortBy) ? sortBy : "id";
    const sortDirection = (sortOrder === "asc" || sortOrder === "ASC") ? "ASC" : "DESC";

    const offset = (page - 1) * limit;
    let sqlData, sqlCount;
    let paramsCount = [], paramsData = [];

    // ✅ KHÔNG DÙNG subquery giới hạn 100 bản ghi nữa
    sqlData = `
        SELECT 
            id,
            device_name,
            action,
            created_at AS time
        FROM device_control
        WHERE 1=1`;

    sqlCount = `
        SELECT COUNT(*) AS total
        FROM device_control
        WHERE 1=1`;

    // 1. Lọc theo device_name
    if (deviceFilter !== "ALL") {
        const deviceCondition = ` AND device_name = ?`;
        sqlData += deviceCondition;
        sqlCount += deviceCondition;
        paramsCount.push(deviceFilter);
        paramsData.push(deviceFilter);
    }

    // 2. Lọc theo action (ON/OFF)
    if (actionFilter !== "ALL") {
        const actionCondition = ` AND action = ?`;
        sqlData += actionCondition;
        sqlCount += actionCondition;
        paramsCount.push(actionFilter);
        paramsData.push(actionFilter);
    }

    // 3. Tìm kiếm string cho ngày hoặc giờ
    if (query && query.trim() !== '') {
        const searchCondition = ` AND (
            DATE_FORMAT(created_at, '%Y-%m-%d') LIKE ? OR 
            DATE_FORMAT(created_at, '%H:%i:%s') LIKE ? OR
            DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') LIKE ?
        )`;

        sqlData += searchCondition;
        sqlCount += searchCondition;

        const likeQuery = `%${query.trim()}%`;
        paramsCount.push(likeQuery, likeQuery, likeQuery);
        paramsData.push(likeQuery, likeQuery, likeQuery);
    }

    // ORDER BY và phân trang
    sqlData += ` ORDER BY ${sortColumn} ${sortDirection} LIMIT ? OFFSET ?`;
    paramsData.push(limit, offset);

    // Query count
    db.query(sqlCount, paramsCount, (err, countResult) => {
        if (err) return callback(err);

        const totalRows = countResult[0].total;
        const totalPages = Math.ceil(totalRows / limit);

        // Query data
        db.query(sqlData, paramsData, (err, results) => {
            if (err) {
                console.error("SQL Error:", err);
                return callback(err);
            }

            callback(null, {
                data: results,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalRows,
                    limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            });
        });
    });
}

module.exports = {
    getData,
    getDevice,
    searchActionHistory
};
