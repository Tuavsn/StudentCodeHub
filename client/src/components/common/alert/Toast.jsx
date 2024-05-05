import React, { useEffect } from "react";

const Toast = ({ msg, handleShow, bgColor }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleShow()
        }, 2000)
        return  () => clearTimeout(timeout)
    }, [])
    return (
        <div className={`toast show position-fixed text-light ${bgColor}`} style={{ maxWidth: "250px" ,right: "10px", top: "10px", zIndex: 50 }}>
            <div className={`toast-header text-light ${bgColor} justify-content-between`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button
                className="ml-auto mb-1 close text-light"
                data-dismiss="toast"
                style={{ border: "none", background: "none", fontSize: "30px", right: 0}}
                onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className="toast-body">{msg.body}</div>
        </div>
    )
}

export default Toast