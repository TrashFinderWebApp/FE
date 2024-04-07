"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

function SignUpForm() {
  const inputRef = useRef<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });

  const router = useRouter();

  const onSubmit = async () => {
    try {
      const res = await fetch("http://35.216.97.185:8080/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(inputRef.current),
      });

      if (res.ok) {
        router.push("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">
      <div className="items-center justify-center space-y-4 bg-white shadow-lg p-8 w-[20rem] md:w-[33.5rem]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          회원가입
        </h1>
        <div>
          <input
            type="text"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일"
            onChange={(e) => {
              inputRef.current.email = e.target.value;
            }}
          />
          <p className="text-gray-500 text-sm">
            @를 포함한 올바른 이메일 형식으로 작성해주세요
          </p>
        </div>
        <div>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호"
            onChange={(e) => {
              inputRef.current.password = e.target.value;
            }}
          />
          <p className="text-gray-500 text-sm">
            대소문자, 숫자, 특수문자를 포함한 8-15자리
          </p>
        </div>
        <div>
          <input
            type="text"
            id="nickname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="닉네임"
            onChange={(e) => {
              inputRef.current.name = e.target.value;
            }}
          />
          <p className="text-gray-500 text-sm">10자 이하</p>
        </div>

        <button
          type="button"
          className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300 mb-4"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
