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

    useEffect(() => {
        if(post.postLike !== null) {
            if(post.postLike.find((like) => like.user.id === auth.user.id)) {
                setIsLike(true)
            } else {
                setIsLike(false)
            }
        }
    }, [post.postLike.length, auth.user.id])

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
    )
}

export default CardFooter