import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI, getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { sendMessage } from "./socketAction";


export const MESSAGE_TYPES = {
    ADD_USER: "ADD_USER",
    ADD_RECIPIENT: "ADD_RECIPIENT",
    ADD_MESSAGE: "ADD_MESSAGE",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    GET_CONVERSATIONS: "GET_CONVERSATIONS",
    GET_MESSAGES: "GET_MESSAGES",
    GET_ACTIVE_USER: "GET_ACTIVE_USER",
};

export const addUser = ({ user, recipients }) => async (dispatch) => {
    const newRecipients = [...recipients, user]
    if(recipients.every(item => item.id !== user.id)){
        dispatch({type: MESSAGE_TYPES.ADD_USER, payload: newRecipients});
    }
};

export const addMessage = (auth, msg) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await postDataAPI('message', msg, auth.token)
        dispatch(sendMessage('/app/message', res.data))
        dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: res.data })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const updateMessageStatus = (auth, msgs) => async (dispatch) => {
    try {
        await patchDataAPI('message', msgs, auth.token)
        dispatch({ type: MESSAGE_TYPES.UPDATE_MESSAGE, payload: msgs})
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
    }
}

export const getConversations = (auth, page = 1) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI('messages', auth.token)
        dispatch({ type: MESSAGE_TYPES.GET_CONVERSATIONS, payload: res.data });
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getMessages = (auth, recipientId, page = 1) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI(`message/${recipientId}`, auth.token);
        dispatch({ type: MESSAGE_TYPES.GET_MESSAGES, payload: res.data });
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
};