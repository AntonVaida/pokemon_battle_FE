import { useMemo } from "react";
import { useWindowSize, useIsScreenVersion, useOrientation } from "@/hooks";

export const usePokemonThumbnail = () => {
  const { width } = useWindowSize();
  const { isMobileVersion, isTabletVersion } = useIsScreenVersion();
  const { isPortrait } = useOrientation();

  const thumbnailSize = useMemo(() => {
    if (isMobileVersion) {
      return isPortrait ? 80 :  width / 8
    } else if (isTabletVersion) {
      return isPortrait ? width / 5 :  width / 8
    } else {
      return width / 14
    }

  }, [isMobileVersion, isTabletVersion,  width, isPortrait])

  return {
    thumbnailSize
  }
}