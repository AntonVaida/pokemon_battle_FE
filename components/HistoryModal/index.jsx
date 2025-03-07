import { 
  Dialog, 
  DialogContent, 
  DialogTitle
} from "@/components/ui/dialog";
import { useGameLog } from "../GameLog/useGameLog";
import { CloseIcon } from "@/shared";

export const HistoryModal = ({
  isOpen,
  setOpen
}) => {
  const { historyGame } = useGameLog();

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={setOpen} 
      className="bg-transparent p-0"
    >
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className="bg-transparent p-0 w-[80vw] h-[40vh]">
        <div className="w-[100%] h-[100%] p-[16px] rounded-[16px] bg-white border-pink shadow-[0_0_20px_5px_#F2488E] border-solid border-[2px]">
          <div className="mb-[24px] flex justify-center items-center relative">
            <h4 className="font-helvetica text-[12px] text-gray font-bold">HISTORY</h4>
            <button onClick={() => setOpen(false)} className="absolute top-0 right-0 border-none bg-white">
              <CloseIcon />
            </button>
          </div>
          <div className="overflow-x-auto h-[calc(40vh_-_12px_-_24px_-_48px)]">
            {historyGame?.map((historyItem, index) => {
              const lastItem = historyGame?.length - 1 === index;
              return (
                <div key={index} className={`${lastItem ? "mb-0" : "mb-4"} flex justify-between items-center gap-3 min-w-[170px]`}>
                  <h3 className="font-helvetica text-[16px] text-gray">
                    <span className={`font-helvetica text-[16px] ${historyItem?.attackerId === "yourPokemon" ? "text-purple" : "text-pink"}`}>
                      {historyItem?.attackerId === "yourPokemon" ? "your attack" : "computer attack"}
                    </span>
                  </h3>
                  <div className="w-[40px] h-[40px] flex justify-center items-center bg-purple rounded-full">
                    <span className="font-helvetica text-[12px] text-white">
                      {`${historyItem?.opponentDamage} HP`}
                    </span>
                  </div>
                </div>
              )}
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}