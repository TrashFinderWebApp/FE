"use client";

import Image from "next/image";
import React from "react";
import navericon from "public/svg/NaverIcon.svg";
import kakaoicon from "public/svg/KakaoIcon.svg";
import googleicon from "public/svg/GoogleIcon.svg";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">
      <div className="bg-white p-8 w-[28rem]">
        <h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="아이디"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호"
          />
        </div>
        <button
          type="button"
          className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300 mb-4"
        >
          로그인
        </button>
        <p className="text-sm text-center text-gray-600 ">
          소셜 계정으로 회원가입 및 로그인
        </p>
        <div className="flex justify-center mt-4 space-x-4 h-12">
          <Image src={navericon} alt="navericon" />
          <Image src={kakaoicon} alt="navericon" />
          <Image src={googleicon} alt="navericon" />
        </div>
      </div>
    </div>
  );
}
