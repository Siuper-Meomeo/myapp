import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Đăng nhập thất bại");
            } else {
                setMessage("Đăng nhập thành công");
                console.log("User:", data.user);

                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }
        } catch (err) {
            setMessage("Lỗi kết nối server");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <p className="welcome-text">
                    Welcome to <span className="iot-text">IoT System</span>
                </p>
                <h2 className="login-title">Log in</h2>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="mb-3">
                        <label className="form-label">Enter your username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Enter your Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-login">
                        Continue
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
