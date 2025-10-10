import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar-container">
            {/* Logo và Title */}
            <div className="sidebar-header text-center py-3">
                <div className="logo-container mb-2">
                    <i className="bi bi-house-fill text-white"></i>
                </div>
                <h5 className="text-white fw-bold mb-0">SMART HOME</h5>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-nav">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            <i className="bi bi-grid-3x3-gap-fill me-3"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/data"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            <i className="bi bi-bar-chart-fill me-3"></i>
                            <span>Data Sensor</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            <i className="bi bi-tv me-3"></i>
                            <span>Action History</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            <i className="bi bi-person-circle me-3"></i>
                            <span>Profile</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
