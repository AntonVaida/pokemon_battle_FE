import { GamePage } from "@/web-pages/GamePage";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export default function PokemonList () {

  return (
    <Suspense 
      fallback={
        <div className="w-full min-h-[100vh] flex justify-center items-center">
          <Loader width={56} height={56} />
        </div>
      }
    >
      <GamePage />
    </Suspense>
  )
}