import moment from "moment";

function ActionTable({ data }) {
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

    return (
        <div className="card">
            <div className="card-body p-0">
                <table className="table mb-0 text-center align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Devices</th>
                            <th>Action</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            // FIXED: Bỏ filter ở đây vì đã filter ở ActionHistory
                            data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.device_name}</td>
                                    <td>{row.action}</td>
                                    <td>{formatTime(row.time)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ActionTable;