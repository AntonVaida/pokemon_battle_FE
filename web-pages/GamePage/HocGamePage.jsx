"use client";

import { useState, useEffect, useMemo } from "react";
import { HistoryModal } from "@/components/HistoryModal";
import { WinnerModal } from "@/components/WinnerModal";
import { GameLeaveModal } from "@/components/GameLeaveModal";
import { useSelector } from "react-redux";
import { getPlayers, getLoading, getConnected } from "@/store/gameReducer";
import { Loader } from "@/components/Loader";

export const HocGamePage = ({children}) => {
  const [winnerKey, setWinnerKey] = useState(null);
  const players = useSelector(getPlayers);
  const loading = useSelector(getLoading);
  const connected = useSelector(getConnected);

  useEffect(() => {
    if (players?.winner) {
      setWinnerKey(players?.winner)
    }
  }, [players?.winner])

  const yourPokemon = useMemo(() => {
    if (players && players?.yourPokemon) {
      return players?.yourPokemon;
    }

    return null;
  }, [players])

  return (
    <>
      <WinnerModal winnerKey={winnerKey} yourPokemon={yourPokemon} />
      <GameLeaveModal />
        {
          (loading && !Object.keys(players)?.length) || !connected ? (
            <div className="w-full min-h-[100vh] flex justify-center items-center">
              <Loader width={56} height={56} />
            </div>
          ) : 
            children
        }
    </>
  )
}