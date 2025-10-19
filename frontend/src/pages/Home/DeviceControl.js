import { useState, useEffect, useRef, createContext, useContext } from "react";

// 🔹 Context để share SSE connection
const SSEContext = createContext(null);

// 🔹 Provider để quản lý SSE connection duy nhất
function SSEProvider({ children }) {
    const [sseData, setSSEData] = useState(null);
    const eventSourceRef = useRef(null);

    useEffect(() => {
        console.log("🔌 Creating SSE connection...");
        const eventSource = new EventSource("http://localhost:5000/api/mqtt/stream");
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log("✅ SSE Connected!");
        };

        eventSource.onmessage = (event) => {
            // Skip comments (heartbeat, connected messages)
            if (event.data.startsWith(":")) return;

            try {
                const data = JSON.parse(event.data);
                console.log("📡 SSE Received:", data);
                setSSEData(data); // Broadcast to all subscribers
            } catch (err) {
                console.error("❌ SSE Parse error:", err);
            }
        };

        eventSource.onerror = (error) => {
            console.error("❌ SSE Connection error:", error);
        };

        return () => {
            console.log("🔌 Closing SSE connection");
            eventSource.close();
        };
    }, []);

    return (
        <SSEContext.Provider value={sseData}>
            {children}
        </SSEContext.Provider>
    );
}

function DeviceCard({ room, deviceName }) {
    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);
    const sseData = useContext(SSEContext); // 📡 Lắng nghe SSE data

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

    // 🔹 Lắng nghe SSE updates
    useEffect(() => {
        if (!sseData) return;

        // ✅ CHỈ CẬP NHẬT KHI ĐÚNG THIẾT BỊ
        if (sseData.device === deviceName) {
            console.log(`✅ [${deviceName}] Updating to: ${sseData.status}`);
            setIsOn(sseData.status === "on");
            setLoading(false);

            // Clear timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, [sseData, deviceName]);

    // 🔹 Xử lý toggle ON/OFF
    const handleToggle = async () => {
        if (loading) return;

        const newState = !isOn;
        const previousState = isOn;

        // ✅ Optimistic update
        setIsOn(newState);
        setLoading(true);

        // ⏱️ Timeout 5s
        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            setIsOn(previousState); // Revert
            alert(`⚠️ Timeout: ${deviceName} không phản hồi`);
        }, 5000);

        try {
            const res = await fetch("http://localhost:5000/api/actions/control", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    device_name: deviceName,
                    action: newState ? "on" : "off",
                }),
            });

            if (!res.ok) {
                throw new Error("Network error");
            }

            // Đợi ESP32 xác nhận qua SSE

        } catch (err) {
            console.error("Error sending command:", err);
            setIsOn(previousState); // Revert
            setLoading(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    };

    return (
        <div
            className={`light-card ${isOn ? "active" : ""}`}
            onClick={handleToggle}
            style={{ cursor: loading ? "wait" : "pointer" }}
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
        <SSEProvider>
            <div className="device-control-dashboard">
                <div className="cards-container">
                    <DeviceCard room="Living Room" deviceName="led1" />
                    <DeviceCard room="Bedroom" deviceName="led2" />
                    <DeviceCard room="Kitchen" deviceName="led3" />
                </div>
            </div>
        </SSEProvider>
    );
}

export default DeviceControl;