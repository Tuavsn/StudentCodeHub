import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataAPI } from "../../../utils/fetchData";
import { GLOBALTYPES } from "../../../redux/action/globalTypes";
import { getUserInfo } from "../../../redux/action/authAction";

const UpdateInfo = ({user}) => {
    const { auth } = useSelector((state) => state)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const  initialState = {fullName: user.fullName, email: user.email, password: "", avatar: user.avatar, gender: user.gender, mobile: user.mobile}
    const [ userData, setUserData ] = useState(initialState)
    const { fullName, mobile, gender, email, password } = userData
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        setErrors({ ...errors, [name]: "" });
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles(files);
        setImagePreviews(previews);
    };

    const handleCancelUploadImage = (e) => {
        e.preventDefault();
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('profileInput');
        fileInput.value = '';
    }

    const handleCancelUpdateInfo = (e) => {
        e.preventDefault()
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('profileInput');
        fileInput.value = '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra validation
        let errors = {};
    
        const nameRegex = /^[a-zA-Z\sàáạãảăắằẵặâấầẩẫậèéẹẻẽêềếểễệđìíịỉĩòóọỏõôốồổỗộơớờởỡợùúụủũưứừửữựỳỹỷỵ]*$/;
        const mobileRegex = /^[0-9]*$/; // Chỉ chấp nhận ký tự số
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/; // Chỉ chấp nhận ký tự chữ, số và một số ký tự đặc biệt
    
        if (!fullName) {
            errors.fullName = "Vui lòng nhập tên đầy đủ của bạn";
        } else if (!nameRegex.test(fullName)) {
            errors.fullName = "Tên không được chứa ký tự đặc biệt";
        } else if (fullName.length > 50) {
            errors.fullName = "Tên quá dài, vui lòng nhập ít hơn 50 ký tự";
        }
        if (!mobile) {
            errors.mobile = "Vui lòng nhập số điện thoại";
        } else if (mobile.length < 10 && mobile.length !== 0) {
            errors.mobile = "Số điện thoại phải có ít nhất 12 số";
        } else if (!mobileRegex.test(mobile)) {
            errors.mobile = "Số điện thoại không hợp lệ";
        }
        if (!email) {
            errors.email = "Vui lòng nhập email của bạn";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email không hợp lệ";
        }
        if (password.length < 6 && password.length !== 0) {
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        } else if (!passwordRegex.test(password)) {
            errors.password = "Mật khẩu không hợp lệ";
        }
    
        if (Object.keys(errors).length === 0) {
            const formData = new FormData()
            selectedFiles.forEach((image) => {
                formData.append('images', image)
            })
            const image = await (await postDataAPI('images/save', formData, auth.token)).data.images[0]
            var user = userData
            user.avatar = image
            const res = await postDataAPI("user/updateInfo", user, auth.token)
            dispatch({getUserInfo})
            dispatch({type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg})
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setErrors(errors);
        }
    }

    useEffect(() => {
        setUserData({fullName: user.fullName, avatar: user.avatar, email: user.email, password: "", gender: user.gender, mobile: user.mobile})
    }, [user])

    return (
        <div className="modal fade" id="updateInfoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title flex-grow-1 text-center" id="exampleModalLongTitle">Cập nhật thông tin cá nhân</h5>
                    </div>
                    <div className="modal-body" style={{overflowY: "scroll"}}>
                        {/* image input */}
                        <div className="form-outline mb-4 mt-4">
                            <label className="form-label" htmlFor="InputFullname" style={{ fontWeight: "bold", color: "#2F56A6" }}>Ảnh đại diện:</label>
                            <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
                                <input
                                    id="profileInput"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple
                                    onChange={handleFileChange}
                                    width={90} height={90}
                                    style={{ border: "1px solid black", borderRadius: "1rem" }} />
                            </div>
                            {selectedFiles.length > 0 && (
                                <div>
                                    {
                                        imagePreviews.map((preview, index) => (
                                            <img key={index} src={preview} style={{maxWidth: "100%", margin: "1rem 0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} alt="..." />
                                        ))
                                    }
                                            
                                    <div className="text-center">
                                        <button className="btn btn-danger" onClick={handleCancelUploadImage}>Xoá hình</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* fullname input */}
                        <div className="form-outline mb-4 mt-4">
                            <label className="form-label" htmlFor="InputFullname" style={{ fontWeight: "bold", color: "#2F56A6" }}>Tên hiển thị</label>
                            <input type="text" id="InputFullname" onChange={handleChangeInput} value={fullName} name="fullName" className="form-control form-control-lg"
                                placeholder="Nhập tên đầy đủ của bạn" />
                            {errors.fullName && <small style={{fontWeight: "bold"}} className="text-danger">{errors.fullName}</small>}
                        </div>

                        {/* mobile input */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="InputMobile" style={{ fontWeight: "bold", color: "#2F56A6" }}>Số điện thoại</label>
                            <input type="text" id="InputMobile" onChange={handleChangeInput} value={mobile} name="mobile" className="form-control form-control-lg"
                                placeholder="Nhập tài khoản của bạn" />
                            {errors.mobile && <small style={{fontWeight: "bold"}} className="text-danger">{errors.mobile}</small>}
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancelUpdateInfo}>Huỷ</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateInfo