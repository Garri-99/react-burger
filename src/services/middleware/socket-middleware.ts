import { Middleware, MiddlewareAPI } from "redux";
import { TwsActions } from "../slices/socket-slice";
import { TAppDispatch, TRootState } from "../store";

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        onUserMessage,
        wsClose,
      } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload.wsUrl);
      }
      if (type === wsClose && socket) {
        socket.close();
      }
      if (socket && payload) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (err) => {
          dispatch(onError(err.AT_TARGET));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (payload.user) {
            dispatch(onUserMessage(restParsedData));
          } else {
            dispatch(onMessage(restParsedData));
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
