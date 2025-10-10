function SensorSearch({
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    onSearch
}) {
    return (
        <div className="search-container mb-4">
            <div className="d-flex gap-3 align-items-center">
                {/* Sensor Filter Dropdown */}
                <select
                    className="form-select shadow-sm"
                    style={{
                        maxWidth: '200px',
                        borderRadius: '25px',
                        padding: '0.5rem 1rem'
                    }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="ALL">ALL SENSORS</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="light">Light</option>
                </select>

                {/* Sort Order Dropdown */}
                <select
                    className="form-select shadow-sm"
                    style={{
                        maxWidth: '220px',
                        borderRadius: '25px',
                        padding: '0.5rem 1rem'
                    }}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="desc">Descending (High → Low)</option>
                    <option value="asc">Ascending (Low → High)</option>
                </select>

                {/* Search Input */}
                <div className="flex-grow-1">
                    <input
                        type="text"
                        className="form-control shadow-sm"
                        style={{
                            borderRadius: '25px',
                            padding: '0.5rem 1.5rem'
                        }}
                        placeholder="Search by date, time or datetime..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && onSearch) {
                                onSearch();
                            }
                        }}
                    />
                </div>

                {/* Search Button */}
                <button
                    className="btn btn-primary shadow-sm"
                    type="button"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => {
                        if (onSearch) {
                            onSearch();
                        }
                    }}
                >
                    <i className="bi bi-search" style={{ fontSize: '1.2rem' }}></i>
                </button>
            </div>
        </div>
    );
}

export default SensorSearch;