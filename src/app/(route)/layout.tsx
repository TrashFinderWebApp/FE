import type { Metadata } from "next";
import "./(main)/globals.css";
import Providers from "@/hooks/useReactQuery";
import Navigator from "@/components/sidebar/Navigator";
import AuthProvider from "@/components/Auth/AuthProvider";

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
      <body className="flex flex-row w-screen h-[100svh] font-pretendard ">
        <AuthProvider>
          <Navigator />
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
