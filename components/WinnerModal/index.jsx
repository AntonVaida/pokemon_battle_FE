import { 
  Dialog, 
  DialogContent, 
  DialogTitle
} from "@/components/ui/dialog";
import { PokemonCard } from "../PokemonCard";
import { useWinnerModal } from "./useWinnerModal";

export const WinnerModal = ({
  winnerKey,
  yourPokemon
}) => {
  const { 
    imageSizeConfig,
    exitGame,
    changeOrientationStyles
  } = useWinnerModal();

  return (
    <Dialog 
      open={!!winnerKey && !!yourPokemon} 
      className="bg-transparent p-0"
    >
      <DialogTitle className="hidden">{winnerKey}</DialogTitle>
      <DialogContent className="bg-transparent p-0 border-none flex-col justify-center items-center w-0">
        <div className="flex-col justify-center items-center">
          <div 
            className="flex justify-center items-center"
            // style={changeOrientationStyles?.titleStyle?.container}
          >
            <h1 
              className="font-helvetica font-bold text-white"
              style={changeOrientationStyles?.titleStyle?.text}
            >
              {winnerKey === "opponent" ? "YOUR LOSS" : "YOUR WIN"}
            </h1>
          </div>
          <div className="w-full flex justify-center items-center"
            style={changeOrientationStyles?.container}
          >
            <PokemonCard 
              pokemon={{
                ...yourPokemon,
                name: {
                  english: yourPokemon?.name
                },
                base: {
                  hp: yourPokemon?.hp, 
                  attack: yourPokemon?.attack, 
                  defense: yourPokemon?.defense, 
                  speed: yourPokemon?.speed
                }
              }} 
              sizeConfig={imageSizeConfig} 
              selectedPokemon={true} 
            />
          </div>
          <div 
            className="flex justify-center items-center"
            style={changeOrientationStyles?.container}
          >
            <button 
              className="bg-purple w-[200px] lg:w-[300px] h-[60px] lg:h-[80px] font-helvetica text-[16px] lg:text-[24px] font-bold text-white rounded-[30px] lg:rounded-[50px] shadow-xl hover:bg-pink transition-colors duration-300" 
              onClick={exitGame}
              style={changeOrientationStyles?.buttonStyle}
            >
              NEW GAME
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}