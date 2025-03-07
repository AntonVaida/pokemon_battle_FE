import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getPlayers } from "@/store/gameReducer";

export const useGameLog = () => {
  const players = useSelector(getPlayers);

  const historyGame = useMemo(() => {
    if (!players?.history) {
      return null;
    }
    
    return players?.history;
  }, [players])


  return {
    historyGame
  }
}