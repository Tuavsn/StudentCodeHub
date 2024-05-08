import { useDispatch, useSelector } from "react-redux"
import {
    getTotalPosts,
    getTotalUsers
} from "../../../redux/action/adminAction"
import { useEffect } from "react"
import userlogo from "../../../images/user.png"
import activeuserlogo from "../../../images/activeuser.webp"
import postlogo from "../../../images/post.png"
import spampostlogo from "../../../images/spampost.png"
import likeslogo from "../../../images/likes.svg"
import commentlogo from "../../../images/comment.png"

const Main = () => {
    const { auth, admin, socket } = useSelector((state) => state)
    const dispatch = useDispatch()

    const isActiveUser = (userId) => {
        return admin.total_active_users.find(user => user.id === userId);
    }

    useEffect(() => {
        dispatch(getTotalUsers(auth.token));
        dispatch(getTotalPosts(auth.token));
        // dispatch(getTotalComments(auth.token));
        // dispatch(getTotalLikes(auth.token));
        // dispatch(getTotalSpamPosts(auth.token))
    }, [dispatch, auth.token, socket, auth])
    return (
        <div className="p-4 d-flex flex-column gap-5" style={{width: "100%", overflowY: "scroll", scrollbarWidth: 'thin', msOverflowStyle: 'thin'}}>
            <div className="row">
                {/* Total users */}
                <div className="col-xl col-lg-6 mb-xl-0 mb-4">
                    <div className="card" style={{height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={userlogo}/>
                                </div>
                                <div className="col-8">
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Tài khoản</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_users.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total active users */}
                <div className="col-xl col-sm-6 mb-xl-0 mb-4">
                    <div className="card" style={{height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={activeuserlogo}/>
                                </div>
                                <div className="col-8" style={{overflow: "hidden"}}>
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Hoạt động</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_active_users.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total posts*/}
                <div className="col-xl col-sm-6 mb-xl-0 mb-4">
                    <div className="card" style={{height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={postlogo}/>
                                </div>
                                <div className="col-8" style={{overflow: "hidden"}}>
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Posts</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_posts}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total spam posts */}
                {/* <div className="col-xl col-sm-6 mb-xl-0 mb-4">
                    <div className="card" style={{height: "100%"}}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={spampostlogo}/>
                                </div>
                                <div className="col-8" style={{overflow: "hidden"}}>
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Spam posts</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_spam_posts}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Main