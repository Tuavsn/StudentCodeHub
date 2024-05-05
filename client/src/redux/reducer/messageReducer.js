import { MESSAGE_TYPES } from "../action/messageAction";

const initialState = {
    recipients: [],
    messages: [],
    activeUser: [],
    firstLoad: false 
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.ADD_USER:
      return {
        ...state,
        recipients: [...state.recipients, action.payload],
      };

    case MESSAGE_TYPES.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case MESSAGE_TYPES.UPDATE_MESSAGE:
      return {
        ...state,
        messages: action.payload
      }

    case MESSAGE_TYPES.ADD_RECIPIENT:
      return {
        ...state,
        recipients: [...state.recipients, action.payload]
      };

    case MESSAGE_TYPES.GET_CONVERSATIONS:
        return {
            ...state,
            recipients: action.payload.recipients,
            // resultUsers: action.payload.result,
            firstLoad: true
        };

    case MESSAGE_TYPES.GET_MESSAGES:
        return {
            ...state,
            messages: [...state.messages, ...action.payload.messages],
        };
      
    case MESSAGE_TYPES.GET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.payload
      }

    default:
        return state;
  }
};

export default messageReducer;
