import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { updateMessageStatus } from "../../../redux/action/messageAction"
import ChatDetail from "./ChatDetail";

const Chat = () => {

    const { auth, userMessage } = useSelector((state) => state)
    const [search, setSearch] = useState('')
    const [searchUser, setSearchUser] = useState()
    const [currentRecipient, setCurrentRecipient] = useState(null)
    const [isHover, setIsHover] = useState(null)
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddUserMessage = (recipient) => {
        setSearch('')
        setSearchUser([])
        userMessage.messages.filter((message) => 
            message.source.id === recipient.id && message.target.id === auth.user.id && message.status === 0
        ).map((item) => item.status = 1)
        dispatch(updateMessageStatus(auth, userMessage.messages))
        setCurrentRecipient(recipient)
    }

    const isActiveUser = (userId) => {
        return userMessage.activeUser.find(user => user.id === userId);
    }

    return (
        <main className="content flex-grow-1 h-100" style={{overflow: "hidden"}}>
            <div className="w-100 row g-0 h-100">
                {/* Recipient List */}
                <div className="col-12 col-lg-5 col-xl-3 border-right h-100" style={{overflowY: "scroll"}}>

                    <div className="px-1 d-none d-md-block">
                        <div className="d-flex align-items-stretch my-2">
                            <input type="text" className="form-control" placeholder="Tìm kiếm..." />
                            <button 
                            className="d-flex align-items-center"
                            style={{border: "none", borderRadius: "10%", backgroundColor: "#0D6EFD", margin: "0 .2rem", color: "#fff"}} data-bs-toggle="modal" data-bs-target="#newMsgModal">
                                <i className="fa-solid fa-plus mr-1"></i>
                                <i className="fa-regular fa-envelope"></i>
                            </button>
                        </div>
                    </div>

                    {
                        userMessage.recipients.map((recipient, index) => (
                            <div key={index} onClick={() => handleAddUserMessage(recipient)}>
                                <div style={{cursor: "pointer"}} className="list-group-item list-group-item-action border-0 py-2">
                                    {
                                        userMessage.messages.filter((message) => {
                                            return message.source.id === recipient.id && message.target.id === auth.user.id && message.status === 0
                                        }).length > 0 && (
                                            <div className="badge bg-success float-right">
                                                {
                                                    userMessage.messages.filter((message) => {
                                                        return message.source.id === recipient.id && message.target.id === auth.user.id && message.status === 0
                                                    }).length
                                                }
                                            </div>
                                        )
                                    }
                                    <div className="d-flex align-items-start">
                                        <img style={{objectFit: "cover"}} src={`${imageApiUrl}/${recipient.avatar}`} className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40"/>
                                        <div className="flex-grow-1 ml-3">
                                            {recipient.fullName}
                                            {isActiveUser(recipient.id) ? (
                                                <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                                            ) : (
                                                <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr className="d-block d-lg-none mt-1 mb-0"/>
                            </div>
                        ))
                    }

                    
                </div>

                <div className="col-12 col-lg-7 col-xl-9 h-100">
                   {currentRecipient &&  (
                        <>
                            <div className="py-2 px-4 border-bottom d-none d-lg-block" style={{position: "sticky", top: 0, left: 0, right: 0, backgroundColor: "#fff", zIndex: 1}}>
                                <div className="d-flex align-items-center py-1">
                                    <div className="position-relative h-100">
                                        <img style={{objectFit: "cover"}} src={`${imageApiUrl}/${currentRecipient.avatar}`} className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
                                    </div>
                                    <div className="flex-grow-1 pl-3">
                                        <strong className={`${isHover === currentRecipient.id ? 'text-primary': ''}`} 
                                            style={{cursor: "pointer"}} 
                                            onMouseEnter={() => setIsHover(currentRecipient.id)} onMouseLeave={() => setIsHover(null)}
                                            onClick={() => navigate(`/user/${currentRecipient.id}`)}>
                                            {currentRecipient.fullName}
                                        </strong>
                                        {isActiveUser(currentRecipient.id) ? (
                                            <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                                        ) : (
                                            <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
                                        )}
                                    </div>
                                    <div>
                                        <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                                    </div>
                                </div>
                            </div>
                            {/* Message Detail */}
                            <ChatDetail recipient={currentRecipient}/>
                        </>
                    )}
                </div>

                <div className="modal fade" id="newMsgModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title flex-grow-1 text-center" id="exampleModalLongTitle">Tạo mesage mới</h5>
                            </div>
                            <div className="modal-body" style={{overflowY: "scroll"}}>
                                <h5>Followers</h5>
                                {auth.followers.map((item, index) => (
                                    <div key={index} style={{cursor: "pointer", display: "flex", alignItems: "center", gap: "2rem", margin: "1rem"}} data-bs-dismiss="modal" onClick={() => handleAddUserMessage(item.source)}>
                                        <img src={`${imageApiUrl}/${item.source.avatar}`} style={{width: "2rem", height: "2rem", borderRadius: "10%", objectFit: "cover"}} />
                                        {item.source.fullName}
                                    </div>
                                ))}
                                <h5>Following</h5>
                                {auth.following.map((item, index) => (
                                    <div key={index} style={{cursor: "pointer", display: "flex", alignItems: "center", gap: "2rem", margin: "1rem"}} data-bs-dismiss="modal" onClick={() => handleAddUserMessage(item.target)}>
                                        <img src={`${imageApiUrl}/${item.target.avatar}`} style={{width: "2rem", height: "2rem", borderRadius: "10%", objectFit: "cover"}} />
                                        {item.target.fullName}
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chat