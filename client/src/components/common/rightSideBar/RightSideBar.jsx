import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import checkIcon from "../../../images/check.png"

const RightSideBar = () => {
    const { auth } = useSelector((state) => state)
    const [isHover, setIsHover] = useState(null)
    const navigate = useNavigate()

    return (
        <div className="d-flex flex-column justify-content-between vh-100">
            <div className="flex-grow-1 d-flex justify-content-center py-3 h-50 overflow-y-scroll">
                <h5><i className="fa-solid fa-trophy" style={{fontSize: "1.2rem", color: "orange"}}></i> Bảng xếp hạng</h5>
            </div>
            <hr />
            <div className="flex-grow-1 d-flex flex-column h-50 overflow-y-scroll">
                <h5 style={{textAlign: "center"}}>
                    <i className="fa-solid fa-user" style={{fontSize: "1.2rem", color: "green"}} /> Follwers
                </h5>
                <div className="d-flex flex-column align-items-start gap-2 p-2">
                    {auth.followers.map((follow, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between w-100">
                            <img src={follow.source.avatar} style={{width: "2.5rem", height: "2.5rem", objectFit: "cover", borderRadius: ".5rem"}}/>
                            <span className={`${isHover === follow.source.id ? 'text-primary': ''}`} onMouseEnter={() => setIsHover(follow.source.id)} onMouseLeave={() => setIsHover(null)} onClick={() => navigate(`/user/${follow.source.id}`)} style={{cursor: "pointer"}}>
                                {follow.source.fullName > 20 ? 
                                "..." + follow.source.fullName.slice(follow.source.fullName.length - 20, follow.source.fullName.length) 
                                : follow.source.fullName}
                            </span>
                            <span>{follow.source.role === "ADMIN" && (<img src={checkIcon} style={{width: "1rem"}} />)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightSideBar