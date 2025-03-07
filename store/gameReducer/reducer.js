import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: {},
  connected: false,
  loading: false
};

const { reducer, actions} = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers: (state, { payload: players }) => {
      state.players = players;
    },
    setLoading: (state, {payload: loading}) => {
      state.loading = loading;
    },
    joinGame: (state, action) => {
    },
    attack: (state, action) => {
    },
    disconnect: (state, action) => {
      state.connected = false;
      state.players = {};
    },
    setConnected: (state, {payload: connected}) => {
      state.connected = connected;
    }
  },
});

export const gameReducer = reducer;
export const gameActions = { ...actions };
