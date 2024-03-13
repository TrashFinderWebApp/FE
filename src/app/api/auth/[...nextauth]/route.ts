import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import AppleProvider from "next-auth/providers/apple";
import InstagramProvider from "next-auth/providers/instagram";

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || "",
    }),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_APPLE_CLIENT_SECRET || "",
    }),
    InstagramProvider({
      clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET || "",
    }),
  ],
});

export { handler as GET, handler as POST };
