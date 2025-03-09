"use client"

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getPokemonSelected } from "@/store/pokemonReducer";
import { authAPI } from "@/shared";
import { toast, Bounce } from "react-toastify";

export const usePokemonPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const selectedPokemon = useSelector(getPokemonSelected);
  const [accessToken, setAccessToken] = useState(null);

  const getAccessToken = async () => {
    try {
      const accessToken = await authAPI.getAccessTokenFromCookies();

      if (accessToken) {
        setAccessToken(accessToken)
      }
    } catch (error) {
      toast.error(`${error?.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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