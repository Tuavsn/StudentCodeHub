import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction"
import { useNavigate} from "react-router-dom"
import logo from '../images/logo192.png'

const Login = () => {
    const  initialState = { userName: "", password: ""}
    const [ userData, setUserData ] = useState(initialState)
    const { userName, password } = userData
    const [errors, setErrors] = useState({})
    // const [ typePass, setTypePass ] = useState(false)
    const { auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useNavigate()

    useEffect(() => {
        if( auth.token ) history("/")
    }, [ auth.token, history ])

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        setErrors({ ...errors, [name]: ""})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Kiểm tra validation
        let errors = {};
    
        const usernameRegex = /^[a-zA-Z0-9_-]*$/; // Chỉ chấp nhận ký tự chữ, số, gạch dưới (_) và dấu gạch ngang (-)
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/; // Chỉ chấp nhận ký tự chữ, số và một số ký tự đặc biệt
    
        if (!userName) {
            errors.userName = "Vui lòng nhập tên đăng nhập";
        } else if (!usernameRegex.test(userName)) {
            errors.userName = "Tên đăng nhập không hợp lệ";
        }
        if (!password) {
            errors.password = "Vui lòng nhập mật khẩu";
        } else if (!passwordRegex.test(password)) {
            errors.password = "Mật khẩu không hợp lệ";
        }
    
        if (Object.keys(errors).length === 0) {
            // Nếu không có lỗi, gửi form
            dispatch(login(userData));
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setErrors(errors);
        }
    }
    

    return (
        <section className="vh-100">
            <div className="container-xxl h-100">
                <div className="row d-flex flex-column align-items-center justify-content-between h-100">

                    <div>
                    </div>
                    {/* Main */}
                    <div className="d-flex">
                        <div className="d-flex align-items-center justify-content-between col-md-9 col-lg-6 col-xl-5">
                            <img src={logo}
                            className="img-fluid" alt="logo" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" >
                            <h2 style={{fontSize: "2rem", fontWeight: "bold", color: "#2F56A6", textAlign: "center"}}>Đăng nhập tài khoản</h2>

                            <form onSubmit={handleSubmit}>

                            {/* username input */}
                            <div className="form-outline mb-4 mt-4">
                                <label className="form-label" htmlFor="InputUsername" style={{fontWeight: "bold", color: "#2F56A6"}}>Tên đăng nhập</label>
                                <input type="text" id="InputUsername" onChange={handleChangeInput} value={userName} name="userName" className="form-control form-control-lg"
                                placeholder="Nhập username của bạn" />
                                {errors.userName && <small style={{fontWeight: "bold"}} className="text-danger">{errors.userName}</small>}
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="InputPassword" style={{fontWeight: "bold", color: "#2F56A6"}}>Mật khẩu</label>
                                <input type="password" id="InputPassword" onChange={handleChangeInput} value={password} name="password" className="form-control form-control-lg"
                                placeholder="Nhập mật khẩu đăng nhập" />
                                {errors.password && <small style={{fontWeight: "bold"}} className="text-danger">{errors.password}</small>}
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <a href="#!" className="text-body">Quên mật khẩu?</a>
                            </div>



                            <div className="text-center mt-4 mb-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                style={{width: "100%"}}>Đăng nhập</button>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Đăng nhập với</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                <i className="fab fa-linkedin-in"></i>
                                </button>
                            </div>

                            <p className="small fw-bold mt-2 pt-1 mb-0">Bạn chưa đăng ký tài khoản? <a href="/regist"
                                    className="link-danger">Đăng ký ngay</a></p>

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
                            <i style={{color: "#2F56A6"}} className="fab fa-google"></i>
                        </a>
                        </div>
                        {/* Right */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login