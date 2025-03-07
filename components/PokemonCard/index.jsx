"use client"
import Image from "next/image";
import { useIsScreenVersion } from "@/hooks";
import { usePokemonCard } from "./usePokemonCard";

const characteristicsPokemonList = [
  {title: "HP", key: "hp"},
  {title: "ATTACK", key: "attack"},
  {title: "DEFENSE", key: "defense"},
  {title: "SPEED", key: "speed"}
]

export const PokemonCard = ({
  pokemon, 
  sizeConfig, 
  onClickHandler,
  selectedPokemon
}) => {
  const { imageSizeConfig } = usePokemonCard();

  return (
    <div className={
      `w-full group border-solid border-[2px] p-2 md:p-4 rounded-[16px] bg-white transition duration-300 transform cursor-pointer ${selectedPokemon ? `border-pink scale-[1.1] shadow-[0_0_20px_5px_#F2488E]` : 'shadow-xl border-purple hover:border-pink'}`
      }
    style={{
      width: sizeConfig?.width ? `${sizeConfig?.width}px` : '100%',
      height: sizeConfig?.height ? `${sizeConfig?.height}px` : '100%',
    }}
    onClick={() => {onClickHandler && onClickHandler(pokemon)}}
    >
      {pokemon?.image?.hires 
      ? (
        <div className={`flex justify-center items-center transition duration-300 transform h-[65px] md:h-[90px] lg:h-[130px] ${selectedPokemon ? 'scale-[1.1]' : 'group-hover:scale-[1.1]'}`}>
          <Image src={pokemon?.image?.hires} height={imageSizeConfig.height} width={imageSizeConfig.width} alt={"pokemon?.name?.english"} />
        </div>
      ) 
      : null}
      <div className="mt-4 flex justify-center items-center">
        <h2 className="font-helvetica text-[12px] md:text-[14px] lg:text-[16px] font-semibold  text-gray">
          {pokemon?.name?.english}
        </h2>
      </div>
      <div className="mt-2 lg:mt-4 h-[50px] lg:h-[70px] overflow-hidden flex justify-center items-center">
        <h4 className="font-helvetica text-gray text-[8px] md:text-[10px] lg:text-[12px] h-full overflow-hidden text-ellipsis line-clamp-3 text-center">
          {pokemon?.description}
        </h4>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {characteristicsPokemonList?.map((char, index) => (
          <div key={index} className="w-[32px] flex flex-col justify-start items-center gap-2">
            <h4 className="font-helvetica text-gray font-semibold text-[6px] md:text-[8px] lg:text-[12px]">
              {char?.title}
            </h4>
            <div className={` group-hover:bg-pink w-[16px] h-[16px] md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px] rounded-full flex justify-center items-center transition-colors duration-300 ${selectedPokemon ? `bg-pink` : 'bg-purple'}`}>
              <h4 className="font-helvetica text-[6px] md:text-[8px] lg:text-[12px] font-semibold  text-white">
                {pokemon?.base[char?.key]}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}