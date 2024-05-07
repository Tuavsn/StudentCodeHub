import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfilePosts } from "../redux/action/postAction";
import { useParams } from "react-router-dom";
import { getDataAPI, postDataAPI } from "../utils/fetchData";
import PostCard from "../components/common/post/PostCard";
import { getUserInfo } from "../redux/action/authAction";

const UserProfileDetail = () => {
    const { homePosts, auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams();

    const getUserData = async () => {
        const res = await getDataAPI(`user/${id}`, auth.token)
        setUser(res.data)
    }

    const handleFollowUser = async () => {
        await postDataAPI(`user/${id}/follow`,{}, auth.token)
        dispatch(getUserInfo())
    }

    const handleUnFollowUser = async () => {
        await postDataAPI(`user/${id}/unFollow`,{}, auth.token)
        dispatch(getUserInfo())
    }

    useEffect(() => {
        getUserData()
        dispatch(getProfilePosts(id, auth.token))
    }, [id])

    return (
        <section className="vh-100 bg-light" style={{width: "100%", overflow: "scroll", scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <i className="fa-solid fa-arrow-left" style={{fontSize: "2rem", color: "black", position: "fixed", top: 15, left: 15, cursor: "pointer"}} onClick={() => navigate('/')}></i>
            {user &&(
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: "15px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                                <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                        <img src={user.avatar}
                                        alt="Generic placeholder image" className="img-fluid"
                                        style={{width: "180px", borderRadius: "10px"}} />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="mb-1">{user.fullName}</h5>
                                        <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>{user.userName}</p>
                                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                        style={{backgroundColor: "#efefef"}}>
                                        <div>
                                            <p className="small text-muted mb-1">Gender</p>
                                            <p className="mb-0">{user.gender}</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">Followers</p>
                                            <p className="mb-0">{user.followers.length}</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="small text-muted mb-1">Following</p>
                                            <p className="mb-0">{user.following.length}</p>
                                        </div>
                                        <div>
                                            <p className="small text-muted mb-1">Rating</p>
                                            <p className="mb-0">8.5</p>
                                        </div>
                                        </div>
                                        <div className="d-flex pt-1">
                                            <button type="button" className="btn btn-primary me-1 flex-grow-1">Đánh giá</button>
                                            <button type="button" className="btn btn-outline-primary flex-grow-1">Tố cáo</button>
                                        </div>
                                        {id != auth.user.id ? 
                                        (<>
                                            {auth.following.filter((item) => {return item.target.id == id}).length === 0 ? (
                                                <button type="button" className="btn btn-primary flex-grow-1 w-100 mt-2" onClick={() => handleFollowUser()}>Follow</button>
                                            ) : (
                                                <button type="button" className="btn btn-primary flex-grow-1 w-100 mt-2" onClick={() => handleUnFollowUser()}>Huỷ Follow</button>
                                            )}
                                        </>)
                                        : (
                                            <></>
                                        )}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{width: "100%"}}>
                        <div className="d-flex flex-column" style={{maxWidth: "1000px", margin: "auto"}}>
                            {homePosts.profilePosts.map((post, index) => (
                                <PostCard key={index} post={post} type={"profilePost"}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default UserProfileDetail