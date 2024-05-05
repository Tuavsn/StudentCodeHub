import { GLOBALTYPES } from "../action/globalTypes";

const initialState = {
    token: '',
    user: null,
    followers: [],
    following: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case GLOBALTYPES.AUTH:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                followers: action.payload.followers,
                following: action.payload.following
            }
        default:
            return state
    }
}

export default authReducer