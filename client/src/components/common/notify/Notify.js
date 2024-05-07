import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi'
import { deleteNotifies, deleteNotify, isReadNotify } from "../../../redux/action/notifyAction";

const Notify = () => {
    const {auth, notify} = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    moment.locale('vi')

    const handleDeleteNotify = (notify) => {
        dispatch(deleteNotify(notify, auth))
    }

    const handleDeleteNotifies = () => {
        dispatch(deleteNotifies(auth))
    }

    const handleIsReadNotify = (notify) => {
        notify.status = 1
        dispatch(isReadNotify(notify, auth))
        navigate(`${notify.link}`);
    }

    return (                 
        <section style={{margin: "2rem auto", width: "60%", overflowY: "scroll"}}>
            <div className="w-100">
                <h3 className="m-b-50 text-center">Thông báo mới nhất <i className="fa fa-bell text-muted"></i></h3>

                <div className="notification-ui_dd-content">

                    {notify.data.length > 0 ? (
                        <>
                            <a href="#" style={{padding: "1rem"}} onClick={() => handleDeleteNotifies()}>Xoá tất cả thông báo</a>
                            {notify.data.map((item, index) => (
                                <div className={`notification-list ${item.status == 0 ? 'notification-list--unread' : ''}`} key={index} style={{cursor: "pointer", position: "relative"}}>
                                    <div className="notification-list_content" onClick={() => handleIsReadNotify(item)}>
                                        <div className="notification-list_img">
                                            <img src={item.source.avatar} alt="user" style={{objectFit: "cover"}}/>
                                        </div>
                                        <div className="notification-list_detail">
                                            <p>Từ: <b>{item.source.fullName}</b></p>
                                            <p className="text-muted">{item.content}</p>
                                            <p className="text-muted"><small>{moment(item.creatAt).fromNow()}</small></p>
                                        </div>
                                    </div>
                                    <div className="dropdown" style={{position: "absolute", right: 10, top: 0, bottom: 0}}>
                                        <span style={{fontSize: "2rem", fontWeight: "bold", cursor: "pointer", userSelect: "none"}} id="moreLink" data-bs-toggle="dropdown">...</span>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" style={{cursor: "pointer", userSelect: "none"}}>
                                                <span onClick={() => handleDeleteNotify(item)}>Xoá thông báo</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center">
                                <a href="#!" className="dark-link">Xem thêm</a>
                            </div>
                        </>
                    ) : (<div className="text-center">Chưa có thông báo nào</div>)}
                    
                </div>
                
            </div>
        </section>
    )
}

export default Notify