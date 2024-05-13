import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, deleteDataAPI, patchDataAPI } from '../../utils/fetchData'
import { createNotify } from './notifyAction'

export const ADMIN_TYPES = {
    GET_TOTAL_ACTIVE_USERS: "GET_TOTAL_ACTIVE_USERS",
    GET_ALL_USERS: "GET_ALL_USERS",
    GET_MONTHLY_DATA: "GET_MONTHLY_DATA",
    BLOCK_USER: "BLOCK_USER",
    UNBLOCK_USER: "UNBLOCK_USER"
}

export const getMonthlyData = (token) => async(dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI("admin/dashboard", token)
        console.log(res)
        dispatch({ type: ADMIN_TYPES.GET_MONTHLY_DATA, payload: res.data })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getAllUsers = (token) => async(dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI("admin/get_total_users", token)
        dispatch({ type: ADMIN_TYPES.GET_ALL_USERS, payload: res.data })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const blockUser = (user, token) => async(dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true})
        await patchDataAPI(`admin/user/${user.id}/block`, {}, token)
        user.status = 1
        dispatch({ type: ADMIN_TYPES.BLOCK_USER, payload: user })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false})
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const unblockUser = (user, token) => async(dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true})
        await patchDataAPI(`admin/user/${user.id}/unBlock`, {}, token)
        user.status = 0
        dispatch({ type: ADMIN_TYPES.UNBLOCK_USER, payload: user })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false})
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}