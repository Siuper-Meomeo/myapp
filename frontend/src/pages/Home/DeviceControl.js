import { useState, useEffect } from "react";

function DeviceCard({ room, deviceName, icon }) {
    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);

    // 🔹 Lấy trạng thái ban đầu từ backend
    useEffect(() => {
        const fetchState = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/actions/device/${deviceName}`);
                const data = await res.json();
                setIsOn(data.state === "on");
            } catch (err) {
                console.error("Error fetching device state:", err);
            }
        };
        fetchState();
    }, [deviceName]);

    // 🔹 Xử lý toggle ON/OFF
    const handleToggle = async () => {
        const newState = !isOn;
        setLoading(true); // bật spinner ngay khi click

        // Tạo controller để timeout nếu mất WiFi
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // sau 5s sẽ abort

        try {
            const res = await fetch("http://localhost:5000/api/actions/control", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    device_name: deviceName,
                    action: newState ? "on" : "off",
                }),
                signal: controller.signal, // truyền signal vào fetch
            });

            clearTimeout(timeout);

            if (!res.ok) throw new Error("Network error");

            // Nếu request thành công -> cập nhật trạng thái
            setIsOn(newState);
        } catch (err) {
            console.error("Error updating device state:", err);
            // rollback trạng thái cũ nếu lỗi
            setIsOn(isOn);
        } finally {
            setLoading(false); // luôn tắt spinner (kể cả lỗi hay thành công)
        }
    };

    return (
        <div
            className={`light-card ${isOn ? "active" : ""}`}
            onClick={!loading ? handleToggle : undefined}
        >
            <div className="light-icon">
                {loading ? (
                    <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ width: "2rem", height: "2rem" }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <svg viewBox="0 0 24 24">
                        <path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z" />
                    </svg>
                )}
            </div>
            <div className="light-name">{room}</div>
            <div className="device-name">{deviceName}</div>
            <div className="toggle-switch">
                <div className="toggle-slider"></div>
            </div>
            <div className="status-text">{isOn ? "on" : "off"}</div>
        </div>
    );
}

function DeviceControl() {
    return (
        <div className="device-control-dashboard">
            <div className="cards-container">
                <DeviceCard room="Living Room" deviceName="led1" />
                <DeviceCard room="Bedroom" deviceName="led2" />
                <DeviceCard room="Kitchen" deviceName="led3" />
            </div>
        </div>
    );
}

export default DeviceControl;
