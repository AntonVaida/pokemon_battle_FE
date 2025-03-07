"use client"

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPokemonSelected } from "@/store/pokemonReducer";

export const usePokemonPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedPokemon = useSelector(getPokemonSelected);

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
    selectedPokemon
  }
}