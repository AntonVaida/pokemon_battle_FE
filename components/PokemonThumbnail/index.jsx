import Image from "next/image"
import { usePokemonThumbnail } from "./usePokemonThumbnail";

export const PokemonThumbnail = ({pokemonImg, playerKey, attackDetail}) => {
  const { thumbnailSize } = usePokemonThumbnail()

  return (
    <div 
      className={`flex justify-center items-center h-[80px] ${playerKey === "opponent" ? "mr-[20px]" : "ml-[20px]"} relative`}
      style={{
        transform: attackDetail?.attackerId === playerKey 
          ? `${playerKey === "opponent" ? "translateX(45px)" : "translateX(-45px)"}` 
          : "translateX(0)",
        transition: "transform 200ms ease-in-out",
        height: thumbnailSize
      }}
    >
      {pokemonImg ? (
        <Image src={pokemonImg} height={thumbnailSize} width={thumbnailSize} alt={"pokemon?.name?.english"} />
      ) : null}
      <div 
        className="absolute top-0 left-[30%] h-[20px] flex justify-center items-center"
        style={{
          transform: attackDetail?.targetId === playerKey
            ? "translateY(-68px)"
            : "translateY(0)",
          opacity: attackDetail?.targetId === playerKey ? 0 : 1,
          transition: "transform 600ms ease-in-out, opacity 400ms ease-in-out"
        }}
      >
        <span className="font-helvetica text-[16px] font-semibold  text-pink">
          {attackDetail?.targetId === playerKey ? attackDetail?.opponentDamage ? `-${attackDetail?.opponentDamage} HP` : "Miss" : ''}
        </span>
      </div>
    </div>
  )
}