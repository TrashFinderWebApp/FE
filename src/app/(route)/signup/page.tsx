import React from "react";

function SignUpForm() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white">
      <div className="items-center justify-center space-y-4 bg-white shadow-lg p-8 w-[20rem] md:w-[33.5rem]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          회원가입
        </h1>
        <div>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일(필수)"
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
            placeholder="비밀번호(필수)"
          />
          <p className="text-gray-500 text-sm">
            대소문자, 숫자, 특수문자를 포함한 8-15자리
          </p>
        </div>
        <div>
          <input
            type="text"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="닉네임(필수)"
          />
          <p className="text-gray-500 text-sm">10자 이하</p>
        </div>

        <button
          type="button"
          className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300 mb-4"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
