import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { over } from "stompjs"
import SockJS from "sockjs-client";

import audioTone from "./audio/pristine-609.mp3"
import { GLOBALTYPES } from "./redux/action/globalTypes";
import { setSocketService } from "./redux/action/socketAction";
import { POST_TYPES } from "./redux/action/postAction";
import { MESSAGE_TYPES } from "./redux/action/messageAction";
import { NOTIFY_TYPES } from "./redux/action/notifyAction";
import { getConversations } from "./redux/action/messageAction";

const SocketClient = ({ children }) => {
    const { auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const audioRef = useRef()
    const socketApiUrl = process.env.REACT_APP_SOCKET_URL
    var stompClient = null

    const onConnected = () => {
        dispatch(setSocketService(stompClient))
        stompClient.subscribe('/notify/activeUser', getActiveUser)
        stompClient.subscribe('/comment', getCurrentComment)
        stompClient.subscribe('/like', getCurrentLike)
        stompClient.subscribe('/message')
        if(auth.user) {
            stompClient.subscribe(`/user/${auth.user.id}/message`, getCurrentMessages)
            stompClient.subscribe(`/user/${auth.user.id}/notify`, getCurrentNotifies)
        }
        userJoin()
    }

    //!ActiveUser
    const getActiveUser = (payload) => {
        dispatch({
            type: MESSAGE_TYPES.GET_ACTIVE_USER,
            payload: JSON.parse(payload.body)
        })
    }

    //!CurrentNotifies
    const getCurrentNotifies = (payload) => {
        dispatch({
            type: NOTIFY_TYPES.CREATE_NOTIFY,
            payload: JSON.parse(payload.body)
        })
    }

    //!CurrentMsg
    const getCurrentMessages = (payload) => {
        dispatch({
            type: MESSAGE_TYPES.ADD_MESSAGE,
            payload: JSON.parse(payload.body)
        })
        dispatch(getConversations(auth))
    }

    //!CurrentComment 
    const getCurrentComment = (payload) => {
        dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: JSON.parse(payload.body)
        })
    }

    // !CurrentLike
    const getCurrentLike = (payload) => {
        dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: JSON.parse(payload.body)
        })
    }

    const onError = (err) => {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err
        })
    }
    
    const userJoin = () => {
        if(auth.user !== null)
            stompClient.send("/app/activeUser", {}, JSON.stringify(auth.user))
    }

    const getConnect = async () => {
        const Sock = new SockJS(`${socketApiUrl}`)
        stompClient = over(Sock)
        // stompClient.debug = null
        await stompClient.connect({}, onConnected, onError)
        return () => {
            if(stompClient) {
                stompClient.disconnect()
            }
        }
    }

    // !Connection
    useEffect(() => {
        getConnect()
    }, [ dispatch, auth ])


    return (
        <>
            <audio controls ref={audioRef} style={{ display: "none"}}>
                <source src={audioTone} type="audio/mp3" />
            </audio>
            {children}
        </>
    )
}

export default SocketClient