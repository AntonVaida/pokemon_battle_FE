"use client"

import { PokemonModal } from "@/components/PokemonModal";
import { PokemonList } from "@/components/PokemonList";
import { usePokemonPage } from "./usePokemonPage";
import { HocPokemonPage } from "./HocPokemonPage";

export const PokemonPage = () => {
  const {
    onOpenModal,
    onCloseModal,
    modalOpen,
    selectedPokemon,
    accessToken
  } = usePokemonPage();

  return (
    <HocPokemonPage>
    <div className="w-full min-h-[100vh] bg-white relative">
      <PokemonModal isOpen={modalOpen} setOpen={onCloseModal} accessToken={accessToken} />
      <PokemonList />
      <div className="flex justify-center items-center fixed bottom-[24px] h-[60px] lg:h-[80px] w-full">
        <button
          disabled={!selectedPokemon}
          className={`bg-purple w-[200px] lg:w-[350px] h-[60px] lg:h-[80px] font-helvetica text-[16px] lg:text-[24px] font-bold text-white rounded-[30px] lg:rounded-[50px] shadow-xl ${!selectedPokemon ? 'opacity-75' : 'hover:bg-pink'} transition-colors duration-300`}
          onClick={onOpenModal}
        >
          SELECT POKEMON
        </button>
      </div>
    </div>
    </HocPokemonPage>
  )
}