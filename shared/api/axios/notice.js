import { api } from "./instance";

export const noticeApi = {
  async getNoticeAPI({userAddress}) {
    const NOTICE_URL = `${process.env.NEXT_PUBLIC_BASE_API}/auth/nonce?address=${userAddress}`
    const res = await api.get(NOTICE_URL);
    return res?.data;
  },
}