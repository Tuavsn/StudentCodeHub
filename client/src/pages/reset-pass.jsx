import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/studentcodehub_logo.png';

const ResetPass = () => {

    const initialState = { email: "" }
    const [userData, setUserData] = useState(initialState)
    const { email } = userData
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        setErrors({ ...errors, [name]: "" });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra validation
        let errors = {};
        if (!email) {
            errors.email = "Vui lòng nhập email của bạn";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email không hợp lệ";
        }

        if (Object.keys(errors).length === 0) {
            navigate("/otp-confirmation", { state: { email: email, otp_type: "RESET_PASSWORD", userData: null } })
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setErrors(errors);
        }
    }

    return (
        <div>
            <section className="vh-100">
                <div className="container-xxl h-100">
                    <div className="row d-flex flex-column align-items-center justify-content-between h-100">

                        <div></div>
                        {/* Main */}
                        <div className="d-flex">
                            <div className="d-flex align-items-center justify-content-between col-md-9 col-lg-6 col-xl-5">
                                <img src={logo}
                                    className="img-fluid" alt="logo" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" >
                                <h2 style={{ color: "#2F56A6", textAlign: "center" }}>Quên mật khẩu</h2>

                                <form onSubmit={handleSubmit}>
                                    {/* email input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="InputEmail" style={{ fontWeight: "bold", color: "#2F56A6" }}>Email</label>
                                        <input type="text" id="InputEmail" onChange={handleChangeInput} value={email} name="email" className="form-control form-control-lg"
                                            placeholder="Nhập email của bạn" />
                                        {errors.email && <small style={{ fontWeight: "bold" }} className="text-danger">{errors.email}</small>}
                                    </div>
                                    <div className="text-center mt-4 mb-4 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg"
                                            style={{ width: "100%" }} >Gửi mã xác nhận</button>
                                    </div>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Bạn đã có tài khoản? <a href="/"
                                        className="link-danger">Đăng nhập ngay</a></p>
                                </form>
                            </div>
                        </div>

                        <div
                            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
                            <div className="mb-3 mb-md-0">
                                <h5 style={{ color: "#2F56A6" }}>©Coppyright 2023</h5>
                            </div>
                            <div className="mb-3 mb-md-0" >
                                <h5 style={{ color: "#2F56A6" }}>Chào mừng bạn đến với StudentCodeHub</h5>
                            </div>
                            <div>
                                <a href="#!" className="text-white me-4">
                                    <i style={{ color: "#2F56A6" }} className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#!" className="text-white me-4">
                                    <i style={{ color: "#2F56A6" }} className="fab fa-twitter"></i>
                                </a>
                                <a href="#!" className="text-white me-4">
                                    <i style={{ color: "#2F56A6" }} className="fab fa-google"></i>
                                </a>
                                <a href="#!" className="text-white">
                                    <i style={{ color: "#2F56A6" }} className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                            {/* Right */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default ResetPass