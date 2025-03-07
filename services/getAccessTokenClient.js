export const getAccessTokenClient = () => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find(row => row.startsWith("accessToken="));
  return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
};