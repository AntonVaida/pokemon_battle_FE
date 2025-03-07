import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonApi } from "../../shared";

const initialState = {
  loading: false,
  error: null,
  pokemonList: [],
  allItemsReached: false,
  selectedPokemon: null
}

const getPokemonList = createAsyncThunk(
  'pokemon/getPokemonList',
  async ({ paginationLimit }, { dispatch }) => {
    try {
      dispatch(pokemonActions.setLoading(true))
      const data = await pokemonApi.getPokemonList(paginationLimit);
      
      if (data?.pokemonList?.length) {
        dispatch(pokemonActions.setPokemonList(data?.pokemonList))
      }
      
      dispatch(pokemonActions.setAllItemsReached(data?.allItemsReached))
    } catch (e) {
      dispatch(pokemonActions.setError(e))
    } finally {
      dispatch(pokemonActions.setLoading(false));
      dispatch(pokemonActions.setError(null));
    }
  }
)



const { reducer, actions } = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setLoading: (state, { payload: loading }) => {
      state.loading = loading;
    },
    setError: (state, { payload: error }) => {
      state.error = error;
    },
    setAllItemsReached: (state, { payload: allItemsReached}) => {
      state.allItemsReached = allItemsReached;
    },
    setPokemonList: (state, { payload: pokemonList }) => {
      state.pokemonList = pokemonList;
    },
    setSelectedPokemon: (state, { payload: selectedPokemon }) => {
      state.selectedPokemon = selectedPokemon
    }
  }
})

export const pokemonReducer = reducer;
export const pokemonActions = { ...actions, getPokemonList };