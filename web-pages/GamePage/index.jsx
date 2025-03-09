"use client"

import { GamePokemonCard } from "@/components/GamePokemonCard";
import { GameLog } from "@/components/GameLog";
import { PokemonThumbnail } from "@/components/PokemonThumbnail";
import { AttackPowerIndicator } from "@/components/AttackPowerIndicator";
import { ExitIcon, HistoryIcon } from "@/shared";
import { useGamePage } from "./useGamePage";
import { HocGamePage } from "./HocGamePage";
import { HistoryModal } from "@/components/HistoryModal";

export const GamePage = () => {
  const {
    exitGame,
    yourPokemon,
    opponentPokemon,
    attackHandler,
    players,
    loading,
    attackDetail,
    winnerKey,
    attackPowerValueRef,
    gameFieldContainer,
    openHistoryModal,
    setOpenHistoryModal
  } = useGamePage();

  return (
    <HocGamePage>
      <div className="h-[100vh] bg-white"
        style={gameFieldContainer?.mainContainer}
      >
        <HistoryModal isOpen={openHistoryModal} setOpen={setOpenHistoryModal} />
        <div className="h-full flex flex-col">
          <div className="flex justify-end items-center lg:px-[32px]">
            <button
              className={`bg-purple p-2 lg:p-4 hover:bg-pink transition duration-300 transform active:scale-[0.9] active:opacity-[70%] rounded-full shadow-xl`}
              onClick={exitGame}
            >
              <ExitIcon />
            </button>
          </div>
          <div 
            className={`grow-1 h-full flex justify-center items-center relative`}
            style={gameFieldContainer?.gameContainer}
          >
            <div className="absolute bottom-0 left-0 lg:left-[32px] h-full flex justify-center items-center">
              <AttackPowerIndicator attackPowerValueRef={attackPowerValueRef} showIndicator={!loading && !winnerKey} />
            </div>
            <div 
              className={`w-[80%] lg:w-[50%] border-solid border-[4px] border-purple rounded-[16px] md:rounded-[62px] relative flex`}
              style={gameFieldContainer?.gameBorderContainer}
            >
              <div className="absolute top-0 left-0 w-full flex justify-center items-center transform translate-y-[-50%]">
                <GamePokemonCard pokemon={opponentPokemon} />
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-full flex justify-center items-center">
                  <PokemonThumbnail 
                    pokemonImg={opponentPokemon?.image?.hires} 
                    playerKey={"opponent"} 
                    attackDetail={attackDetail} 
                  />
                  <PokemonThumbnail 
                    pokemonImg={yourPokemon?.image?.hires} 
                    playerKey={"yourPokemon"} 
                    attackDetail={attackDetail} 
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full transform flex justify-center items-center translate-y-[50%]">
                <GamePokemonCard pokemon={yourPokemon} />
              </div>
            </div>
            <div 
              className="absolute right-0 lg:right-[32px]"
              style={gameFieldContainer?.gameLogContainer}
            >
              <div className="hidden lg:block">
                <GameLog />
              </div>
              {players?.history?.length ? (
                <button
                  className={`bg-purple p-2 lg:p-4 hover:bg-pink transition duration-300 transform active:scale-[0.9] active:opacity-[70%] rounded-full shadow-xl lg:hidden`}
                  onClick={() => setOpenHistoryModal(prev => !prev)}
                >
                  <HistoryIcon />
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              disabled={loading}
              className={`bg-purple transition duration-300 transform ${loading ? 'opacity-75' : 'hover:bg-pink active:scale-[0.9] active:opacity-[70%]'} font-helvetica text-[16px] lg:text-[16px] font-bold text-white rounded-[30px] lg:rounded-[30px] shadow-xl`}
              onClick={attackHandler}
              style={gameFieldContainer?.attackButton}
            >
              ATTACK
            </button>
          </div>
        </div>
      </div>
    </HocGamePage>
  )
}