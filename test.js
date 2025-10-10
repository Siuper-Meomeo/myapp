import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Chart from "chart.js/auto";

function Home() {
useEffect(() => {
const ctx = document.getElementById("sensorChart");
if (ctx) {
new Chart(ctx, {
type: "line",
data: {
labels: ["10:30", "11:00", "11:15", "11:30", "11:45"],
datasets: [
{ label: "Sensor 1", data: [10, 20, 50, 40, 5], borderColor: "#ff6b6b", fill: false, tension: 0.4 },
{ label: "Sensor 2", data: [5, 15, 35, 60, 20], borderColor: "#ffa502", fill: false, tension: 0.4 },
{ label: "Sensor 3", data: [12, 18, 20, 25, 15], borderColor: "#3742fa", fill: false, tension: 0.4 }
]
},
options: { plugins: { legend: { display: false } } }
});
}
}, []);

return (
<>
    {/* Custom CSS giữ nguyên từ file gốc */}
    <style>
        {
            ` body {
                background: #f4f6fb;
                font-family: 'Segoe UI', sans-serif;
            }

            .sidebar {
                height: 100vh;
                background: linear-gradient(180deg, #2e1b7b, #16005c);
                color: #fff;
                position: fixed;
                width: 220px;
                top: 0;
                left: 0;
                padding: 20px 10px;
            }

            .sidebar h5 {
                font-weight: 600;
                margin-bottom: 30px;
            }

            .sidebar .nav-link {
                color: #ccc;
                font-weight: 500;
                border-radius: 10px;
                margin-bottom: 10px;
                transition: 0.3s;
            }

            .sidebar .nav-link.active,
            .sidebar .nav-link:hover {
                background: rgba(255, 255, 255, 0.15);
                color: #fff;
            }

            .main-content {
                margin-left: 240px;
                padding: 20px;
            }

            .card {
                border: none;
                border-radius: 18px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            .welcome-card {
                background: url('https://i.ibb.co/3d5RVfS/night-mountain.jpg') no-repeat center/cover;
                color: #fff;
                border-radius: 18px;
                padding: 25px;
            }

            .device-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
            }

            .door-img {
                border-radius: 12px;
                object-fit: cover;
                width: 100%;
                height: 150px;
                position: relative;
            }

            .door-status {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: #fff;
                border-radius: 50%;
                padding: 6px 10px;
            }

            .sensor-card h2 {
                font-weight: 700;
                margin-top: 10px;
            }

            `
        }
    </style>

    <div className="container-fluid">
        <div className="row">
            {/* Sidebar */}
            <div className="col-md-2 sidebar d-flex flex-column">
                <h5><i className="bi bi-house-fill me-2"></i>SMART HOME</h5>
                <nav className="nav flex-column">
                    <a href="#" className="nav-link active"><i className="bi bi-house-door-fill me-2"></i>Home</a>
                    <a href="#" className="nav-link"><i className="bi bi-bar-chart-line-fill me-2"></i>Data Sensor</a>
                    <a href="#" className="nav-link"><i className="bi bi-clock-history me-2"></i>Action History</a>
                    <a href="#" className="nav-link"><i className="bi bi-person-fill me-2"></i>Profile</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="col-md-10 main-content">
                {/* Header */}
                <div className="d-flex align-items-center mb-4">
                    <img src="https://i.pravatar.cc/80?img=5" className="rounded-circle me-3" width="50" height="50"
                        alt="avatar" />
                    <h5 className="mb-0 fw-bold">Tuyết Mai</h5>
                </div>

                <div className="row g-4">
                    {/* Left big column */}
                    <div className="col-lg-8">
                        <div className="card p-3 h-100">

                            {/* Welcome */}
                            <div className="welcome-card mb-4">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5>Hi, Tuyết Mai! Good Evening...</h5>
                                        <p className="mb-0 small">Welcome Home, it’s snowing outside. Stay safe</p>
                                    </div>
                                    <div className="text-end">
                                        <small>12 May 2022</small><br />
                                        <strong>10:23 PM</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-2">Sensor Data Chart</h6>
                                <canvas id="sensorChart" height="120"></canvas>
                            </div>

                            <div className="row g-3">
                                {/* Devices */}
                                <div className="col-md-6">
                                    <div className="bg-light rounded p-3 h-100">
                                        <h6 className="fw-bold mb-3">Devices</h6>
                                        <div className="device-item">
                                            <span><i className="bi bi-lightbulb-fill text-warning me-2"></i> LED</span>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </div>
                                        <div className="device-item">
                                            <span><i className="bi bi-fan text-primary me-2"></i> Fan</span>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                            </div>
                                        </div>
                                        <div className="device-item">
                                            <span><i className="bi bi-wind me-2"></i> Air Conditioner</span>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Doors */}
                                <div className="col-md-6">
                                    <div className="bg-light rounded p-3 h-100">
                                        <h6 className="fw-bold mb-3">Doors</h6>
                                        <div className="row g-2">
                                            <div className="col-6 position-relative">
                                                <img src="https://i.ibb.co/YfQXrLg/front-door.jpg" className="door-img"
                                                    alt="front door" />
                                                <div className="door-status">
                                                    <i className="bi bi-unlock-fill text-success fs-5"></i>
                                                </div>
                                            </div>
                                            <div className="col-6 position-relative">
                                                <img src="https://i.ibb.co/tBZPp3V/back-door.jpg" className="door-img"
                                                    alt="back door" />
                                                <div className="door-status">
                                                    <i className="bi bi-lock-fill text-danger fs-5"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right column: Sensors */}
                    <div className="col-lg-4 d-flex flex-column">
                        <div className="card p-3 mb-3 text-center flex-fill sensor-card">
                            <h6 className="fw-bold">Temperature</h6>
                            <h2>+2°C</h2>
                        </div>
                        <div className="card p-3 mb-3 text-center flex-fill sensor-card">
                            <h6 className="fw-bold">Humidity</h6>
                            <h2>30%</h2>
                        </div>
                        <div className="card p-3 text-center flex-fill sensor-card">
                            <h6 className="fw-bold">Light Level</h6>
                            <h2>300 lx</h2>
                            <i className="bi bi-brightness-high text-warning fs-3"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</>
);
}

export default Home;