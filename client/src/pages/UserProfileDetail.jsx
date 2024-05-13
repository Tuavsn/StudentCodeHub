import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfilePosts } from "../redux/action/postAction";
import { useParams } from "react-router-dom";
import { getDataAPI, postDataAPI } from "../utils/fetchData";
import { getUserInfo } from "../redux/action/authAction";
import PostCard from "../components/common/post/PostCard";
import postlogo from "../images/post.png";

const UserProfileDetail = () => {
    const { homePosts, auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams();
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL

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
            {user && (
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: "15px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                                <div className="card-body p-4">
                                    <div className="d-flex text-black">
                                        <div className="flex-shrink-0">
                                            <img src={`${imageApiUrl}/${user.avatar}`}
                                            alt="Generic placeholder image" className="img-fluid"
                                            style={{width: "180px", borderRadius: "10px"}} />
                                        </div>
                                        <div className="flex-grow-1 ms-3" style={{minWidth: 0, flexWrap: 'wrap'}}>
                                            <h3 className="mb-1">{user.fullName}</h3>    
                                            <div className="d-flex gap-4 justify-content-start rounded-3 p-2 mb-2"
                                            style={{backgroundColor: "#efefef"}}>
                                                <div>
                                                    <div>
                                                        <p className="small text-muted mb-0">Giới tính</p>
                                                        {auth.user.gender ? <p className="mb-0">{auth.user.gender}</p> : <p className="mb-0 text-danger">Chưa cập nhật</p>}
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-0">Email</p>
                                                        {auth.user.email ? <p className="mb-0">{auth.user.email}</p> : <p className="mb-0 text-danger">Chưa cập nhật</p>}
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-0">Đang theo dõi</p>
                                                        <p className="mb-0">{auth.following.length}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className="small text-muted mb-0">Role</p>
                                                        <p className="mb-0">{auth.user.role}</p>
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-0">Số điện thoại</p>
                                                        {auth.user.mobile ? <p className="mb-0">{auth.user.mobile}</p> : <p className="mb-0 text-danger">Chưa cập nhật</p>}
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-0">Người theo dõi</p>
                                                        <p className="mb-0">{auth.followers.length}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex pt-1">
                                                {id != auth.user.id ? 
                                                (<>
                                                    {auth.following.filter((item) => {return item.target.id == id}).length === 0 ? (
                                                        <button type="button" className="btn btn-primary flex-grow-1 w-100 mt-2" onClick={() => handleFollowUser()}>Theo dõi</button>
                                                    ) : (
                                                        <button type="button" className="btn btn-primary flex-grow-1 w-100 mt-2" onClick={() => handleUnFollowUser()}>Huỷ theo dõi</button>
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
                    </div>
                    <div className="row" style={{width: "100%"}}>
                        <div className="d-flex flex-column" style={{maxWidth: "1000px", margin: "auto"}}>
                            <div className="mt-4 d-flex gap-2 align-items-center">
                                <img style={{width: "2.4rem", objectFit: "contain"}} src={postlogo}/>
                                <h4 className="flex-grow-1 m-0">Danh sách bài đăng:</h4>
                            </div>
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