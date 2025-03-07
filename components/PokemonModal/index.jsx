import { 
  Dialog, 
  DialogContent, 
  DialogTitle
} from "@/components/ui/dialog"
import { PokemonCard } from "../PokemonCard"
import { usePokemonModal } from "./usePokemonModal"

export const PokemonModal = ({isOpen, setOpen, accessToken}) => {
  const {
    selectedPokemon,
    onClickHandler,
    imageSizeConfig,
    changeOrientationStyles
  } = usePokemonModal({accessToken});

  return (
     <Dialog 
      open={isOpen} 
      onOpenChange={setOpen} 
      className="bg-transparent p-0 h-[900px]"
    >
      <DialogTitle className="hidden">{selectedPokemon?.id}</DialogTitle>
      <DialogContent className="bg-transparent p-0 border-none flex-col justify-center items-center w-0">
        <div className="w-full h-[100%] flex justify-center items-center">
          <PokemonCard 
            pokemon={selectedPokemon} 
            sizeConfig={imageSizeConfig} 
            selectedPokemon={true} 
          />
        </div>
        <div className="flex justify-center items-center">
          <button 
            className="bg-purple font-helvetica text-[16px] lg:text-[24px] font-bold text-white rounded-[30px] lg:rounded-[50px] shadow-xl hover:bg-pink transition-colors duration-300" 
            onClick={onClickHandler}
            style={changeOrientationStyles?.buttonStyle}
          >
            PLAY
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}