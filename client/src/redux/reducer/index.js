import { combineReducers } from "redux";

import auth from './authReducer'
import userType from './userTypeReducer'

export default combineReducers({
    auth,
    userType,
})