"use client"

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPokemonSelected } from "@/store/pokemonReducer";
import { useClientContext } from "@/hooks";

export const usePokemonPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedPokemon = useSelector(getPokemonSelected);
  const { user } = useClientContext();

  const onOpenModal = useCallback(() => {
    if (selectedPokemon) {
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
    accessToken: user?.accessToken,
  }
}