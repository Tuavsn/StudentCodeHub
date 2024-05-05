import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { sendMessage } from "./socketAction";

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    LOADING_POST: "LOADING_POST",
    GET_POSTS: "GET_POSTS",
    UPDATE_POST: "UPDATE_POST",
    DELETE_POST: "DELETE_POST",
    REPORT_POST: "REPORT_POST",
    SET_CURRENT_POST: "SET_CURRENT_POST",
    GET_PROFILE_POST: "SET_PROFILE_POST",
    UPDATE_PROFILE_POST: "UPDATE_PROFILE_POST",
    DELETE_PROFILE_POST: "DELETE_PROFILE_POST",
    UPDATE_DETAIL_POST: "UPDATE_DETAIL_POST",
    DELETE_DETAIL_POST: "DELETE_DETAIL_POST",
    GET_DETAIL_POST: "GET_POST"
}

export const createPost = ({ postImages, header, content, auth }) => async dispatch => {
    try {
    dispatch({ type: GLOBALTYPES.LOADING, payload: true })

    var imageList = []

    if(postImages.length > 0) {
        const formData = new FormData()

        postImages.forEach((image) => {
            formData.append('images', image)
        })
        
        imageList = await (await postDataAPI('images/save', formData, auth.token)).data.images

    }

    const res = await postDataAPI('posts', {imageList, header, content} , auth.token)
    
    dispatch({ type: POST_TYPES.CREATE_POST, payload: {...res.data.newPost, user: auth.user }})
    dispatch({ type: GLOBALTYPES.LOADING, payload: false })

    } catch (err) {
    dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg })
    dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getProfilePosts = (id, token) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI(`userPosts/${id}`, token)
        dispatch({ type: POST_TYPES.GET_PROFILE_POST, payload: {...res.data} })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getDetailPosts = (id, token) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI(`post/${id}`, token)
        dispatch({ type: POST_TYPES.GET_DETAIL_POST, payload: {...res.data} })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getHomePosts = (token) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI('posts/home', token)
        dispatch({ type: POST_TYPES.GET_POSTS, payload: {...res.data, page: 2} })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getExplorePosts = (token) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI('posts/explore', token)
        dispatch({ type: POST_TYPES.GET_POSTS, payload: {...res.data, page: 2} })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const updatePost = ({ post, header, content, postImages, isNewImage, auth, type }) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
    
        var imageList = []

        var res

        if(postImages.length > 0) {
            // add new image
            const formData = new FormData()
    
            postImages.forEach((image) => {
                formData.append('images', image)
            })
            
            imageList = await (await postDataAPI('images/save', formData, auth.token)).data.images
        }
        
        res = await patchDataAPI(`post/${post.id}`, {imageList, header, content, isNewImage}, auth.token)

        imageList = []

        if(post.postImage.length > 0 && isNewImage) {
            //delete previous image 
            await post.postImage.forEach(image => {
                imageList.push(image.imageUrl)
            })
            
            await deleteDataAPI(`images/${imageList}`)
        }

        if(type === "detailPost") {
            dispatch({ type: POST_TYPES.UPDATE_DETAIL_POST, payload: {...res.data.newPost}})
        } else {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: {...res.data.newPost}})
        }
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const deletePost = ({ post, auth, type}) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        if(type === "profilePost") {
            dispatch({ type: POST_TYPES.DELETE_PROFILE_POST, payload: post})
        } else if(type === "detailPost") {
            dispatch({ type: POST_TYPES.DELETE_DETAIL_POST, payload: post})
        } else {
            dispatch({ type: POST_TYPES.DELETE_POST, payload: post})
        }
        await deleteDataAPI(`post/${post.id}`, auth.token)
        var imageList = []
        await post.postImage.forEach(image => {
            imageList.push(image.imageUrl)
        })
        if(imageList.length > 0)
            await deleteDataAPI(`images/${imageList}`)
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const likePost = ({ post, auth, type }) => async dispatch => {
    const newPost = {...post, postLike: [...post.postLike, { user: { ...auth.user} }] }
    if(type === "profilePost") {
        dispatch({ type: POST_TYPES.UPDATE_PROFILE_POST, payload: newPost})
    } else if(type === "detailPost") {
        dispatch({ type: POST_TYPES.UPDATE_DETAIL_POST, payload: newPost})
    } else {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    }
    try {
        await patchDataAPI(`post/${post.id}/like`, null, auth.token)
        dispatch(sendMessage('/app/like', newPost))
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const unLikePost = ({ post, auth, type }) => async dispatch => {
    const newPost = {...post, postLike: post.postLike.filter(like => like.user.id !== auth.user.id)}
    if(type === "profilePost") {
        dispatch({ type: POST_TYPES.UPDATE_PROFILE_POST, payload: newPost})
    } else if(type === "detailPost") {
        dispatch({ type: POST_TYPES.UPDATE_DETAIL_POST, payload: newPost})
    } else {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    }
    try {
        await patchDataAPI(`post/${post.id}/unlike`, null, auth.token)
        dispatch(sendMessage('/app/like', newPost))

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const reportPost = () => async dispatch => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.message })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}


