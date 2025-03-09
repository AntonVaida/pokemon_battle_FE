"use client"
import React, { useState } from "react";
import { ethers } from "ethers";
import { noticeApi, authAPI } from "../shared";
import { useSessionStorage } from "../hooks";
import { ToastContainer } from "react-toastify";

export const AuthContext = React.createContext({});
export const AuthProvider = ({children}) => {
  const { value: user, setValue: setUser } = useSessionStorage("user", null)
  const [loading, setLoading] = useState(false);
  const [authError, setAutherror] = useState(null);
  const [openInstallMetamask, setOpenInstallMetamask] = useState(false);

  const login = async (callbackRedirectFunction) => {
    if (!window.ethereum) {
      setOpenInstallMetamask(true);
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const { nonce } = await noticeApi.getNoticeAPI({userAddress});
      const signature = await signer.signMessage(nonce);
      const authResponse = await authAPI.loginUser({userAddress, signature});

      setUser(authResponse)
    } catch (error) {
      setAutherror(error)
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
      console.error("Auth Error:", error);
      setAutherror(error)
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
    authError,
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