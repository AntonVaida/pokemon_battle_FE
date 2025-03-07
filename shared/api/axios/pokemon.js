import { api } from "./instance";
import { getAccessTokenClient } from "../../../services";

export const pokemonApi = {
  async getPokemonList (paginationLimit) {
    const accessToken = getAccessTokenClient();
    const GET_POKEMON_URL = `${process.env.NEXT_PUBLIC_BASE_API}/pokemon?limit=${paginationLimit}`;

    const res = await api.get(
      GET_POKEMON_URL,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res?.data;
  }
}