import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getPokemonSelected } from "@/store/pokemonReducer";
import { useClientContext, useIsScreenVersion, useOrientation } from "@/hooks";

export const usePokemonModal = ({accessToken}) => {
  const selectedPokemon = useSelector(getPokemonSelected);
  const router = useRouter();
  const { login, user } = useClientContext();
  const { isMobileVersion, isTabletVersion } = useIsScreenVersion();
  const { isPortrait } = useOrientation();

  const onClickHandler = useCallback(() => {
    if (user && accessToken) {
      router.push("/game");
      return;
    }

    login(() => router.push("/game"))
  }, [user, login, router, accessToken])

  const imageSizeConfig = useMemo(() => {
    if (isMobileVersion) {
      return isPortrait ? { width: 150 } : { width: 130 };
    } else if (isTabletVersion) {
      return isPortrait ? { width: 220 } : { width: 200};
    }

    return { width: 270 }
  }, [isMobileVersion, isTabletVersion, isPortrait])

  const changeOrientationStyles = useMemo(() => {
    return {
      buttonStyle: {
        height: isMobileVersion || isTabletVersion ? isPortrait ? "60px" : "40px" : "80px",
        width: isMobileVersion || isTabletVersion ? isPortrait ? `200px` : "200px" : "300px",
        marginTop: isMobileVersion || isTabletVersion ? isPortrait ? `48px` : "12px" : "48px",
      }
    }
  }, [isPortrait, isMobileVersion, isTabletVersion])


  return {
    selectedPokemon,
    onClickHandler,
    imageSizeConfig,
    changeOrientationStyles
  }
}