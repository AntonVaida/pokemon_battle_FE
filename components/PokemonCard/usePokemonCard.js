import { useMemo } from "react";
import { useIsScreenVersion } from "@/hooks"

export const usePokemonCard = () => {
  const { isMobileVersion, isTabletVersion } = useIsScreenVersion();

  const imageSizeConfig = useMemo(() => {
    if (isMobileVersion) {
      return { height: 65, width: 65 };
    } else if (isTabletVersion) {
      return { height: 90, width: 90 };
    }

    return { height: 130, width: 130 };
  }, [isMobileVersion, isTabletVersion])

  return {
    imageSizeConfig
  }
}