"use client";

import { useState } from "react";

export default function NoticePage() {
  const [, setSearchKeyword] = useState("");

  return (
    <div className="w-full p-8">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-2xl">공지사항</h1>
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
