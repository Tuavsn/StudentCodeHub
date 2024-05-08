import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/action/authAction"
import { getConversations, getMessages} from "../../../redux/action/messageAction";
import { getNotifies } from "../../../redux/action/notifyAction";
import { getHomePosts, getExplorePosts } from "../../../redux/action/postAction"
import Logo from "../../../images/icon.png"
import Main from "../main/Main"
import UserManagement from "../userManagement/UserManagement"
import SpamManagement from "../spamManagement/SpamManagement"
import AdminProfile from "../adminProfile/AdminProfile"
import Posts from "../../common/post/Posts"
import RightSideBar from "../../common/rightSideBar/RightSideBar"
import InputPost from "../../common/post/InputPost"
import UpdatePost from "../../common/post/UpdatePost"
import Chat from "../../common/chat/Chat"
import Notify from "../../common/notify/Notify"
import Search from "../../common/search/Search"
import PracticeLanding from "../../common/codePractice/PracticeLanding"

const LeftSideBar = () => {
    const [adminMenu, setAdminMenu] = useState(1)
    const { auth, homePosts, userMessage, notify } = useSelector((state) => state)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [userMessage.messages, userMessage.recipients])

    useEffect(() => {
        if(userMessage.messages.length > 0) return ;
        userMessage.recipients.map((recipient) => {
            dispatch(getMessages(auth, recipient.id))
        })
      },[dispatch, auth, userMessage.recipients])
    
    useEffect(() => {
    if(userMessage.firstLoad) return ;
    dispatch(getConversations(auth))
    },[dispatch, auth, userMessage.firstLoad])

    useEffect(() => {
        if(notify.data.length > 0) return ;
        dispatch(getNotifies(auth))
    }, [])

    useEffect(() => {
        if(adminMenu === 1) {
            dispatch(getHomePosts(auth.token))
        } else if (adminMenu === 2) {
            dispatch(getExplorePosts(auth.token))
        }
    }, [adminMenu])


    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 rounded" style={{width: "280px", height: "100%"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src={Logo} className="bi me-2" width="80" />
                    <span className="fs-5" style={{ color: "#2F56A6", fontWeight: "bold" }}>
                        StudentCodeHub
                    </span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 1 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(1) }}>
                            <i className="fa-solid fa-house-user" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 2 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(2) }}>
                            <i className="fa-regular fa-newspaper" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Khám phá
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 3 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(3) }}>
                            <i className="fa-regular fa-message" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Tin nhắn
                            {userMessage.messages.filter(message => {return message.target.id === auth.user.id && message.status === 0}).length > 0 ? (
                                <i className="fa-solid fa-circle-info px-2 text-danger" style={{fontSize: "1rem", opacity: .8}}></i>
                            ):(
                                <></>
                            )}
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 4 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(4) }}>
                            <i className="fa-regular fa-bell" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Thông báo
                            {notify.data.filter(item => {return item.target.id === auth.user.id && item.status === 0}).length > 0 ? (
                                <i className="fa-solid fa-circle-info px-2 text-danger" style={{fontSize: "1rem", opacity: .8}}></i>
                            ):(
                                <></>
                            )}
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 5 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(5) }}>
                            <i className="fa-solid fa-code" style={{ fontSize: "1rem", paddingRight: "30px" }}></i>
                            Đề giải thuật
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 6 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(6) }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Tìm kiếm
                        </a>
                    </li>
                    <li className="">
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 7 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(7) }}>
                            <i className="fa-solid fa-list-check" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 8 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(8) }}>
                            <i className="fa-regular fa-user" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Quản lý tài khoản
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${adminMenu === 9 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setAdminMenu(9) }}>
                            <i className="fa-solid fa-circle-exclamation" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Post vi phạm
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={auth.user.avatar} alt="" width="40" height="40" className="rounded me-2 object-fit-cover" />
                        <strong>{auth.user.fullName}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><a className="dropdown-item" href="#">Cài đặt</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setAdminMenu(10) }}>Thông tin</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><p className="dropdown-item" style={{ marginBottom: 0, cursor: "pointer" }} onClick={() => dispatch(logout())}>Đăng xuất</p></li>
                    </ul>
                </div>
            </div>

            {adminMenu === 1 && (
                <>
                    <InputPost />
                    <UpdatePost />
                    {homePosts.result === 0 ?
                        <h4 className="text-center w-100 py-4">Không có bài đăng nào</h4> 
                        : <Posts />}
                    <div style={{width: "400px", height: "100%"}}>
                        <RightSideBar />
                    </div>
                </>
            )}
            {adminMenu === 2 && (
                <>
                    <InputPost />
                    <UpdatePost />
                    {homePosts.result === 0 ?
                        <h4 className="text-center w-100 py-4">Không có bài đăng nào</h4>
                        : <Posts />}
                    <div className="col-md-2">
                        <RightSideBar />
                    </div>
                </>
            )}
            {adminMenu === 3 && <Chat />}
            {adminMenu === 4 && <Notify />}
            {adminMenu === 5 && <PracticeLanding />}
            {adminMenu === 6 && <Search />}
            {adminMenu === 7 && <Main />}
            {adminMenu === 8 && <UserManagement />}
            {adminMenu === 9 && <SpamManagement />}
            {adminMenu === 10 && <AdminProfile />}
        </>
    )
}

export default LeftSideBar