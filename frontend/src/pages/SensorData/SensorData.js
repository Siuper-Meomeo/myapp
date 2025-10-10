import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout";
import SensorSearch from "./SensorSearch";
import SensorTable from "./SensorTable";
import SensorPagination from "./SensorPagination";
import "./SensorData.css";

function SensorData() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRows, setTotalRows] = useState(0); // Thêm totalRows
    const [loading, setLoading] = useState(false);

    // fetchData tách ra để tái sử dụng
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Xác định cột sort dựa trên filter được chọn
            let sortByColumn;
            if (filter === "ALL") {
                sortByColumn = "id"; // Nếu ALL thì sort theo ID
            } else {
                sortByColumn = filter; // Nếu chọn temperature/humidity/light thì sort theo cột đó
            }

            const params = new URLSearchParams({
                field: filter,
                query: searchQuery,
                sortBy: sortByColumn,
                sortOrder: sortOrder,
                page: currentPage,
                limit: rowsPerPage
            });

            console.log("Sort logic - Filter:", filter, "SortBy:", sortByColumn, "SortOrder:", sortOrder);

            const url = `http://localhost:5000/api/sensors/search?${params}`;
            console.log("Fetching:", url);

            const res = await fetch(url);
            const json = await res.json();

            console.log("API Response:", json); // Debug log

            if (json.data && json.pagination) {
                setData(json.data);
                setTotalPages(json.pagination.totalPages);
                setTotalRows(json.pagination.totalRows);
            } else {
                console.error("Invalid API response format:", json);
                setData([]);
                setTotalPages(1);
                setTotalRows(0);
            }
        } catch (err) {
            console.error("Error fetching sensor data:", err);
            setData([]);
            setTotalPages(1);
            setTotalRows(0);
        } finally {
            setLoading(false);
        }
    }, [filter, searchQuery, sortOrder, currentPage, rowsPerPage]);

    // gọi API khi thay đổi điều kiện
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handler cho page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handler cho rows per page change
    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset về trang 1
    };

    return (
        <Layout>
            <div className="container-custom">
                <h2 className="fw-bold mb-4">Sensor Data</h2>

                <SensorSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filter={filter}
                    setFilter={setFilter}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    onSearch={() => {
                        setCurrentPage(1); // Reset về trang 1 khi search
                        fetchData();
                    }}
                />

                <SensorTable
                    data={data}
                    filter={filter}
                    searchQuery={searchQuery}
                    loading={loading}
                />

                <SensorPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalRows} // Thêm totalRows
                    rowsPerPage={rowsPerPage}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={handleRowsPerPageChange}
                    onPageChange={handlePageChange}
                />
            </div>
        </Layout>
    );
}

export default SensorData;