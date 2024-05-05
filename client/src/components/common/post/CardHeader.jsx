import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { POST_TYPES, deletePost, reportPost } from "../../../redux/action/postAction";
import checkIcon from "../../../images/check.png";
import moment from "moment"
import 'moment/locale/vi'
const { navigator } = window;

const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(null)
    moment.locale('vi')

    const handleEditPost = () => {
        dispatch({ type: POST_TYPES.SET_CURRENT_POST, payload: {post} })
    }
    const handleDeletePost = () => {
        if(window.confirm("Bạn có chắc?"))
        dispatch(deletePost({ post, auth, socket }))
        navigate("/")
    }
    const handleReportPost = () => {
        dispatch(reportPost({ post, auth }))
    }
    const handleCopyLink = () => {
        const postLink = "localhost:3000"
        navigator.clipboard.writeText(postLink+'/post/'+post.id);
    }
    return (
        <>
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
                <div>
                    <img src={post.user.avatar} style={{width: "5.2rem", height: "5.5rem", borderRadius: "20%", objectFit: "cover"}} />
                </div>
                <div>
                    <div className="d-flex align-items-center gap-2" style={{cursor: "pointer"}} onClick={() => navigate(`/user/${post.user.id}`)}>
                        <h4 className={`${isHover === post.id ? 'text-primary': ''}`} onMouseEnter={() => setIsHover(post.id)} onMouseLeave={() => setIsHover(null)}>{post.user.fullName}</h4>
                        {post.user.role === "ADMIN" && (<img src={checkIcon} style={{width: "1rem"}} />)}
                    </div>
                    {moment(post.createAt).format('llll')}
                </div>
            </div>
            <div className="dropdown">
                <span style={{fontSize: "2rem", fontWeight: "bold", cursor: "pointer", userSelect: "none"}} id="moreLink" data-bs-toggle="dropdown">...</span>
                <div className="dropdown-menu">
                    {auth.user.id === post.user.id || auth.user.role === "ADMIN" ? (
                        <>
                            <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}} onClick={handleEditPost} data-bs-toggle="modal" data-bs-target={`#updatePostModal`}>
                                <span>Chỉnh sửa</span>
                            </div>
                            <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}} onClick={handleDeletePost}>
                                <span>Xoá bài</span>
                            </div>
                            <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}} onClick={handleCopyLink}>
                                <span>Copy Link</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}} onClick={handleCopyLink}>
                                <span>Copy Link</span>
                            </div>
                            <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}}>
                                <span>Report bài post</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default CardHeader