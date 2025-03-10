import { gameActions } from "../gameReducer";
import { toast, Bounce } from "react-toastify";
import { authAPI } from "@/shared";

export const webSocketMiddleware = (store) => {
  let socket = null;
  let user = null;

  if (typeof window !== "undefined" && sessionStorage) {
    user = JSON.parse(sessionStorage.getItem("user"));
  }

  return (next) => async (action) => {
    switch (action.type) {
      case "game/joinGame": {
        store.dispatch(gameActions.setLoading(true));
        if (!socket || socket.readyState === WebSocket.CLOSED) {
          socket = new WebSocket(`${process.env.NEXT_PUBLIC_BASE_API_WS}?accessToken=${action?.payload?.accessToken}`);


          socket.onopen = () => {
            socket.send(JSON.stringify({ type: "JOIN_GAME", pokemon: {...action.payload }, userId: action?.payload?.userId}));
            store.dispatch(gameActions.setConnected(true));
          };

          socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
              case "UPDATE_STATE":
                store.dispatch(gameActions.setPlayers(data.players));
                break;
              case "PLAYER_JOINED":
                store.dispatch(gameActions.setPlayers(data.players));
                store.dispatch(gameActions.setLoading(false));
                break;
              case "ERROR":
                if (data?.message === 'jwt expired') {
                  const updatedUser = await authAPI.updateAccessToken({
                    accessToken: action?.payload?.accessToken, 
                    refreshToken: user?.refreshToken, 
                    address: user?.address 
                  })

                  if (typeof window !== "undefined" && updatedUser && Object.keys(updatedUser)?.length && sessionStorage) {
                    sessionStorage.setItem("user", JSON.stringify(updatedUser));
                  }
                } else {
                  toast.error(`${data?.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
                }
                break;
              default:
                toast.error(`Unknown message type:`, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
            }
          };

          socket.onerror = (error) => {
            toast.error(`${error?.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          };

          socket.onclose = () => {
            socket = null;
            store.dispatch(gameActions.setConnected(false));
          };
        }
        break;
      }

      case "game/attack": {
        store.dispatch(gameActions.setLoading(true));
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ 
            type: "ATTACK", 
            attackerId: "yourPokemon", 
            targetId: "opponent", 
            userId: action.payload.userId, 
            attackPowerValueNumber: 
            action.payload.attackPowerValueNumber, 
          }));
        }
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ 
            type: "ATTACK", 
            attackerId: "opponent", 
            targetId: "yourPokemon", 
            userId: action.payload.userId
          }));
        }
        store.dispatch(gameActions.setLoading(false));
        break;
      }

      case "game/disconnect": {
        if (socket) {
          socket.send(JSON.stringify({ type: "DISCONNECT", userId: action.payload.userId }));
          socket.close();
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
