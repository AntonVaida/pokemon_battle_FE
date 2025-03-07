import { useGameLog } from "./useGameLog"

export const GameLog = () => {
  const { historyGame } = useGameLog();

  if (!historyGame?.length) {
    return null;
  };

  return (
    <div className="p-4 border-solid border-[2px] border-purple rounded-2xl">
      <div className="mb-[24px] flex justify-center items-center">
        <h4 className="font-helvetica text-[12px] text-gray font-bold">HISTORY</h4>
      </div>
      <div className="overflow-x-auto h-[100px]">
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
  )
}