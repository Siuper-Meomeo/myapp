// models/sensorData.js
const db = require("../services/db"); // file db.js đã có sẵn kết nối mysql2

// Lấy N bản ghi gần nhất (để hiển thị chart 1 loại sensor)
function getDataForChart(column, limit = 5, callback) {
    const allowedCols = ["temperature", "humidity", "light"]; // tránh SQL injection
    if (!allowedCols.includes(column)) {
        return callback(new Error("Invalid column name"));
    }

    const sql = `
        SELECT id, ${column} AS value, created_at AS time
        FROM sensor_data
        ORDER BY id DESC
        LIMIT ?;
    `;

    db.query(sql, [limit], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

// Lấy bản ghi mới nhất từ sensor_data
function getLatestSensorData(callback) {
    const sql = `
        SELECT 
            temperature,
            humidity,
            light,
            created_at
        FROM sensor_data
        ORDER BY created_at DESC
        LIMIT 1
    `;

    db.query(sql, (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) {
            return callback(null, {
                temperature: null,
                humidity: null,
                light: null,
                created_at: null
            });
        }
        callback(null, results[0]);
    });
}

// Lấy N bản ghi gần nhất gồm cả 3 loại sensor (dùng cho bảng hiển thị)
function getMergedData(limit = 100, callback) {
    const sql = `
        SELECT 
            id,
            temperature,
            humidity,
            light,
            created_at AS time
        FROM sensor_data
        ORDER BY id DESC
        LIMIT ?;
    `;

    db.query(sql, [limit], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

// Tìm kiếm + lọc + sắp xếp + phân trang - KHÔNG GIỚI HẠN SỐ BẢN GHI
function searchSensorData({ field, query, sortBy, sortOrder, page, limit }, callback) {
    const allowedFields = ["temperature", "humidity", "light", "ALL"];
    const allowedSortCols = ["id", "temperature", "humidity", "light", "created_at"];

    if (!allowedFields.includes(field)) {
        return callback(new Error("Invalid field name"));
    }

    const sortColumn = allowedSortCols.includes(sortBy) ? sortBy : "id";
    const sortDirection = (sortOrder === "asc" || sortOrder === "ASC") ? "ASC" : "DESC";
    const offset = (page - 1) * limit;

    let sqlData, sqlCount;
    let paramsCount = [], paramsData = [];

    if (field !== "ALL") {
        // Query cho một trường cụ thể
        sqlData = `
            SELECT 
                id, 
                ${field} AS value, 
                temperature,
                humidity, 
                light,
                created_at AS time
            FROM sensor_data
            WHERE ${field} IS NOT NULL`;

        sqlCount = `
            SELECT COUNT(*) AS total
            FROM sensor_data
            WHERE ${field} IS NOT NULL`;

        if (query && query.trim() !== '') {
            const searchCondition = ` AND (
                ${field} LIKE ? OR 
                DATE_FORMAT(created_at, '%Y-%m-%d') LIKE ? OR 
                DATE_FORMAT(created_at, '%H:%i:%s') LIKE ? OR
                DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') LIKE ?
            )`;

            sqlData += searchCondition;
            sqlCount += searchCondition;

            const likeQuery = `%${query.trim()}%`;
            paramsCount.push(likeQuery, likeQuery, likeQuery, likeQuery);
            paramsData.push(likeQuery, likeQuery, likeQuery, likeQuery);
        }

        sqlData += ` ORDER BY ${sortColumn} ${sortDirection} LIMIT ? OFFSET ?`;
        paramsData.push(limit, offset);
    } else {
        // Trường hợp ALL
        sqlData = `
            SELECT 
                id, 
                temperature, 
                humidity, 
                light, 
                created_at AS time
            FROM sensor_data
            WHERE 1=1`;

        sqlCount = `
            SELECT COUNT(*) AS total
            FROM sensor_data
            WHERE 1=1`;

        if (query && query.trim() !== '') {
            const searchCondition = ` AND (
                temperature LIKE ? OR 
                humidity LIKE ? OR 
                light LIKE ? OR
                DATE_FORMAT(created_at, '%Y-%m-%d') LIKE ? OR 
                DATE_FORMAT(created_at, '%H:%i:%s') LIKE ? OR
                DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') LIKE ?
            )`;

            sqlData += searchCondition;
            sqlCount += searchCondition;

            const likeQuery = `%${query.trim()}%`;
            paramsCount.push(likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery);
            paramsData.push(likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery);
        }

        sqlData += ` ORDER BY ${sortColumn} ${sortDirection} LIMIT ? OFFSET ?`;
        paramsData.push(limit, offset);
    }

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
    getDataForChart,
    getLatestSensorData,
    getMergedData,
    searchSensorData
};