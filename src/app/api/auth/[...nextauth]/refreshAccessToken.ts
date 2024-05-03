import { APIURL } from "@/util/const";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  try {
    const res = await fetch(`${APIURL}/api/auth/reissue`);

    const refreshToken = await res.json();
    if (res.ok && refreshToken && refreshToken?.accessToken) {
      return {
        ...token,
        accessToken: refreshToken.accessToken,
        accessTokenExpires: Date.now() + 10000,
      };
    }
  } catch (e) {
    console.error("refreshError", e);
  }

  return token;
};

export default refreshAccessToken;
