"use client"
import { PokemonCard } from "../PokemonCard";
import { usePokemonList } from "./usePokemonList";
import { Loader } from "../Loader";

export const PokemonList = () => {
const {
  pokemonList,
  selectPokemonHandler,
  selectedPokemon,
  pokemonLoading,
  observerRef,
  allItemsReached
} = usePokemonList();

  return (
    <div className="flex justify-center w-full min-h-[100vh] px-[32px] bg-white">
      {(pokemonLoading && !pokemonList?.length) ? (
        <div className="w-full min-h-[100vh] flex justify-center items-center">
          <Loader width={56} height={56} />
        </div>
      ) : (
        <div className="w-[992px] min-h-[100vh] pb-[132px] pt-[32px]">
          <div className="w-[100%] grid md:grid-cols-3 md:gap-[32px] grid-cols-2 gap-[24px]">
            {pokemonList?.map((pokemon, index) => (
              <PokemonCard 
                pokemon={pokemon} 
                key={index} 
                onClickHandler={selectPokemonHandler}
                selectedPokemon={pokemon?.id === selectedPokemon?.id}
              />
            ))}
          </div>
          {(pokemonList?.length && !allItemsReached) ? (
            <div ref={observerRef} className="flex justify-center items-center mt-[48px]">
              <Loader />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}