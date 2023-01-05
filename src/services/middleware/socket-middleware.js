export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, onUserMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload.wsUrl);
      }
      if (type === onClose.type) {
        socket.close()
      }
      if (socket) {
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
          if (payload?.user) {
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
