import { useDispatch, useSelector } from "react-redux"
import {
    getMonthlyData,
} from "../../../redux/action/adminAction"
import { useEffect, useState } from "react"
import userlogo from "../../../images/user.png"
import postlogo from "../../../images/post.png"
import code from "../../../images/code.png"
import Chart from "../chart/Chart"

const Main = () => {
    const { auth, admin } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState('')

    useEffect(() => {
        dispatch(getMonthlyData(auth.token));

    }, [dispatch, auth.token, auth])
    return (
        <div className="p-4 d-flex flex-column gap-5" style={{width: "100%", overflowY: "scroll", scrollbarWidth: 'thin', msOverflowStyle: 'thin'}}>
            <div className="row">
                {/* Total users */}
                <div className="col-xl col-lg-6 mb-xl-0 mb-4" style={{cursor: "pointer"}}>
                    <div className="card" style={isHover === "totaluser" ? {height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" } : {height: "100%"}}
                    onMouseEnter={() => setIsHover('totaluser')}
                    onMouseLeave={() => setIsHover('')}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={userlogo}/>
                                </div>
                                <div className="col-8">
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Tài khoản</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_users}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total posts*/}
                <div className="col-xl col-sm-6 mb-xl-0 mb-4" style={{cursor: "pointer"}}>
                    <div className="card" style={isHover === "totalpost" ? {height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" } : {height: "100%"}}
                    onMouseEnter={() => setIsHover('totalpost')}
                    onMouseLeave={() => setIsHover('')}>
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
                {/* Total code exercises */}
                <div className="col-xl col-sm-6 mb-xl-0 mb-4" style={{cursor: "pointer"}}>
                    <div className="card" style={isHover === "totalcode" ? {height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" } : {height: "100%"}}
                    onMouseEnter={() => setIsHover('totalcode')}
                    onMouseLeave={() => setIsHover('')}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={code}/>
                                </div>
                                <div className="col-8" style={{overflow: "hidden"}}>
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Bài code</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_code_excercises}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total code submission */}
                <div className="col-xl col-sm-6 mb-xl-0 mb-4" style={{cursor: "pointer"}}>
                    <div className="card" style={isHover === "totalcode" ? {height: "100%", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" } : {height: "100%"}}
                    onMouseEnter={() => setIsHover('totalcode')}
                    onMouseLeave={() => setIsHover('')}>
                        <div className="card-body p-1">
                            <div className="row">
                                <div className="col-4 text-end">
                                    <img style={{width: "90%"}} src={code}/>
                                </div>
                                <div className="col-8" style={{overflow: "hidden"}}>
                                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>Code submission</span><hr />
                                    SL:  <h5 style={{display: "inline"}}>{admin.total_code_submission}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Chart />
            </div>
        </div>
    )
}

export default Main