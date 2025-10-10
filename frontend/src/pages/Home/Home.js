import Layout from "../../components/Layout";
import "./Home.css";
import WelcomeCard from "./WelcomeCard";
import SensorChart from "./SensorChart";
import DeviceControl from "./DeviceControl";
import SensorCards from "./SensorCards";

function Home() {
    return (
        <Layout>
            <div className="row g-2">
                {/* Khối trên: Welcome+Chart + SensorCards */}
                <div className="col-12 d-flex top-section">
                    <div className="col-lg-8 pe-2">
                        <div className="card p-2 h-85">
                            <WelcomeCard />
                            <SensorChart />
                        </div>
                    </div>
                    <div className="col-lg-4 ps-1">
                        {/* Bỏ card wrapper, chỉ để SensorCards */}
                        <SensorCards />
                    </div>
                </div>

                {/* Khối dưới: Device Control, cao bằng khối trên */}
                <div className="col-12">
                    <div className="card device-control-wrapper h-100">
                        <DeviceControl />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;