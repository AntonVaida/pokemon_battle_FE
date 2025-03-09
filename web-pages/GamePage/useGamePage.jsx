"use client"

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useClientContext, useOrientation, useIsScreenVersion } from "@/hooks";
import { getPlayers, getConnected, gameActions, getLoading } from "@/store/gameReducer";
import { getPokemonSelected } from "@/store/pokemonReducer";
import { authAPI } from "@/shared";
import { toast, Bounce } from "react-toastify";

export const useGamePage = () => {
  const router = useRouter();
  const [attackDetail, setAttackDetail] = useState(null);
  const { user } = useClientContext();
  const [winnerKey, setWinnerKey] = useState(null);
  const players = useSelector(getPlayers);
  const connected = useSelector(getConnected);
  const loading = useSelector(getLoading);
  const selectedPokemon = useSelector(getPokemonSelected);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const attackPowerValueRef = useRef(0);
  const { isPortrait } = useOrientation();
  const { isMobileVersion, isTabletVersion } = useIsScreenVersion();
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

  const connectedHandler = useCallback(async () => {
    try {
      const accessToken = await authAPI.getAccessTokenFromCookies();
      console.log("useGamePage", {accessToken })
      if (user?.address && accessToken) {
        dispatch(gameActions.joinGame({...selectedPokemon, userId: user?.address, accessToken}));
      }
    } catch (error) {
      toast.error(`${error?.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [selectedPokemon, user, dispatch])

  useEffect(() => {
    connectedHandler()
  }, [user, dispatch, selectedPokemon])

  const attackHandler = useCallback(() => {
    if (user?.address && !loading) {
      const attackPowerValue = attackPowerValueRef?.current?.slice(0, -1)
      dispatch(gameActions.attack({userId: user?.address, attackPowerValueNumber: Math.round(Number(attackPowerValue))}));
    }
  }, [user, dispatch, loading])

  const exitGame = useCallback(() => {
    router.push("/game?redirectUrl=pokemon");
  }, [router])

  const yourPokemon = useMemo(() => {
    if (players && players?.yourPokemon) {
      return players?.yourPokemon;
    }

    return null;
  }, [players])

  const opponentPokemon = useMemo(() => {
    if (players && players?.opponent) {
      return players?.opponent;
    }

    return null;
  }, [players])

  useEffect(() => {
    if (players?.history?.length) {
      setAttackDetail({...players?.history[0]})

      const timeoutId = setTimeout(() => {
          setAttackDetail(null)
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [players?.history])

  useEffect(() => {
    if (players?.winner) {
      const params = new URLSearchParams(searchParams);
      params.set("afterGamePage", "true");
      router.replace(`?${params.toString()}`);
      setWinnerKey(players?.winner)
    }
  }, [players?.winner])

  useEffect(() => {
    const handlePopState = () => {
      if (pathname.includes("game")) {
        router.push("/game?redirectUrl=pokemon");
      }
    };

    window.addEventListener("popstate", handlePopState);

    if (!redirectUrl) {
      history.pushState({}, "", "/game");
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, pathname, redirectUrl]);

  const gameFieldContainer = useMemo(() => {
    return {
      mainContainer: {
        paddingTop: isMobileVersion || isTabletVersion ? isPortrait ? "24px" : "8px" : "24px",
        paddingBottom: isMobileVersion || isTabletVersion ? isPortrait ? "24px" : "8px" : "24px",
        paddingLeft: "24px",
        paddingRight: "24px"
      },
      gameContainer: {
        marginTop: isMobileVersion || isTabletVersion ? isPortrait ? "24px" : "8px" : "24px",
        marginBottom: "24px"
      },
      gameBorderContainer: {
        height: isMobileVersion || isTabletVersion ? isPortrait ? '75%' : '85%' : "75%"
      },
      attackButton: {
        height: isMobileVersion || isTabletVersion ? isPortrait ? "60px" : "30px" : "60px",
        width: isMobileVersion || isTabletVersion ? isPortrait ? "230px" : "160px" : "230px"
      }, 
      gameLogContainer: {
        top: isMobileVersion || isTabletVersion ? isPortrait ? "0px" : "16px" : "32px"
      }
    }
  }, [isMobileVersion, isTabletVersion, isPortrait])


  return {
    exitGame,
    connected,
    yourPokemon,
    opponentPokemon,
    attackHandler,
    user,
    players,
    loading,
    attackDetail,
    winnerKey,
    redirectUrl,
    attackPowerValueRef,
    isPortrait,
    gameFieldContainer,
    openHistoryModal,
    setOpenHistoryModal
  }
}