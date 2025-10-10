import { useEffect, useState } from "react";

function SensorCards() {
    const [sensorData, setSensorData] = useState({
        temperature: null,
        humidity: null,
        light: null,
    });

    // Fetch dữ liệu từ backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/sensors/latest");
                const data = await res.json();
                setSensorData(data);
            } catch (err) {
                console.error("Error fetching sensor data:", err);
            }
        };

        fetchData();

        // Tự động cập nhật mỗi 5s
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    // Hàm xác định class CSS và icon cho temperature
    const getTemperatureClass = (temp) => {
        if (temp === null) return "text-muted";
        if (temp < 10) return "temp-cold";
        if (temp >= 10 && temp < 20) return "temp-cool";
        if (temp >= 20 && temp < 30) return "temp-warm";
        if (temp >= 30 && temp < 40) return "temp-hot";
        return "temp-extreme"; // >= 40
    };

    const getTemperatureIcon = (temp) => {
        if (temp === null) return "bi-thermometer";
        if (temp < 15) return "bi-thermometer-snow";
        if (temp >= 15 && temp < 25) return "bi-thermometer-half";
        return "bi-thermometer-sun";
    };

    // Hàm xác định class CSS và icon cho humidity
    const getHumidityClass = (humidity) => {
        if (humidity === null) return "text-muted";
        if (humidity < 30) return "humidity-low";
        if (humidity >= 30 && humidity < 60) return "humidity-normal";
        if (humidity >= 60 && humidity < 80) return "humidity-high";
        return "humidity-extreme"; // >= 80
    };

    const getHumidityIcon = (humidity) => {
        if (humidity === null) return "bi-cloud";
        if (humidity < 30) return "bi-cloud-sun";
        if (humidity >= 30 && humidity < 70) return "bi-cloud-drizzle";
        return "bi-cloud-rain";
    };

    // Hàm xác định class CSS và icon cho light
    const getLightClass = (light) => {
        if (light === null) return "text-muted";
        if (light < 100) return "light-dark";
        if (light >= 100 && light < 500) return "light-dim";
        if (light >= 500 && light < 1000) return "light-normal";
        if (light >= 1000 && light < 2000) return "light-bright";
        return "light-intense"; // >= 2000
    };

    const getLightIcon = (light) => {
        if (light === null) return "bi-moon";
        if (light < 100) return "bi-moon-stars";
        if (light >= 100 && light < 500) return "bi-cloud-sun";
        if (light >= 500 && light < 1000) return "bi-sun";
        return "bi-brightness-high";
    };

    return (
        <div className="d-flex flex-column gap-4">
            {/* Temperature */}
            <div className="p-3 sensor-card temperature-card">
                <h6 className="fw-bold mb-2 text-start">Temperature</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <div className={`sensor-icon ${getTemperatureClass(sensorData.temperature)}`}>
                        <i className={`${getTemperatureIcon(sensorData.temperature)} fs-3`}></i>
                    </div>
                    <h5 className="mb-0">
                        {sensorData.temperature !== null ? `${sensorData.temperature}°C` : "--"}
                    </h5>
                </div>
            </div>

            {/* Humidity */}
            <div className="p-3 sensor-card humidity-card">
                <h6 className="fw-bold mb-2 text-start">Humidity</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <div className={`sensor-icon ${getHumidityClass(sensorData.humidity)}`}>
                        <i className={`${getHumidityIcon(sensorData.humidity)} fs-3`}></i>
                    </div>
                    <h5 className="mb-0">
                        {sensorData.humidity !== null ? `${sensorData.humidity}%` : "--"}
                    </h5>
                </div>
            </div>

            {/* Light */}
            <div className="p-3 sensor-card lightlevel-card">
                <h6 className="fw-bold mb-2 text-start">Light Level</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <div className={`sensor-icon ${getLightClass(sensorData.light)}`}>
                        <i className={`${getLightIcon(sensorData.light)} fs-3`}></i>
                    </div>
                    <h5 className="mb-0">
                        {sensorData.light !== null ? `${sensorData.light} lx` : "--"}
                    </h5>
                </div>
            </div>
        </div>
    );

}

export default SensorCards;