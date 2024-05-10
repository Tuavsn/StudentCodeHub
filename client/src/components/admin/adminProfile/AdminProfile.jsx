import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePosts } from "../../../redux/action/postAction"
import PostCard from "../../common/post/PostCard";
import InputPost from "../../common/post/InputPost";
import UpdatePost from "../../common/post/UpdatePost";
import UpdateInfo from "../../common/updateInfo/UpdateInfo";
import postlogo from "../../../images/post.png";

const AdminProfile = () => {
    const { homePosts, auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL

    useEffect(() => {
        dispatch(getProfilePosts(auth.user.id, auth.token))
    }, [])

    return (
        <section className="vh-100 bg-light" style={{width: "100%", overflow: "scroll", scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center">
                    <div className="col col-md-9 col-lg-7 col-xl-6">
                        <div className="card" style={{borderRadius: "15px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                <img src={`${imageApiUrl}/${auth.user.avatar}`}
                                    alt="Generic placeholder image" className="img-fluid"
                                    style={{width: "180px", borderRadius: "10px"}} />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h3 className="mb-1">{auth.user.fullName}</h3>
                                    <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>{auth.user.userName}</p>
                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                    style={{backgroundColor: "#efefef"}}>
                                    <div>
                                        <p className="small text-muted mb-1">Gender</p>
                                        <p className="mb-0">{auth.user.gender}</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="small text-muted mb-1">Followers</p>
                                        <p className="mb-0">{auth.followers.length}</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="small text-muted mb-1">Following</p>
                                        <p className="mb-0">{auth.following.length}</p>
                                    </div>
                                    <div>
                                        <p className="small text-muted mb-1">Rating</p>
                                        <p className="mb-0">8.5</p>
                                    </div>
                                    </div>
                                    <div className="d-flex pt-1">
                                    <button type="button" className="btn btn-outline-primary me-1 flex-grow-1" data-bs-toggle="modal" data-bs-target="#updateInfoModal">Cập nhật thông tin</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{width: "100%"}}>
                    <div className="d-flex flex-column" style={{maxWidth: "1000px", margin: "auto"}}>
                        <div className="mt-4 d-flex gap-2 align-items-center">
                            <img style={{width: "2.4rem", objectFit: "contain"}} src={postlogo}/>
                            <h4 className="flex-grow-1 m-0">Danh sách bài đăng:</h4>
                        </div>
                        {homePosts.profilePosts.filter((post) =>  {
                            return post.user.id == auth.user.id
                        }).map((filteredPost, index) => (
                            <PostCard key={index} post={filteredPost} />
                        ))}
                    </div>
                </div>
            </div>
            <InputPost />
            <UpdatePost />
            <UpdateInfo user={auth.user} />
        </section>
    )
}

export default AdminProfile