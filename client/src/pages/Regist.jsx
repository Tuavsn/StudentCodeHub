import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { regist } from "../redux/action/authAction"
import { useNavigate } from "react-router-dom"
import logo from '../images/studentcodehub_logo.png'

const Regist = () => {
    const  initialState = {fullName: "", userName: "", email: "", password: ""}
    const [ userData, setUserData ] = useState(initialState)
    const { fullName, userName, email, password } = userData
    const [errors, setErrors] = useState({});
    const { auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        if( auth.token ) history("/")
    }, [ auth.token, history ])

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        setErrors({ ...errors, [name]: "" });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Kiểm tra validation
        let errors = {};

        const nameRegex = /^[a-zA-Z0-9\sàáạãảăắằẵặâấầẩẫậèéẹẻẽêềếểễệđìíịỉĩòóọỏõôốồổỗộơớờởỡợùúụủũưứừửữựỳỹỷỵ]*$/;
        const usernameRegex = /^[a-zA-Z0-9_-]*$/; // Chỉ chấp nhận ký tự chữ, số, gạch dưới (_) và dấu gạch ngang (-)
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/; // Chỉ chấp nhận ký tự chữ, số và một số ký tự đặc biệt
    
        if (!fullName) {
            errors.fullName = "Vui lòng nhập tên đầy đủ của bạn";
        } else if (!nameRegex.test(fullName)) {
            errors.fullName = "Tên không được chứa ký tự đặc biệt";
        } else if (fullName.length > 20) {
            errors.fullName = "Tên quá dài, vui lòng nhập ít hơn 20 ký tự";
        }
        if (!userName) {
            errors.userName = "Vui lòng nhập tên đăng nhập";
        } else if (!usernameRegex.test(userName)) {
            errors.userName = "Tên đăng nhập không hợp lệ";
        }
        if (!email) {
            errors.email = "Vui lòng nhập email của bạn";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email không hợp lệ";
        }
        if (!password) {
            errors.password = "Vui lòng nhập mật khẩu";
        } else if (password.length < 6) {
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        } else if (!passwordRegex.test(password)) {
            errors.password = "Mật khẩu không hợp lệ";
        }
    
        if (Object.keys(errors).length === 0) {
            // Nếu không có lỗi, gửi form
            history("/otp-confirmation", { state: { email: email, otp_type: "REGIST", userData: userData } })
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
                                <h2 style={{fontSize: "2rem", fontWeight: "bold", color: "#2F56A6", textAlign: "center"}}>Đăng ký tài khoản</h2>

                                <form onSubmit={handleSubmit}>
                                    {/* fullname input */}
                                    <div className="form-outline mb-4 mt-4">
                                        <label className="form-label" htmlFor="InputFullname" style={{ fontWeight: "bold", color: "#2F56A6" }}>Tên hiển thị</label>
                                        <input type="text" id="InputFullname" onChange={handleChangeInput} value={fullName} name="fullName" className="form-control form-control-lg"
                                            placeholder="Nhập tên đầy đủ của bạn" />
                                        {errors.fullName && <small style={{fontWeight: "bold"}} className="text-danger">{errors.fullName}</small>}
                                    </div>

                                    {/* username input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="InputUsername" style={{ fontWeight: "bold", color: "#2F56A6" }}>Tên tài khoản</label>
                                        <input type="text" id="InputUsername" onChange={handleChangeInput} value={userName} name="userName" className="form-control form-control-lg"
                                            placeholder="Nhập tài khoản của bạn" />
                                        {errors.userName && <small style={{fontWeight: "bold"}} className="text-danger">{errors.userName}</small>}
                                    </div>

                                    {/* email input */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="InputEmail" style={{ fontWeight: "bold", color: "#2F56A6" }}>Email</label>
                                        <input type="text" id="InputEmail" onChange={handleChangeInput} value={email} name="email" className="form-control form-control-lg"
                                            placeholder="Nhập email của bạn" />
                                        {errors.email && <small style={{fontWeight: "bold"}} className="text-danger">{errors.email}</small>}
                                    </div>

                                    {/* Password input */}
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="InputPassword" style={{ fontWeight: "bold", color: "#2F56A6" }}>Mật khẩu</label>
                                        <input type="password" id="InputPassword" onChange={handleChangeInput} value={password} name="password" className="form-control form-control-lg"
                                            placeholder="Nhập mật khẩu đăng nhập" />
                                        {errors.password && <small style={{fontWeight: "bold"}} className="text-danger">{errors.password}</small>}
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <a href="#!" className="text-body">Quên mật khẩu?</a>
                                    </div>
                                    <div className="text-center mt-4 mb-4 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg"
                                            style={{ width: "100%" }} >Đăng ký</button>
                                    </div>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Bạn đã có tài khoản? <a href="/"
                                        className="link-danger">Đăng nhập ngay</a></p>
                                    </form>
                            </div>
                        </div>

                        <div
                            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5">
                            <div className="mb-3 mb-md-0">
                                <h5 style={{color: "#2F56A6"}}>©Coppyright 2023</h5>
                            </div>
                            <div className="mb-3 mb-md-0" >
                                <h5 style={{color: "#2F56A6"}}>Chào mừng bạn đến với StudentCodeHub</h5>
                            </div>
                            <div>
                            <a href="#!" className="text-white me-4">
                                <i style={{color: "#2F56A6"}} className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#!" className="text-white me-4">
                                <i style={{color: "#2F56A6"}} className="fab fa-twitter"></i>
                            </a>
                            <a href="#!" className="text-white me-4">
                                <i style={{color: "#2F56A6"}} className="fab fa-google"></i>
                            </a>
                            <a href="#!" className="text-white">
                                <i style={{color: "#2F56A6"}} className="fab fa-linkedin-in"></i>
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

export default Regist