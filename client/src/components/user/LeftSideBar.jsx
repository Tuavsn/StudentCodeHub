import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/action/authAction"
import Logo from "../../images/icon.png"
import Posts from "../common/post/Posts"
import UserProfile from "./userProfile/UserProfile"
import RightSideBar from "../common/rightSideBar/RightSideBar"
import InputPost from "../common/post/InputPost"
import UpdatePost from "../common/post/UpdatePost"
import Chat from "../common/chat/Chat"
import { getConversations, getMessages} from "../../redux/action/messageAction";
import Search from "../common/search/Search"
import { getExplorePosts, getHomePosts } from "../../redux/action/postAction"

const LeftSideBar = () => {
    const [userMenu, setUserMenu] = useState(1)
    const { auth, userMessage } = useSelector((state) => state)
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
        if(userMenu === 1) {
            dispatch(getHomePosts(auth.token))
        } else if (userMenu === 2) {
            dispatch(getExplorePosts(auth.token))
        }
    }, [userMenu])

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
                    <li className="nav-item">
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${userMenu === 1 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setUserMenu(1) }}>
                            <i className="fa-solid fa-house-user" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${userMenu === 2 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setUserMenu(2) }}>
                            <i className="fa-regular fa-newspaper" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Khám phá
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${userMenu === 3 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setUserMenu(3) }}>
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
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${userMenu === 4 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setUserMenu(4) }}>
                            <i className="fa-regular fa-bell" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Thông báo
                        </a>
                    </li>
                    <li>
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${userMenu === 5 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setUserMenu(5) }}>
                            <i className="fa-solid fa-code" style={{ fontSize: "1rem", paddingRight: "30px" }}></i>
                            Luyện code
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" style={{ padding: "1rem" }} className={`nav-link ${userMenu === 0 ? "active" : "link-dark"}`} onClick={(e) => { e.preventDefault(); setUserMenu(0) }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "1.4rem", paddingRight: "30px" }}></i>
                            Tìm kiếm
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
                        <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setUserMenu(6) }}>Thông tin</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><p className="dropdown-item" style={{ marginBottom: 0, cursor: "pointer" }} onClick={() => dispatch(logout())}>Đăng xuất</p></li>
                    </ul>
                </div>
            </div>
            {userMenu === 0 && <Search />}
            {userMenu === 1 && (
                <>
                    <InputPost />
                    <UpdatePost />
                    <Posts />
                    <div className="col-md-2">
                        <RightSideBar />
                    </div>
                </>
            )}
            {userMenu === 2 && (
                <>
                    <InputPost />
                    <UpdatePost />
                    <Posts />
                    <div className="col-md-2">
                        <RightSideBar />
                    </div>
                </>
            )}
            {userMenu === 3 && <Chat />}
            {userMenu === 4 }
            {userMenu === 5 }
            {userMenu === 6 && <UserProfile />}
        </>
    )
}

export default LeftSideBar