import Layout from "../../components/Layout";
import "./Profile.css"; // file css riêng

function Profile() {
    return (
        <Layout>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-xl-11">{/* Tăng từ col-xl-10 thành col-xl-11 */}

                        <div className="card border-0 shadow-lg">
                            {/* Header với gradient */}
                            <div className="card-header text-white p-4" style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}>
                            </div>

                            <div className="card-body p-0">
                                <div className="row g-0">
                                    {/* Avatar Section */}
                                    <div className="col-lg-4">
                                        <div className="p-5 text-center border-end h-100">
                                            <div className="position-relative d-inline-block mb-4">
                                                <img
                                                    src="https://i.pinimg.com/736x/84/0e/35/840e35d0d6f4d84b66deb7b50cee5697.jpg"
                                                    alt="Student Avatar"
                                                    className="rounded-circle shadow"
                                                    style={{
                                                        width: '160px',
                                                        height: '160px',
                                                        objectFit: 'cover',
                                                        border: '6px solid #f8f9fa'
                                                    }}
                                                />
                                                <span
                                                    className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        border: '3px solid white'
                                                    }}
                                                ></span>
                                            </div>

                                            <h5 className="fw-bold mb-1">Nguyễn Tuyết Mai</h5>
                                            <p className="text-muted mb-4">Computer Science Student</p>

                                            {/* Quick Links */}
                                            <div className="d-grid gap-2">
                                                <a
                                                    href="https://drive.google.com/file/d/1Ce9BVbqJB-Us66AdfXHM07xox-F19TVS/view?usp=sharing"
                                                    className="btn btn-outline-danger btn-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-file-earmark-pdf me-2"></i>
                                                    View Report PDF
                                                </a>
                                                <a
                                                    href="https://github.com/Siuper-Meomeo?tab=repositories"
                                                    className="btn btn-outline-dark btn-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-github me-2"></i>
                                                    GitHub Profile
                                                </a>
                                                <a
                                                    href="https://documenter.getpostman.com/view/48286120/2sB3QKrpud"
                                                    className="btn btn-outline-success btn-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <i className="bi bi-file-earmark-text me-2"></i>
                                                    API Documentation
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Information Section */}
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <h5 className="fw-bold mb-4">
                                                <i className="bi bi-person-lines-fill me-2 text-primary"></i>
                                                Personal Information
                                            </h5>

                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label fw-semibold text-muted small mb-2">
                                                            FULL NAME
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-light border-end-0">
                                                                <i className="bi bi-person"></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control border-start-0 bg-light"
                                                                value="Nguyễn Tuyết Mai"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label fw-semibold text-muted small mb-2">
                                                            STUDENT ID
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-light border-end-0">
                                                                <i className="bi bi-card-text"></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control border-start-0 bg-light"
                                                                value="B22DCCN516"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label fw-semibold text-muted small mb-2">
                                                            CLASS
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-light border-end-0">
                                                                <i className="bi bi-mortarboard"></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control border-start-0 bg-light"
                                                                value="D22HTTT06"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label fw-semibold text-muted small mb-2">
                                                            EMAIL
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-light border-end-0">
                                                                <i className="bi bi-envelope"></i>
                                                            </span>
                                                            <input
                                                                type="email"
                                                                className="form-control border-start-0 bg-light"
                                                                value="MaiNT.B22CN516@ptit.edu.vn"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label fw-semibold text-muted small mb-2">
                                                            PHONE NUMBER
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-light border-end-0">
                                                                <i className="bi bi-telephone"></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control border-start-0 bg-light"
                                                                value="0328616530"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label fw-semibold text-muted small mb-2">
                                                            STATUS
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-light border-end-0">
                                                                <i className="bi bi-check-circle-fill text-success"></i>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control border-start-0 bg-light text-success fw-semibold"
                                                                value="Active Student"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats Cards */}
                                            <div className="row mt-5 g-3">
                                                <div className="col-4">
                                                    <div className="text-center p-3 bg-light rounded">
                                                        <div className="fs-4 fw-bold text-primary">4th</div>
                                                        <small className="text-muted">Year</small>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="text-center p-3 bg-light rounded">
                                                        <div className="fs-4 fw-bold text-success">IoT</div>
                                                        <small className="text-muted">Project</small>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="text-center p-3 bg-light rounded">
                                                        <div className="fs-4 fw-bold text-warning">2027</div>
                                                        <small className="text-muted">Graduate</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;