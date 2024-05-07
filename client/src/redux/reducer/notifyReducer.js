import { NOTIFY_TYPES } from "../action/notifyAction";
import { EditData } from "../action/globalTypes";

const initialState = {
  data: [],
  sound: false,
}


const notifyReducer = (state = initialState , action) => {
  switch (action.type) {
    case NOTIFY_TYPES.GET_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };

    case NOTIFY_TYPES.CREATE_NOTIFY:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case NOTIFY_TYPES.DELETE_NOTIFY:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id)
      };

    case NOTIFY_TYPES.DELETE_NOTIFIES:
      return {
        ...state,
        data: []
      };

    case NOTIFY_TYPES.UPDATE_NOTIFY:
      return {
        ...state,
        data: EditData(state.data, action.payload.id, action.payload),
      };

    case NOTIFY_TYPES.UPDATE_SOUND:
      return {
        ...state,
        sound: action.payload,
      };

    default:
      return state;
  }
};

export default notifyReducer;
