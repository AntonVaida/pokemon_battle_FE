"use client"

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPokemonSelected } from "@/store/pokemonReducer";
import { authAPI } from "@/shared";

export const usePokemonPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedPokemon = useSelector(getPokemonSelected);
  const [accessToken, setAccessToken] = useState(null);

  const getAccessToken = async () => {
    const accessToken = await authAPI.getAccessTokenFromCookies();

    if (accessToken) {
      setAccessToken(accessToken)
    }
  }
  const onOpenModal = useCallback(() => {
    if (selectedPokemon) {
      getAccessToken();
      setModalOpen(true)
    }
  }, [selectedPokemon]);

  const onCloseModal = () => {
    setModalOpen(false)
  }

  return {
    onOpenModal,
    onCloseModal,
    modalOpen,
    selectedPokemon,
    accessToken,
  }
}