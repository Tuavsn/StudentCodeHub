import { combineReducers } from "redux";

import auth from './authReducer'
import userType from './userTypeReducer'
import alert from './alertReducer'
import socket from './socketReducer'
import homePosts from './postReducer'
import userMessage from './messageReducer'

export default combineReducers({
    auth,
    userType,
    socket,
    alert,
    homePosts,
    userMessage,
})