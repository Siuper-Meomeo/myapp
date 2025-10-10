import { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import ActionSearch from "./ActionSearch";
import ActionTable from "./ActionTable";
import ActionPagination from "./ActionPagination";
import "./ActionHistory.css";

function ActionHistory() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [deviceFilter, setDeviceFilter] = useState("ALL");
    const [actionFilter, setActionFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    // Track filter changes để reset page
    const prevFiltersRef = useRef({ searchQuery, deviceFilter, actionFilter, rowsPerPage });

    // Fetch data từ API /search
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    deviceFilter,
                    actionFilter,
                    query: searchQuery.trim(),
                    sortBy: "id",
                    sortOrder: "desc",
                    page: currentPage,
                    limit: rowsPerPage
                });

                const res = await fetch(`http://localhost:5000/api/actions/search?${params}`);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const json = await res.json();

                setData(json.data || []);
                setTotalRecords(json.pagination?.totalRows || json.total || 0);
            } catch (err) {
                console.error("Error fetching action data:", err);
                setData([]);
                setTotalRecords(0);
            } finally {
                setLoading(false);
            }
        };

        // Kiểm tra xem filter có thay đổi không
        const prevFilters = prevFiltersRef.current;
        const filtersChanged =
            prevFilters.searchQuery !== searchQuery ||
            prevFilters.deviceFilter !== deviceFilter ||
            prevFilters.actionFilter !== actionFilter ||
            prevFilters.rowsPerPage !== rowsPerPage;

        // Nếu filter thay đổi và không phải đang ở trang 1 → reset về trang 1
        if (filtersChanged && currentPage !== 1) {
            setCurrentPage(1);
            // Update ref nhưng KHÔNG gọi API (sẽ gọi khi currentPage update)
            prevFiltersRef.current = { searchQuery, deviceFilter, actionFilter, rowsPerPage };
        } else {
            // Nếu không có thay đổi filter hoặc đã ở trang 1 → gọi API
            fetchData();
            prevFiltersRef.current = { searchQuery, deviceFilter, actionFilter, rowsPerPage };
        }
    }, [searchQuery, deviceFilter, actionFilter, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    return (
        <Layout>
            <div className="container-custom">
                <h2 className="fw-bold mb-4">Action History</h2>

                <ActionSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    deviceFilter={deviceFilter}
                    setDeviceFilter={setDeviceFilter}
                    actionFilter={actionFilter}
                    setActionFilter={setActionFilter}
                />

                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted mt-3">Loading action history...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center my-5">
                        <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                        <p className="text-muted mt-3">No actions found</p>
                    </div>
                ) : (
                    <>
                        <ActionTable data={data} />
                        <ActionPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            rowsPerPage={rowsPerPage}
                            totalRecords={totalRecords}
                            setCurrentPage={setCurrentPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </>
                )}
            </div>
        </Layout>
    );
}

export default ActionHistory;