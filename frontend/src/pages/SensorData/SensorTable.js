import moment from 'moment';

function SensorTable({ data, filter }) {
    // Hàm format thời gian sử dụng moment.js
    const formatTime = (timeValue) => {
        try {
            // moment.js có thể tự động parse nhiều định dạng khác nhau
            const momentDate = moment(timeValue);

            // Kiểm tra moment có hợp lệ không
            if (!momentDate.isValid()) {
                // Thử parse với định dạng cụ thể nếu không tự động được
                const parsedDate = moment(timeValue, 'YYYY-MM-DD HH:mm:ss');
                if (parsedDate.isValid()) {
                    return parsedDate.format('YYYY-MM-DD HH:mm:ss');
                }
                return timeValue; // Trả về giá trị gốc nếu không parse được
            }

            // Format theo định dạng YYYY-MM-DD HH:mm:ss để dễ tìm kiếm
            return momentDate.format('YYYY-MM-DD HH:mm:ss');

        } catch (error) {
            console.error('Error formatting time with moment:', error);
            return timeValue; // Trả về giá trị gốc nếu có lỗi
        }
    };

    // ✅ FIXED: Luôn render đầy đủ 5 cột
    const renderTableHeader = () => {
        return (
            <tr>
                <th>ID</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Light (lx)</th>
                <th>Time</th>
            </tr>
        );
    };

    // ✅ FIXED: Luôn render đầy đủ 5 cột dữ liệu
    const renderTableRow = (row) => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.temperature !== null && row.temperature !== undefined ? row.temperature : "N/A"}</td>
                <td>{row.humidity !== null && row.humidity !== undefined ? row.humidity : "N/A"}</td>
                <td>{row.light !== null && row.light !== undefined ? row.light : "N/A"}</td>
                <td>{formatTime(row.time)}</td>
            </tr>
        );
    };

    return (
        <div className="card">
            <div className="card-body p-0">
                <table className="table mb-0 text-center align-middle">
                    <thead>
                        {renderTableHeader()}
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row) => renderTableRow(row))
                        ) : (
                            <tr>
                                <td colSpan={5}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SensorTable;