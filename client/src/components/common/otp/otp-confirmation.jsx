import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import logo from '../../../images/studentcodehub_logo.png'
import { postDataAPI } from "../../../utils/fetchData";
import { GLOBALTYPES } from "../../../redux/action/globalTypes";
import { regist } from "../../../redux/action/authAction";

const OTPConfirm = () => {
    const location = useLocation();
    const { email, otp_type, userData } = location.state;
    const [otp, setOtp] = useState("")
    const [newPassword, SetNewPassword] = useState("")
    const [enterNewPassword, setEnterNewPassword] = useState(false)
    const [token, setToken] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [waitingResend, setWaitingResend] = useState(false)
    const [resendText, setResendText] = useState("Gửi lại OTP")

    const resendTime = 60

    const requestOTP = async () => {
        const res = await postDataAPI("auth/create-otp", { email, otp_type });
        return res.data.token
    }

    const disableResend = async () => {
        setWaitingResend(true)
        let time = resendTime
        let interval = setInterval(() => {
            time--
            setResendText(`Gửi lại OTP (${time}s)`)
            if (time === 0) {
                setResendText("Gửi lại OTP")
                setWaitingResend(false)
                clearInterval(interval)
            }
        }, 1000)
    }

    useEffect(() => {
        disableResend()
        requestOTP().then(token => setToken(token)).catch(err => console.log(err))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp === "") {
            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Vui lòng nhập OTP" })
        } else {
            dispatch({ type: GLOBALTYPES.LOADING, payload: true })
            const res = await postDataAPI("auth/verify-otp", { email, otp_type, otp, token, password:"" })
            console.log(res.data)
            dispatch({ type: GLOBALTYPES.LOADING, payload: false })
            if (res.data.msg === "success") {
                if (otp_type === "RESET_PASSWORD") {
                    setEnterNewPassword(true)
                } else {
                    dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: "Xác thực thành công" })
                    dispatch(regist(userData))
                    navigate("/")
                }
            } else {
                dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Xác thực không thành công" })
            }
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword === "") {
            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Vui lòng nhập mật khẩu mới" })
        } else if (newPassword.length < 6) {
            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Mật khẩu phải có ít nhất 6 ký tự" })
        } else {
            dispatch({ type: GLOBALTYPES.LOADING, payload: true })
            const res = await postDataAPI("auth/reset-password", { email, password: newPassword, token, otp_type, otp })
            dispatch({ type: GLOBALTYPES.LOADING, payload: false })
            if (res.data.msg === "success") {
                dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: "Đổi mật khẩu thành công" })
                navigate("/")
            } else {
                dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Đổi mật khẩu không thành công" })
            }
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
                                <h2 style={{ color: "#2F56A6", textAlign: "center" }}>Xác thực OTP</h2>

                                {/* OTP input */}
                                {!enterNewPassword &&
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="InputOTP" style={{ fontWeight: "bold", color: "#2F56A6" }}>OTP</label>
                                            <input type="text" id="InputOTP" onChange={(e) => setOtp(e.target.value)} value={otp} className="form-control form-control-lg"
                                                placeholder="Kiểm tra email và nhập OTP" />
                                        </div>
                                        <div className="flex flex-row text-center mt-4 mb-4 pt-2">
                                            <button type="button" className={"btn btn-primary btn-lg mx-2"+(waitingResend?" disabled":"")}
                                                style={{ width: "100%" }} onClick={requestOTP}>{resendText}</button>
                                            <button type="submit" className="btn btn-primary btn-lg mx-2"
                                                style={{ width: "100%" }} >Xác nhận OTP</button>
                                        </div>
                                    </form>
                                }
                                {/* New Passord input */}
                                {enterNewPassword &&
                                    <form onSubmit={handleChangePassword}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="InputNewPassword" style={{ fontWeight: "bold", color: "#2F56A6" }}>Nhập mật khẩu mới</label>
                                            <input type="text" id="InputNewPassword" onChange={(e) => SetNewPassword(e.target.value)} value={newPassword} className="form-control form-control-lg"
                                                placeholder="Nhập mật khẩu mới" />
                                        </div>
                                        <div className="text-center mt-4 mb-4 pt-2">
                                            <button type="submit" className="btn btn-primary btn-lg"
                                                style={{ width: "100%" }} >Đổi mật khẩu</button>
                                        </div>
                                    </form>
                                }
                                <p className="small fw-bold mt-2 pt-1 mb-0">Bạn đã có tài khoản? <a href="/"
                                    className="link-danger">Đăng nhập ngay</a></p>

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
export default OTPConfirm