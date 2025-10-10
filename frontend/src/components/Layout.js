import Sidebar from "./Sidebar";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Components.css"; // Chỉ cần import 1 file CSS duy nhất

function Layout({ children }) {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 main-content">
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;