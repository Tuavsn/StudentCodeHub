import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDetailPosts } from "../redux/action/postAction";
import PostCard from "../components/common/post/PostCard";

const PostDetail = () => {
    const { homePosts, auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetailPosts(id, auth.token))
    }, [dispatch])

    return (
        <div style={{maxWidth: "1000px", margin: "auto"}}>
            <i className="fa-solid fa-arrow-left" style={{fontSize: "2rem", color: "black", position: "fixed", top: 15, left: 15, cursor: "pointer"}} onClick={() => navigate('/')}></i>
            {homePosts.detailPost && (
                <PostCard post={homePosts.detailPost} type="detailPost" />
            )}
        </div>
    )
}

export default PostDetail