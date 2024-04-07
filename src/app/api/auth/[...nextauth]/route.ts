/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import AppleProvider from "next-auth/providers/apple";
import InstagramProvider from "next-auth/providers/instagram";
import Credentials from "next-auth/providers/credentials";
import refreshAccessToken from "./refreshAccessToken";

const handler = NextAuth({
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
          const res = await fetch(
            "http://35.216.97.185:8080/api/members/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            },
          );

          const data = await res.json();

          if (res.ok && data) {
            return data;
          }
        } catch (e) {
          console.error(e);
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
        const res = await fetch("http://35.216.97.185:8080/api/oauth2/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            code: account.refresh_token,
            SocialType: account.provider.toUpperCase(),
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            user.accessToken = data.accessToken;
          }
          return true;
        }
      } catch (e) {
        return false;
      }

      return false;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user && user.accessToken) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = Date.now() + 10000;
        return token;
      }

      if (
        token?.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ token, session }) => {
      if (
        typeof token.accessToken === "string" &&
        token.accessToken.length > 0
      ) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
