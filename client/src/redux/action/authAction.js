import { postDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes";

export const TYPES = {
    AUTH: "AUTH"
}

export const login = (data) => async(dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })

        const res = await postDataAPI("auth/login", data)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: { token: "Bearer " + res.data.access_token, user: res.data.user }
        })

        dispatch({
            type: GLOBALTYPES.USER_TYPE,
            payload: res.data.user.role
        })

        dispatch({ type: GLOBALTYPES.LOADING, payload: false })

        localStorage.setItem("firstLogin", true)
        localStorage.setItem("accessToken", "Bearer " + res.data.access_token)
        localStorage.setItem("refreshToken", "Bearer " + res.data.refresh_token)

        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const regist = (data) => async(dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })

        const res = await postDataAPI("auth/regist", data)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: { token: "Bearer " + res.data.access_token, user: res.data.user }
        })

        dispatch({
            type: GLOBALTYPES.USER_TYPE,
            payload: res.data.user.role
        })

        dispatch({ type: GLOBALTYPES.LOADING, payload: false })

        localStorage.setItem("firstLogin", true)
        localStorage.setItem("accessToken", "Bearer " + res.data.access_token)
        localStorage.setItem("refreshToken", "Bearer " + res.data.refresh_token)

        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const logout = () => async(dispatch) => {
    try {
        localStorage.removeItem("firstLogin")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        await postDataAPI("auth/logout")
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
    }
}

export const getUserInfo = () => async(dispatch) => {

    const firstLogin = localStorage.getItem("firstLogin")

    if(firstLogin) {
        const accessToken = localStorage.getItem("accessToken")
        try {
            const res = await postDataAPI("auth/get-user-info", null, accessToken)

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: { token: accessToken, user: res.data.user }
            })

            dispatch({
                type: GLOBALTYPES.USER_TYPE,
                payload: res.data.user.role
            })

        } catch (err) {
            if(err.response.status === 401) {
                dispatch(refreshToken())
            } else {
                dispatch({
                    type: GLOBALTYPES.ERROR_ALERT,
                    payload: err.response.data.msg
                })
            }
        }
    }
}

const refreshToken = () => async(dispatch) => {
    const refreshToken = localStorage.getItem("refreshToken")
    try {
        var res = await postDataAPI("auth/refresh-token", null, refreshToken)

        const accessToken = "Bearer " + res.data.access_token
 
        localStorage.setItem("accessToken", accessToken)

        res = await postDataAPI("auth/get-user-info", null, accessToken)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: { token: accessToken, user: res.data.user }
        })

        dispatch({
            type: GLOBALTYPES.USER_TYPE,
            payload: res.data.user.role
        })
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
    }
}