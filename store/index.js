import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './gameReducer'
import { webSocketMiddleware } from './middlewares'
import { pokemonReducer } from './pokemonReducer'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    pokemon: pokemonReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
})