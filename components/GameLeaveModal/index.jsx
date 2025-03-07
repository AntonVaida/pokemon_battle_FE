import { 
  Dialog, 
  DialogContent, 
  DialogTitle
} from "@/components/ui/dialog";
import { useGameLeaveModal } from "./useGameLeaveModal";

export const GameLeaveModal = () => {
  const {
    openModal,
    handleApproveRedirect,
    handleCancelRedirect
  } = useGameLeaveModal()

  return (
    <Dialog 
      open={openModal}
      onOpenChange={() => handleCancelRedirect()} 
      className="bg-transparent"
    >
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className="bg-transparent p-0 border-none flex-col justify-center items-center gap-[48px] w-0">
        <div className="bg-white  p-2 md:p-4 rounded-[16px] border-none flex-col justify-start items-center w-[200px] md:w-[300px] lg:w-[350px] transition duration-300 transform cursor-pointer border-pink shadow-[0_0_20px_5px_#F2488E]">
          <div className="flex justify-center items-center">
            <h1 className="font-helvetica text-[14px] md:text-[16px] lg:text-[18px] font-semibold  text-gray">
              DO YOU WANNA LEAVE THE GAME?
            </h1>
          </div>
          <div className="flex justify-between items-center gap-[24px] mt-[24px]">
            <button 
              className="bg-purple w-full lg:h-[42px] font-helvetica text-[12px] md:text-[14px] lg:text-[16px] font-bold text-white rounded-[30px] lg:rounded-[20px] shadow-xl hover:bg-pink transition-colors duration-300" 
              onClick={handleApproveRedirect}
            >
              Yes
            </button>
            <button 
              className="bg-purple w-full lg:h-[42px] font-helvetica text-[12px] md:text-[14px] lg:text-[16px] font-bold text-white rounded-[30px] lg:rounded-[20px] shadow-xl hover:bg-pink transition-colors duration-300" 
              onClick={handleCancelRedirect}
            >
              No
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}