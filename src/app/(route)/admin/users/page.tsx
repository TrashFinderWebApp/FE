"use client";

import { useState } from "react";

export default function usersPage() {
  const [, setSearchKeyword] = useState("");

  return (
    <div className="w-full p-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">유저 관리</h1>
        <input
          placeholder="유저 검색"
          className="border-2 p-2 outline-none"
          type="text"
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
