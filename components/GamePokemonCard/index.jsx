import Image from "next/image";
import { useGamePokemonCard } from "./useGamePokemonCard"

export const GamePokemonCard = ({pokemon}) => {
  const {
    parameterValues,
    imgSize,
    cardSize
  } = useGamePokemonCard(pokemon);


  if (!pokemon?.image?.hires) {
    return null
  }

  return (
    <div 
      className="bg-white flex justify-start items-center rounded-xl"
      style={{
        padding: `${cardSize?.paddingY}px`,
      }}
    >
      <div 
        className={`relative flex-col justify-center items-center w-[70px] md:w-[100px]`}
      >
        {pokemon?.image?.hires 
        ? (
          <div className={`flex justify-center items-center`}>
            <Image src={pokemon?.image?.hires} height={imgSize} width={imgSize} alt={"pokemon?.name?.english"} />
          </div>
          ) : null}
        <div className="mt-1 md:mt-2 flex justify-center items-center">
          <h2 className="font-helvetica text-[8px] md:text-[12px] font-semibold  text-gray">
            {pokemon?.name}
          </h2>
        </div>
      </div>
     <table 
        className={`top-0 border-collapse bg-white`} 
      >
        <tbody className="h-full">
          {parameterValues?.map((parameter, index) => (
            <tr key={index} className="border-none outline-0 w-full h-[16px]">
              <td className="border-none outline-0">
                <div className="mr-2 flex justify-start items-center">
                  <h3 className="font-helvetica text-[6px] md:text-[8px] font-semibold  text-gray">
                    {parameter?.parameterTitle}
                  </h3>
                </div>
              </td>
              <td className="border-none outline-0">
                <div className="flex justify-start items-center">
                  <div 
                    className="h-[4px] mr-2 rounded-[2px] bg-purple" 
                    style={{width: parameter?.width ? `${parameter?.width}px` : 0}}
                  ></div>
                  <div>
                    <h3 className="font-helvetica text-[8px] font-semibold  text-gray">
                      {parameter?.value}
                    </h3>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}