function ActionSearch({
    searchQuery,
    setSearchQuery,
    deviceFilter,
    setDeviceFilter,
    actionFilter,
    setActionFilter
}) {
    return (
        <div className="search-container mb-4">
            <div className="d-flex gap-3 align-items-center">
                {/* Device Filter Dropdown */}
                <select
                    className="form-select shadow-sm"
                    style={{
                        maxWidth: '200px',
                        borderRadius: '25px',
                        padding: '0.5rem 1rem'
                    }}
                    value={deviceFilter}
                    onChange={(e) => setDeviceFilter(e.target.value)}
                >
                    <option value="ALL">ALL DEVICES</option>
                    <option value="led1">LED 1</option>
                    <option value="led2">LED 2</option>
                    <option value="led3">LED 3</option>
                </select>

                {/* Action Filter Dropdown */}
                <select
                    className="form-select shadow-sm"
                    style={{
                        maxWidth: '180px',
                        borderRadius: '25px',
                        padding: '0.5rem 1rem'
                    }}
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                >
                    <option value="ALL">ALL ACTIONS</option>
                    <option value="on">ON</option>
                    <option value="off">OFF</option>
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
                        // Trigger search (optional, vì đã auto search khi thay đổi)
                    }}
                >
                    <i className="bi bi-search" style={{ fontSize: '1.2rem' }}></i>
                </button>
            </div>
        </div>
    );
}

export default ActionSearch;