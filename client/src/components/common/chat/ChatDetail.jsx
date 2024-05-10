import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import 'moment/locale/vi'
import { addMessage } from "../../../redux/action/messageAction"
import { MESSAGE_TYPES } from "../../../redux/action/messageAction";

const ChatDetail = ({recipient}) => {

    const { auth, userMessage } = useSelector(state => state)

    const dispatch = useDispatch()

    const [image, setImage] = useState(null)

    const [newMsg, setNewMsg] = useState([])

    const messagesContainerRef = useRef(null);

    const imageApiUrl = process.env.REACT_APP_IMAGE_URL

    moment.locale('vi')

    const handleInputChange = (e) => {
        const messageData = {target: recipient, content: e.target.value, image: image};
        setNewMsg(messageData);
    }

    const handleSendMessage = () => {
        const foundRecipient = userMessage.recipients.find(existRecipient => existRecipient.id === recipient.id)
        if(foundRecipient) {
            dispatch(addMessage(auth, newMsg));
        } else {
            dispatch(addMessage(auth, newMsg));
            dispatch({ type: MESSAGE_TYPES.ADD_RECIPIENT, payload: recipient })
        }
        const msgInput = document.getElementById('msgInput');
        msgInput.value = ''
    }

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [userMessage.messages])

    return (
        <>
            {/* Messages */}
            <div className="position-relative h-100">
                <div className="chat-messages p-4 h-100" style={{overflowY: "scroll"}} ref={messagesContainerRef}>

                    {userMessage.messages.filter((message) => {
                        return message.source.id === recipient.id || message.target.id === recipient.id
                    }).map((filterMessage, index) => (
                        <div key={index} className={`${filterMessage.source.id === auth.user.id ? 'chat-message-right' : 'chat-message-left'} pb-4 align-items-start w-100`}>
                            <div>
                                <img style={{objectFit: "cover"}} src={`${imageApiUrl}/${filterMessage.source.avatar}`} className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"/>
                            </div>
                            <div 
                            className={`bg-light rounded py-2 px-3 mr-3 ${filterMessage.source.id === auth.user.id ? 'text-end' : 'text-start'}`}
                            style={{minWidth: 0, overflowWrap: "break-word"}}
                            >
                                <div className="font-weight-bold mb-1">
                                    <strong>{filterMessage.source.fullName}</strong>
                                </div>
                                <div style={{overflow: "hidden"}}>{filterMessage.content}</div>
                                <div className="text-muted small text-nowrap mt-2">
                                    {moment(filterMessage.createAt).format('llll')}
                                    {
                                        filterMessage.status === 1 ? <i className="fa-solid fa-eye px-2" style={{fontSize: ".6rem", opacity: .8}}></i> : <i className="fa-solid fa-eye-slash px-2" style={{fontSize: ".6rem", opacity: .8}}></i>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}

                    <div style={{marginBottom: "8rem"}}></div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top" style={{position: "sticky", bottom: 0, left: 0, right: 0, backgroundColor: "#fff"}}>
                    <div className="input-group">
                        <input id="msgInput" type="text" className="form-control" placeholder="Type your message" onChange={handleInputChange}/>
                        <button className="btn btn-primary" onClick={handleSendMessage}>Gửi</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatDetail