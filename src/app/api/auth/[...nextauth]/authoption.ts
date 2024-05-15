/* eslint-disable no-param-reassign */
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import AppleProvider from "next-auth/providers/apple";
import InstagramProvider from "next-auth/providers/instagram";
import Credentials from "next-auth/providers/credentials";
import { APIURL } from "@/util/const";
import { AuthOptions } from "next-auth";
import refreshAccessToken from "./refreshaccesstoken";
import setRefreshTokenCookie from "./setrtcookie";

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
    }),
    InstagramProvider({
      clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || "",
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${APIURL}/api/members/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const result = await res.json();

          if (res.ok && result) {
            await setRefreshTokenCookie(res);
            return result;
          }
        } catch (e) {
          console.error("credentialsAuthorizeError", e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_KEY,
  callbacks: {
    signIn: async ({ account, user }) => {
      if (!account) return false;
      if (account.provider === "credentials") return true;

      try {
        const res = await fetch(`${APIURL}/api/oauth2/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },

          body: JSON.stringify({
            socialAccessToken: account.access_token,
            socialType: account.provider.toUpperCase(),
          }),
        });

        if (res.ok) {
          await setRefreshTokenCookie(res);
          const data = await res.json();
          if (data) {
            user.accessToken = data.accessToken;
            user.jwtExpiredTime = data.jwtExpiredTime;
            user.memberRole = data.memberRole;
          }
          return true;
        }
      } catch (e) {
        return false;
      }

      return false;
    },

    jwt: async ({ account, user, token }) => {
      if (account && user && user.accessToken) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.jwtExpiredTime;
        token.memberRole = user.memberRole;
        return token;
      }

      if (
        token?.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      const newToken = await refreshAccessToken(token);
      return newToken;
    },

    session: async ({ token, session }) => {
      if (
        typeof token.accessToken === "string" &&
        token.accessToken.length > 0
      ) {
        session.accessToken = token.accessToken;
      }
      if (token?.error) {
        session.error = token.error as string;
      }
      return session;
    },
  },
};
