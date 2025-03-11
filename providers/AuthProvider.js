"use client"
import React, { useState } from "react";
import { ethers } from "ethers";
import { noticeApi, authAPI } from "../shared";
import { useSessionStorage, useIsMobile } from "../hooks";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";

export const AuthContext = React.createContext({});
export const AuthProvider = ({children}) => {
  const { value: user, setValue: setUser } = useSessionStorage("user", null)
  const [loading, setLoading] = useState(false);
  const [openInstallMetamask, setOpenInstallMetamask] = useState(false);
  const { isMobile } = useIsMobile();

  const login = async (callbackRedirectFunction) => {
    if (!window.ethereum) {
      setOpenInstallMetamask(true);
      return;
    }

    try {
      setLoading(true);
      let provider;

      if (!isMobile) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      } else {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.BrowserProvider(window.ethereum);
      }

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const { nonce } = await noticeApi.getNoticeAPI({userAddress});
      const signature = await signer.signMessage(nonce);
      const authResponse = await authAPI.loginUser({userAddress, signature});

      setUser(authResponse)
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
    } finally {
      setLoading(false);
      callbackRedirectFunction()
    }
  };

  const logout = async(callbackRedirectFunction) => {
    try {
      setLoading(true);
      await authAPI.logoutUser();
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
    } finally {
      setUser(null);
      setLoading(false);
      callbackRedirectFunction();
    }
  }

  const value = {
    loading,
    user,
    login,
    logout,
    setUser,
    openInstallMetamask,
    setOpenInstallMetamask
  };

  return (
    <AuthContext value={value}>
      <ToastContainer />
     {children}
    </AuthContext>
  )
}