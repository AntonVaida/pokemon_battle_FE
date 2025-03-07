import { GamePage } from "@/web-pages/GamePage";
import { cookies } from "next/headers";

export default async function PokemonList () {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  return (
    <GamePage accessToken={accessToken} />
  )
}