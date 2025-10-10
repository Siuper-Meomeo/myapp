import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SensorData from "./pages/SensorData/SensorData";
import ActionHistory from "./pages/ActionHistory/ActionHistory";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/data" element={<SensorData />} />
                <Route path="/history" element={<ActionHistory />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
