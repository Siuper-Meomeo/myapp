function Header() {
    return (
        <header className="header-container">
            <div className="container-fluid">
                <div className="row align-items-center py-3">
                    {/* User Info */}
                    <div className="col-md-6">
                        <div className="d-flex align-items-center">
                            <div className="user-avatar me-3">
                                <img
                                    src="https://i.pinimg.com/736x/bb/0b/56/bb0b5630d4a59964ee2fc38804299b50.jpg"
                                    className="rounded-circle"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </div>
                            <div>
                                <h5 className="mb-0 fw-bold">Tuyết Mai</h5>
                            </div>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="col-md-6">
                        <div className="d-flex justify-content-end align-items-center">
                            {/* Notification */}
                            <button className="btn btn-link text-muted me-3">
                                <i className="bi bi-bell fs-5"></i>
                            </button>

                            {/* Settings */}
                            <button className="btn btn-link text-muted me-3">
                                <i className="bi bi-gear fs-5"></i>
                            </button>

                            {/* Menu */}
                            <button className="btn btn-link text-muted">
                                <i className="bi bi-three-dots-vertical fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
