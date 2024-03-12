import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Providers from "@/hooks/useReactQuery";

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

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
