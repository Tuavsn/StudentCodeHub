import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { sendMessage } from "./socketAction"

export const NOTIFY_TYPES = {
    GET_NOTIFIES: "GET_NOTIFIES",
    CREATE_NOTIFY: "CREATE_NOTIFY",
    DELETE_NOTIFY: "DELETE_NOTIFY",
    DELETE_NOTIFIES: "DELETE_NOTIFIES",
    UPDATE_NOTIFY: "UPDATE_NOTIFY",
    UPDATE_SOUND: "UPDATE_SOUND",
}

export const createNotify = (msg, auth) => async(dispatch) => {
    try {
        const res = await postDataAPI('notify', msg, auth.token )

        dispatch(sendMessage('/app/notify', res.data))

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
    }
}

export const deleteNotify = (notify, auth) => async(dispatch) => {
    try {
        await deleteDataAPI(`notify/${notify.id}`, auth.token)
        dispatch({ type: NOTIFY_TYPES.DELETE_NOTIFY, payload: notify })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
    }
}

export const deleteNotifies = (auth) => async(dispatch) => {
    try {
        await deleteDataAPI('notifies', auth.token)
        dispatch({ type: NOTIFY_TYPES.DELETE_NOTIFIES })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
    }
}


export const getNotifies = (auth) => async(dispatch) => {
    try {
        const res = await getDataAPI('notify', auth.token)
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
    }
}

export const isReadNotify = (msg, auth) => async(dispatch) => {
    try {
        await patchDataAPI(`notify`, msg, auth.token)
        dispatch({ type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: msg })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
    }
}