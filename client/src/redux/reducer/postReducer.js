import { POST_TYPES } from "../action/postAction";
import { EditData, DeleteData } from "../action/globalTypes";

const initialState = {
    currentPost: null,
    profilePosts: [],
    posts: [],
    detailPost: null,
    result: 0,
    page: 2
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                result: state.result+1,
                posts: [action.payload, ...state.posts]
            }

        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload.id, action.payload)
            }

        case POST_TYPES.DELETE_POST:
            return {
                ...state,
                result: state.result-1,
                posts: DeleteData(state.posts, action.payload.id)
            }
        
        case POST_TYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result : action.payload.result,
                page: action.payload.page
            }
        
        case POST_TYPES.SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload.post
            }

        case POST_TYPES.GET_PROFILE_POST:
            return {
                ...state,
                profilePosts: action.payload.posts
            }

        case POST_TYPES.UPDATE_PROFILE_POST:
            return {
                ...state,
                profilePosts: EditData(state.profilePosts, action.payload.id, action.payload)
            }
        
        case POST_TYPES.DELETE_PROFILE_POST:
            return {
                ...state,
                result: state.result-1,
                profilePosts: DeleteData(state.profilePosts, action.payload.id)
            }

        case POST_TYPES.GET_DETAIL_POST:
            return {
                ...state,
                detailPost: action.payload.post
            }

        case POST_TYPES.UPDATE_DETAIL_POST:
            return {
                ...state,
                detailPost: action.payload
            }
        
        case POST_TYPES.DELETE_DETAIL_POST:
            return {
                ...state,
                result: state.result-1,
                detailPost: null
            }

        default:
            return state
    }
}

export default postReducer