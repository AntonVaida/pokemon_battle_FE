import { gameActions } from "../gameReducer";
import { toast, Bounce } from "react-toastify";

export const webSocketMiddleware = (store) => {
  let socket = null;

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

          socket.onmessage = (event) => {
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
                break;
              default:
                console.warn("⚠️ Невідомий тип повідомлення:", data);
            }
          };

          socket.onerror = (error) => {
            console.log("❌ Помилка WebSocket:", error);
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
