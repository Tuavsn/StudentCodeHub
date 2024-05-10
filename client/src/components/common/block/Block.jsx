import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/action/authAction"

const Block = () => {
    const dispatch = useDispatch()
    return (
        <>
            <i className="fa-solid fa-arrow-left" style={{fontSize: "2rem", color: "black", position: "fixed", top: 15, left: 15, cursor: "pointer"}} onClick={() => dispatch(logout())}></i>
            <div className="card" style={{maxWidth: "700px", margin: "4rem auto"}}>
                <div className="card-body">
                    <h4 className="card-title bg-danger" style={{color: "#fff", padding: ".8rem", borderRadius: ".2rem"}}><strong>Tài khoản của bạn đã bị khoá</strong></h4>
                    <h5 className="card-text text-center p-2"><strong>Quản trị viên của<strong style={{color: "#2F55A6"}}> StudentCodeHub </strong>đã khoá tài khoản của bạn</strong></h5>
                    <h5 className="text-center p-2"><strong>Hãy liên hệ với quản trị viên để mở khoá tài khoản của bạn !!!</strong></h5>
                </div>
            </div>
        </>
    )
}

export default Block