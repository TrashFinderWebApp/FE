"use client";

import { APIURL } from "@/util/const";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

function SignUpForm() {
  const inputRef = useRef<{
    email: string;
    authCode: string;
    password: string;
    name: string;
    matchPassword: string;
  }>({
    email: "",
    authCode: "",
    password: "",
    matchPassword: "",
    name: "",
  });

  const router = useRouter();

  const [emailCheckClicked, setEmailCheckClicked] = useState(false);

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

      if (res.status === 400) {
        await res.json().then((data) => {
          alert(data?.message ?? data?.errorMessage);
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      <div className="items-center justify-center space-y-4 bg-white shadow-lg p-8 w-[20rem] md:w-[33.5rem] min-w-[80%]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          회원가입
        </h1>
        <div>
          <div className="flex flex-row items-center gap-2">
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일"
              onChange={(e) => {
                inputRef.current.email = e.target.value;
              }}
            />
            <button
              type="button"
              className="bg-light-green text-white font-bold p-2 rounded-md whitespace-pre"
              onClick={() => {
                const formData = new FormData();

                formData.append("email", inputRef.current.email);

                fetch(`${APIURL}/api/members/emails/verification-requests`, {
                  method: "POST",

                  body: formData,
                })
                  .then((res) => {
                    if (res.ok) {
                      setEmailCheckClicked(true);
                      alert("이메일이 발송되었습니다.");
                    }
                  })
                  .catch((e) => console.error(e));
              }}
            >
              이메일 인증
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            @를 포함한 올바른 이메일 형식으로 작성해주세요
          </p>
        </div>
        {emailCheckClicked && (
          <div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="text"
                id="emailVerificationCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="인증번호"
                onChange={(e) => {
                  inputRef.current.authCode = e.target.value;
                }}
              />
              <button
                type="button"
                className="bg-light-green text-white font-bold p-2 rounded-md whitespace-pre"
                onClick={() => {
                  fetch(
                    `${APIURL}/api/members/emails/verifications?email=${inputRef.current.email}&code=${inputRef.current.authCode}`,
                  )
                    .then((res) => {
                      if (res.ok) {
                        alert("인증 되었습니다.");
                      }
                    })
                    .catch((e) => console.error(e));
                }}
              >
                인증번호 확인
              </button>
            </div>
            <p className="text-gray-500 text-sm">인증번호를 입력해주세요.</p>
          </div>
        )}
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
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호"
            onChange={(e) => {
              inputRef.current.matchPassword = e.target.value;
            }}
          />
          <p className="text-gray-500 text-sm">비밀번호를 다시 입력해주세요.</p>
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
