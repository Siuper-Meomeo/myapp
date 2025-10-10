const express = require("express");
const bcrypt = require("bcryptjs");  // dùng bcryptjs
const router = express.Router();

// 📌 Login API
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const db = req.app.locals.db;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error("❌ DB error:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        const user = results[0];

        try {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ success: false, message: "Invalid username or password" });
            }

            res.json({
                success: true,
                message: "Login successful",
                user: { id: user.id, username: user.username, email: user.email }
            });
        } catch (compareErr) {
            console.error(compareErr);
            res.status(500).json({ message: "Error while checking password" });
        }
    });
});

module.exports = router;
