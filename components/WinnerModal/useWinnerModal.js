import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { gameActions } from "@/store/gameReducer";
import { useRouter } from "next/navigation";
import { useIsScreenVersion, useClientContext, useOrientation } from "@/hooks";

export const useWinnerModal = () => {
  const router = useRouter();
  const { isMobileVersion, isTabletVersion } = useIsScreenVersion();
  const { user } = useClientContext();
  const dispatch = useDispatch();
  const { isPortrait } = useOrientation();

  const imageSizeConfig = useMemo(() => {
    if (isMobileVersion) {
      return isPortrait ? { width: 150 } : { width: 130 };
    } else if (isTabletVersion) {
      return isPortrait ? { width: 220 } : { width: 200};
    }

    return { width: 270 }
  }, [isMobileVersion, isTabletVersion, isPortrait])

  const exitGame = useCallback(() => {
    try {
      dispatch(gameActions.disconnect({userId: user?.address}));
      router.push("/pokemon")
    } catch (error) {
      console.error(error?.message);
    }
  }, [user, dispatch, router])


  const changeOrientationStyles = useMemo(() => {
    return {
      container: {
        marginTop:  isMobileVersion || isTabletVersion ? isPortrait ? "48px" : "24px" : "48px"
      },
      titleStyle: {
        container: {
          height: isMobileVersion || isTabletVersion ? isPortrait ? "48px" : "24px" : "48px"
        },
        text: {
          fontSize: isMobileVersion || isTabletVersion ? isPortrait ? "24px" : "16px" : "24px"
        }
      },
      buttonStyle: {
        height: isMobileVersion || isTabletVersion ? isPortrait ? "60px" : "40px" : "60px",
        width: isMobileVersion || isTabletVersion ? isPortrait ? "230px" : "200px" : "230px"
      }

    }
  }, [isPortrait, isMobileVersion, isTabletVersion])

  return {
    imageSizeConfig,
    exitGame,
    changeOrientationStyles
  }
}