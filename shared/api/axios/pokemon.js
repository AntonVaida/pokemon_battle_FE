import { api } from "./instance";

export const pokemonApi = {
  async getPokemonList (paginationLimit) {
    const GET_POKEMON_URL = `${process.env.NEXT_PUBLIC_BASE_API}/pokemon?limit=${paginationLimit}`;

    const res = await api.get(
      GET_POKEMON_URL,
      {},
      { 
        withCredentials: true 
      }
    );

    return res?.data;
  }
}