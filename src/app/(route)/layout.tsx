import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/hooks/query/usereactquery";
import AuthProvider from "@/components/auth/authprovider";

export const metadata: Metadata = {
  title: "쓰파인더",
  description: "쓰레기통 위치를 찾아주는 서비스입니다.",
};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body className="relative flex flex-row w-screen h-svh font-pretendard">
        <div id="modal-root" />
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
