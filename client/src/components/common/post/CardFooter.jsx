import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unLikePost } from "../../../redux/action/postAction";
import checkIcon from "../../../images/check.png";
import { createComment, deleteComment } from "../../../redux/action/commentAction";
import moment from "moment"
import { Navigate, useNavigate } from "react-router-dom"

const CardFooter = ({ post, type }) => {
    const { auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState({})
    const [isHover, setIsHover] = useState(null)
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL
    const [readMore, setReadMore] = useState([])

    useEffect(() => {
        if(post.postLike !== null) {
            if(post.postLike.find((like) => like.user.id === auth.user.id)) {
                setIsLike(true)
            } else {
                setIsLike(false)
            }
        }
    }, [post.postLike.length, auth.user.id])

    const handleChangeInput = (e) => {
        setContent(e.target.value)
        setErrors({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let errors = {}

        if(!content) {
            errors.comment = "Bạn chưa nhập bình luận";
        }

        if(Object.keys(errors).length === 0) {
            setContent("");
            const newComment = {
                content
            }
            dispatch(createComment({post, newComment, auth, type}))
        } else {
            setErrors(errors)
        }
        
    }

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment({post, commentId, auth, type}))
    }

    const handleLike = async () => {
        if(loadLike) return
        setLoadLike(true)
        await dispatch(likePost({post, auth, type}))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if(loadLike) return
        setLoadLike(true)
        await dispatch(unLikePost({post, auth, type}))
        setLoadLike(false)
    }

    return (
        type !== "detailPost" ? (
            <div>
                <div className="p-2">
                    <span style={{fontSize: "1rem", fontWeight: "bold", marginRight: "1rem", cursor: "pointer"}}>{post.postLike.length} Lượt thích</span>
                    <span style={{fontSize: "1rem", fontWeight: "bold", cursor: "pointer"}}>{post.postComment.length} Bình luận</span>
                </div>
                {isLike ? (
                    <i className={`fa-regular fa-heart text-danger`}
                    style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}
                    onClick={handleUnLike}
                    ></i>
                ): (
                    <i className={`fa-regular fa-heart`}
                    style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}
                    onClick={handleLike}
                    ></i>
                )}
                <i className="fa-regular fa-comment" 
                style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}
                onClick={() => navigate(`/post/${post.id}`)} ></i>
                <i className="fa-solid fa-share-nodes" style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}></i>
            </div>
        ) : (
            <div>
                <div className="p-2">
                    <span style={{fontSize: "1rem", fontWeight: "bold", marginRight: "1rem", cursor: "pointer"}}>{post.postLike.length} Lượt thích</span>
                    <span style={{fontSize: "1rem", fontWeight: "bold", cursor: "pointer"}}>{post.postComment.length} Bình luận</span>
                </div>
                {isLike ? (
                    <i className={`fa-regular fa-heart text-danger`}
                    style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}
                    onClick={handleUnLike}
                    ></i>
                ): (
                    <i className={`fa-regular fa-heart`}
                    style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}
                    onClick={handleLike}
                    ></i>
                )}
                <i className="fa-regular fa-comment" 
                style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}
                onClick={() => document.getElementById(`commentInput${post.id}`).focus()} ></i>
                <i className="fa-solid fa-share-nodes" style={{fontSize: "1.6rem", padding: "1rem", cursor: "pointer"}}></i>
                <div style={{borderRadius: "1rem", padding: "1rem"}}>
                    {post.postComment && (post.postComment.map((comment) => (
                        <div className="d-flex align-items-start gap-3 mb-4" 
                        key={comment.id} 
                        onMouseEnter={() => setIsHover(comment.id)} 
                        onMouseLeave={() => setIsHover(null)}>
                            <div>
                                <img src={`${imageApiUrl}/${comment.user.avatar}`}  style={{width: "3rem", height: "3rem", borderRadius: "50%", objectFit: "cover"}}/>
                            </div>
                            <div style={{minWidth: 0, width: "100%", backgroundColor: "#F0F2F5", padding: ".5rem", borderRadius: "1rem"}}>
                                <div className="d-flex gap-2 align-items-center">
                                    <span style={{fontWeight: "bold"}}>
                                        {comment.user.fullName.length > 20 ? 
                                        "..." + comment.user.fullName.slice(comment.user.fullName.length - 20, comment.user.fullName.length) 
                                        : comment.user.fullName }
                                        {comment.user.role === "ADMIN" && (<img src={checkIcon} style={{width: "1rem", marginLeft: '.2rem'}} />)}
                                    </span>
                                    <span style={{fontSize: ".8rem"}}>{moment(comment.createAt).fromNow()}</span>

                                    <div className={`flex-grow-1 text-end dropdown ${isHover === comment.id ? 'd-block' : 'd-none'}`}>
                                        <i className="fa-solid fa-ellipsis" style={{fontSize: "1.2rem", cursor: "pointer", userSelect: "none"}} data-bs-toggle="dropdown"></i>
                                        <div className="dropdown-menu">
                                            {auth.user.id === comment.user.id || auth.user.role === "ADMIN" ? (
                                                <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}} onClick={() => handleDeleteComment(comment.id)}>
                                                    <span>Xoá</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}} onClick={() => navigate(`/user/${comment.user.id}`)}>
                                                        <span>Trang cá nhân</span>
                                                    </div>
                                                    <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}}>
                                                        <span>Báo cáo</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                {comment.content.length < 400 ? comment.content
                                : readMore.includes(comment.id) ? 
                                <div style={{overflow: "hidden"}}>
                                    <span>{comment.content}</span>
                                    <br />
                                    <a href="#" onClick={() => setReadMore(readMore.filter(id => id !== comment.id))}>Thu gọn</a>
                                </div>
                                : <div style={{overflow: "hidden"}}>
                                    <span>{comment.content.slice(0,400)} ....</span>
                                    <br />
                                    <a href="#" onClick={() => setReadMore([...readMore, comment.id])}>Xem thêm</a>
                                </div> }
                            </div>
                        </div>
                    )))}
                    <div className="input-group d-flex" style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                        <input  
                        id={`commentInput${post.id}`} 
                        className="flex-grow-1" 
                        type="text" 
                        style={{fontSize: "1.3rem" ,padding: ".8rem", border: "none", outline: "none"}} 
                        placeholder="Thêm bình luận"
                        value={content}
                        onChange={(e) => handleChangeInput(e)}/>
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={handleSubmit}>
                            <i className="fa-solid fa-paper-plane px-2"></i>
                        </button>
                    </div>
                    {errors.comment && <small style={{fontWeight: "bold"}} className="text-danger">{errors.comment}</small>}
                </div>
            </div>
        )
    )
}

export default CardFooter