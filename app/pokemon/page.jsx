import { PokemonPage } from "@/web-pages/PokemonPage";
import { cookies } from "next/headers";

export default async function SelectPokemon () {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  return (
   <PokemonPage accessToken={accessToken} />
  )
}