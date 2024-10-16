"use client";

import Image from "next/image";
import React from "react";
import navericon from "public/svg/navericon.svg";
import kakaoicon from "public/svg/kakaoicon.svg";
import googleicon from "public/svg/googleicon.svg";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = (provider: string) => async () => {
    await signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      <div className="items-center justify-center bg-white shadow-lg p-8 w-[20rem] md:w-[33.5rem]">
        <h1 className="text-1xl md:text-2xl font-bold mb-6 text-center">
          소셜 계정으로 회원가입 및 로그인
        </h1>
        <div className="flex justify-center mt-4 p-4 space-x-8">
          <button className="cursor-pointer" type="button">
            <Image
              src={navericon}
              alt="navericon"
              onClick={handleLogin("naver")}
            />
          </button>
          <button className="cursor-pointer" type="button">
            <Image
              src={kakaoicon}
              alt="navericon"
              onClick={handleLogin("kakao")}
            />
          </button>
          <button className="cursor-pointer" type="button">
            <Image
              src={googleicon}
              alt="navericon"
              onClick={handleLogin("google")}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
