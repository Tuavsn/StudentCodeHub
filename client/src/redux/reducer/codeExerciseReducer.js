import { CODE_EXERCISE_TYPES } from "../action/codeExerciseAction";
import { DeleteData } from "../action/globalTypes";

const initialState = {
    codeExercises: [],
    totalItems: 0,
    queueExercises: []
}

const codeExerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CODE_EXERCISE_TYPES.CREATE_EXERCISE:
            return {
                ...state,
                queueExercises: [action.payload, ...state.queueExercises]
            }
        case CODE_EXERCISE_TYPES.GET_QUEUE_EXERCISES:
            return {
                ...state,
                queueExercises: action.payload.queueExercises,
                totalItems: action.payload.totalItems
            }

        case CODE_EXERCISE_TYPES.DELETE_EXERCISE:
            return {
                ...state,
                totalItems: state.totalItems - 1,
                codeExercises: DeleteData(state.codeExercises, action.payload),
                queueExercises: DeleteData(state.queueExercises, action.payload)
            }

        case CODE_EXERCISE_TYPES.GET_EXERCISES:
            return {
                ...state,
                codeExercises: action.payload.codeExercises,
                totalItems: action.payload.totalItems
            }


        default:
            return state
    }
}

export default codeExerciseReducer