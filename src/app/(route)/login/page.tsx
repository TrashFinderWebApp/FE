"use client";

import Image from "next/image";
import React, { useRef } from "react";
import navericon from "public/svg/NaverIcon.svg";
import kakaoicon from "public/svg/KakaoIcon.svg";
import googleicon from "public/svg/GoogleIcon.svg";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const inputRef = useRef<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleLogin = (provider: string) => async () => {
    await signIn(provider, {
      callbackUrl: "/",
      ...inputRef.current,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">
      <div className="items-center justify-center bg-white shadow-lg p-8 w-[20rem] md:w-[33.5rem]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          로그인
        </h1>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일"
            onChange={(e) => {
              inputRef.current.email = e.target.value;
            }}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호"
            onChange={(e) => {
              inputRef.current.password = e.target.value;
            }}
          />
        </div>
        <button
          type="button"
          className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300 mb-4"
          onClick={handleLogin("credentials")}
        >
          로그인
        </button>
        <p className="text-sm md:text-base lg:text-lg mt-4 text-center text-gray-600 ">
          소셜 계정으로 회원가입 및 로그인
        </p>
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
        <Link href="/signup">
          <p className="flex itmes-center justify-center text-msm md:text-base lg:text-lg mt-4 text-blue-500">
            쓰파인더 아이디로 회원가입 하기
          </p>
        </Link>
      </div>
    </div>
  );
}
