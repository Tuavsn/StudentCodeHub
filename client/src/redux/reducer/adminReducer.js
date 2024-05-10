import { ADMIN_TYPES } from "../action/adminAction";
import { DeleteData, EditData } from "../action/globalTypes";

const initialState = {
    all_users: [],
    total_users: 0,
    total_posts: 0,
    total_code_excercises: 0,
    total_code_submission: 0,
    monthly_data: null
}

const adminReducer = (state = initialState, action) => {
    switch( action.type ){
        case ADMIN_TYPES.GET_MONTHLY_DATA:
            return {
                ...state,
                total_users: action.payload.totalUsers,
                total_posts: action.payload.totalPosts,
                total_code_excercises: action.payload.totalCodeExercises,
                total_code_submission: action.payload.totalCodeSubmissions,
                monthly_data: action.payload.monthlyData
            }

        case ADMIN_TYPES.GET_ALL_USERS:
            return {
                ...state,
                all_users: action.payload
            }

        case ADMIN_TYPES.DELETE_POST:
            return {
                ...state,
                spam_posts: DeleteData(state.spam_posts, action.payload._id)
            }

        case ADMIN_TYPES.BLOCK_USER:
            return {
                ...state,
                all_users: EditData(state.all_users, action.payload.id, action.payload)
            }
        
        case ADMIN_TYPES.UNBLOCK_USER:
            return {
                ...state,
                all_users: EditData(state.all_users, action.payload.id, action.payload)
            }

        default:
            return state
    }
}

export default adminReducer