import { APIURL } from "@/util/const";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  try {
    const res = await fetch(`${APIURL}/api/auth/reissue`, {
      method: "GET",
      credentials: "include",
    });
    console.log("refresh", res);
    const accessToken = await res.json();
    if (res.ok && accessToken && accessToken?.accessToken) {
      return {
        ...token,
        accessToken: accessToken.accessToken,
        accessTokenExpires: accessToken.jwtExpiredTime,
      };
    }

    if (accessToken?.message) {
      return {
        ...token,
        error: accessToken.message,
      };
    }
  } catch (e) {
    console.error("refreshError", e);
  }

  return token;
};

export default refreshAccessToken;
