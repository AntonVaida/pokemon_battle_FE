"use client"
import { useMemo, useCallback } from "react";
import { useClientContext } from "@/hooks";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { gameActions } from "@/store/gameReducer";

export const useGameLeaveModal = () => {
  const { user } = useClientContext();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const openModal = useMemo(() => {
    return Boolean(redirectUrl)
  }, [redirectUrl]);

  const handleApproveRedirect = useCallback(() => {
    try {
      dispatch(gameActions.disconnect({userId: user?.address}));
      router.push(`/${redirectUrl}`)
    } catch (error) {
      console.error(error?.message);
    }
  }, [
    redirectUrl, 
    dispatch, 
    router, 
    user
  ]);

  const handleCancelRedirect = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("redirectUrl");
    router.replace(`${pathname}`, { shallow: true });
  };

  return {
    openModal,
    handleApproveRedirect,
    handleCancelRedirect
  }
}