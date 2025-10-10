function SensorPagination({ currentPage, totalPages, rowsPerPage, setCurrentPage, setRowsPerPage }) {
    // Hàm tạo danh sách trang THÔNG MINH
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // Số trang tối đa hiển thị (không tính đầu/cuối)

        if (totalPages <= maxVisible + 2) {
            // Nếu ít trang, hiển thị hết
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Luôn thêm trang 1
            pages.push(1);

            // Tính toán range xung quanh current page
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Đảm bảo luôn có đủ maxVisible trang
            if (currentPage <= 3) {
                endPage = maxVisible;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - maxVisible + 1;
            }

            // Thêm dấu "..." nếu cần
            if (startPage > 2) {
                pages.push('...');
            }

            // Thêm các trang ở giữa
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Thêm dấu "..." nếu cần
            if (endPage < totalPages - 1) {
                pages.push('...');
            }

            // Luôn thêm trang cuối
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="card-footer d-flex justify-content-between align-items-center">
            <nav>
                <ul className="pagination mb-0">
                    {/* Nút prev */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                    </li>

                    {/* Các số trang */}
                    {getPageNumbers().map((page, index) => {
                        // Xử lý dấu "..."
                        if (page === '...') {
                            return (
                                <li key={`ellipsis-${index}`} className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            );
                        }

                        return (
                            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                                <button className="page-link" onClick={() => setCurrentPage(page)}>
                                    {page}
                                </button>
                            </li>
                        );
                    })}

                    {/* Nút next */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Chọn rowsPerPage */}
            <div>
                <select
                    className="form-select form-select-sm"
                    value={rowsPerPage}
                    onChange={(e) => {
                        const newSize = Number(e.target.value);
                        setRowsPerPage(newSize);
                        setCurrentPage(1); // Reset về trang 1
                    }}
                >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={30}>30 / page</option>
                    <option value={50}>50 / page</option>
                </select>
            </div>
        </div>
    );
}

export default SensorPagination;