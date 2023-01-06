export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, onUserMessage, wsClose } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload.wsUrl);
      }
      if (type === wsClose) {
        socket.close()
      }
      if (socket && payload) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.message));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (payload.user) {
            dispatch(onUserMessage(restParsedData));
          } else {
            dispatch(onMessage(restParsedData))
          }
        };

        socket.onclose = () => {
          dispatch(onClose());
        };
      }

      next(action);
    };
  };
};
