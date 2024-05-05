import { GLOBALTYPES } from "./globalTypes"
export const setSocketService = (socketService) => dispatch => {
    dispatch({
        type: GLOBALTYPES.SOCKET,
        payload: socketService
    })
}

export const sendMessage = (destination, body) => async (dispatch, getState) => {
  const socket = getState().socket.socket
  if (socket) {
    socket.send(destination, {}, JSON.stringify(body))
  }
}