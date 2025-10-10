import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function SensorChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi 3 API song song
                const [tempRes, humRes, lightRes] = await Promise.all([
                    fetch("http://localhost:5000/api/sensors/chart/temperature?limit=10"),
                    fetch("http://localhost:5000/api/sensors/chart/humidity?limit=10"),
                    fetch("http://localhost:5000/api/sensors/chart/light?limit=10"),
                ]);

                const [temp, hum, light] = await Promise.all([
                    tempRes.json(),
                    humRes.json(),
                    lightRes.json(),
                ]);

                // Reverse data để giá trị mới nhất ở bên phải
                const labels = temp.reverse().map(d => {
                    const date = new Date(d.time);
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${hours}:${minutes}:${seconds}`;
                });

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Temperature (°C)",
                            data: temp.map(d => d.value),
                            borderColor: "#f97316",
                            backgroundColor: "#f97316",
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: "Humidity (%)",
                            data: hum.reverse().map(d => d.value),
                            borderColor: "#3b82f6",
                            backgroundColor: "#3b82f6",
                            tension: 0.4,
                            fill: false,
                        },
                        {
                            label: "Light (lx)",
                            data: light.reverse().map(d => d.value),
                            borderColor: "#22c55e",
                            backgroundColor: "#22c55e",
                            tension: 0.4,
                            fill: false,
                        },
                    ],
                });
            } catch (err) {
                console.error("Error fetching chart data:", err);
            }
        };

        fetchData();

        // Tự động cập nhật mỗi 5s
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <div className="mb-4 p-3 rounded bg-white shadow-sm">
            <h6 className="fw-bold mb-2">Sensor Data Chart</h6>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                    scales: {
                        x: { grid: { display: false } },
                        y: {
                            beginAtZero: true,
                            max: 1000
                        },
                    },
                }}
                height={120}
            />
        </div>
    );
}

export default SensorChart;