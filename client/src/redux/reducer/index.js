import { combineReducers } from "redux";

import auth from './authReducer'
import userType from './userTypeReducer'
import alert from './alertReducer'
import socket from './socketReducer'
import homePosts from './postReducer'
import userMessage from './messageReducer'
import notify from './notifyReducer'
import admin from './adminReducer'
import codeExercises from './codeExerciseReducer'

export default combineReducers({
    admin,
    auth,
    userType,
    socket,
    alert,
    homePosts,
    userMessage,
    notify,
    codeExercises
})