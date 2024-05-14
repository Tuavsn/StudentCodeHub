import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
export const CODE_EXERCISE_TYPES = {
    CREATE_EXERCISE: "CREATE_EXERCISE",
    GET_EXERCISES: "GET_EXERCISES",
    GET_QUEUE_EXERCISES: "GET_QUEUE_EXERCISES",
    GET_EXERCISE: "GET_EXERCISE",
    DELETE_EXERCISE: "DELETE_EXERCISE",
    APPROVE_EXERCISE: "APPROVE_EXERCISE",
    UPDATE_EXERCISE: "UPDATE_EXERCISE",
}

export const updateExercise = ({ id, formFields, token }) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await postDataAPI(`code-exercise/${id}/update`, formFields, token)
        dispatch({ type: CODE_EXERCISE_TYPES.UPDATE_EXERCISE, payload: { id, updatedExercise: res.data.updatedExercise } })
        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Cập nhật không thành công"})
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const deleteExercise = ({ id, token }) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await deleteDataAPI(`code-exercise/${id}`, token)
        dispatch({ type: CODE_EXERCISE_TYPES.DELETE_EXERCISE, payload: id })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Xoá không thành công" })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }

}

export const getCodeExerCises = (token) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI('code-exercises', token)
        dispatch({ type: CODE_EXERCISE_TYPES.GET_EXERCISES, payload: { ...res.data } })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const getQueueCodeExercises = (token) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI('queue-code-exercises', token)
        dispatch({ type: CODE_EXERCISE_TYPES.GET_QUEUE_EXERCISES, payload: { ...res.data } })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const createCodeExercise = ({ codeExercise, token }) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await postDataAPI('code-exercises', codeExercise, token)
        console.log(res)
        dispatch({ type: CODE_EXERCISE_TYPES.CREATE_EXERCISE, payload: res.data.queueExercise })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: "Tạo bài code không thành công" })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const approveQueueExercise = ({ id, token }) => async dispatch => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })
        const res = await getDataAPI(`queue-code-exercise/${id}/approve`, token)
        dispatch({ type: CODE_EXERCISE_TYPES.DELETE_EXERCISE, payload: id })
        dispatch({ type: CODE_EXERCISE_TYPES.APPROVE_EXERCISE, payload: res.data.approvedExercise })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
    catch (err) {
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}