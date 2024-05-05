import { GLOBALTYPES } from "../action/globalTypes";

const initialState = {
    loading: false,
    error: null,
    success: null
}

const alertReducer = (state = initialState, action) => {
    switch(action.type) {
        case GLOBALTYPES.ERROR_ALERT:
            return {
                ...state,
                success: null,
                error: action.payload
            }
        
        case GLOBALTYPES.SUCCESS_ALERT:
            return {
                ...state,
                error: null,
                success: action.payload
            }
        
        case GLOBALTYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case GLOBALTYPES.RESET_ALERT:
            return {
                ...state,
                error: null,
                success: null
            }
        
        default:
            return state
    }
}

export default alertReducer