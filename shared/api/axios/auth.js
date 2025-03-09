import { api } from "./instance";

export const authAPI = {
  async loginUser({userAddress, signature}) {
    const LOGIN_URL = `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`;

    const res = await api.post(LOGIN_URL, {
        address: userAddress,
        signature,
    },
    { withCredentials: true }
  );
    return res?.data;
  },
  async logoutUser() {
    const LOGOUT_URL = `${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`;

    const res = await api.post(LOGOUT_URL, {}, { withCredentials: true });
    return res;
  }
}