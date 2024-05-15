import { APIURL } from "@/util/const";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import setRefreshTokenCookie from "./setrtcookie";

const refreshAccessToken = async (token: JWT) => {
  try {
    const res = await fetch(`${APIURL}/api/auth/reissue`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookies().toString(),
      },
    });
    const accessToken = await res.json();
    await setRefreshTokenCookie(res);
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
