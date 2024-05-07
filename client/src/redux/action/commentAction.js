import { GLOBALTYPES } from "./globalTypes"
import { POST_TYPES } from "./postAction"
import { postDataAPI, deleteDataAPI } from "../../utils/fetchData"
import { createNotify } from "./notifyAction"
import { sendMessage } from "./socketAction"

export const createComment = ({post, newComment, auth, type}) => async(dispatch) => {

    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const data = {
            postId: post.id,
            ...newComment
        }

        const res = await postDataAPI("comment", data, auth.token)

        const newData = { ...res.data.newComment, user: auth.user }
        const newPost = { ...post, postComment: [...post.postComment, newData]}

        dispatch(sendMessage('/app/comment', newPost))

        const msg = {
            target: post.user, 
            content: `${auth.user.fullName} vừa bình luận vào bài post của bạn`, 
            link: `/post/${post.id}`
        }
        dispatch(createNotify(msg, auth))

        if(type === "profilePost") {
            dispatch({type: POST_TYPES.UPDATE_PROFILE_POST, payload: newPost})
        } else if(type === "detailPost") {
            dispatch({type: POST_TYPES.UPDATE_DETAIL_POST, payload: newPost})
        }  else {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        }
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const deleteComment = ({post, commentId, auth, type}) => async(dispatch) => {
    const newPost = {...post, postComment: post.postComment.filter(comment => comment.id !== commentId)}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })

        await deleteDataAPI(`comment/${commentId}`, auth.token)

        dispatch(sendMessage('/app/comment', newPost))

        if(type === "profilePost") {
            dispatch({type: POST_TYPES.UPDATE_PROFILE_POST, payload: newPost})
        } else if(type === "detailPost") {
            dispatch({type: POST_TYPES.UPDATE_DETAIL_POST, payload: newPost})
        } else {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        }
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}