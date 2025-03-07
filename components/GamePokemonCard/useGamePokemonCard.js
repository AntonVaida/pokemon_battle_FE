import { useMemo} from "react"
import { useIsScreenVersion, useOrientation } from "@/hooks";

const parameterKeys = ["hp", "attack", "defense", "spAttack", "speed"];

export const useGamePokemonCard = (pokemon) => {
  const { isMobileVersion, isTabletVersion } = useIsScreenVersion();
    const { isPortrait } = useOrientation();

  const parameterValues = useMemo(() => {
    if (!pokemon) {
      return null;
    }

    return parameterKeys?.map(key => ({
      value: pokemon[key],
      width: isMobileVersion ? Math.round(pokemon[key] / 2) * 0.7 : Math.round(pokemon[key] / 2),
      parameterTitle: key.toUpperCase()
    }))

  }, [pokemon, isMobileVersion])

  const imgSize = useMemo(() => {
    return isMobileVersion || isTabletVersion ? isPortrait ? 50 : 35 : 80
  }, [isPortrait, isMobileVersion, isTabletVersion])

  const cardSize = useMemo(() => {
    return {
      paddingY: isMobileVersion || isTabletVersion ? isPortrait ? 8 : 3 : 16
    }
  }, [isMobileVersion, isTabletVersion, isPortrait])

  return {
    parameterValues,
    imgSize,
    cardSize
  }
}