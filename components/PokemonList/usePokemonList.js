import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInfinityScroll } from "@/hooks";
import { gameActions } from "@/store/gameReducer";
import { 
  pokemonActions, 
  getPokemonList, 
  getPokemonSelected,
  getPokemonLoading,
  getAllItemsReached
 } from "@/store/pokemonReducer";

export const usePokemonList = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(getPokemonList);
  const selectedPokemon = useSelector(getPokemonSelected);
  const pokemonLoading = useSelector(getPokemonLoading);
  const allItemsReached = useSelector(getAllItemsReached);
  const observerRef = useRef(null);
  const { paginationLimit } = useInfinityScroll({  
    ref: observerRef, 
    loading: pokemonLoading, 
    allItemsReached
  })

  useEffect(() => {
    dispatch(pokemonActions.getPokemonList({paginationLimit}));
    dispatch(gameActions.setLoading(false));
  }, [dispatch, paginationLimit])

  const selectPokemonHandler = (pokemon) => {
    if (pokemon) {
       dispatch(pokemonActions.setSelectedPokemon(pokemon))
    }
  }

  return {
    pokemonList,
    selectPokemonHandler,
    selectedPokemon,
    pokemonLoading,
    observerRef,
    allItemsReached
  }
}