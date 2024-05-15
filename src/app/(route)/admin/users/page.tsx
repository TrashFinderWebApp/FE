"use client";

import useMemberQuery from "@/hooks/query/usememberquery";
import debounce from "@/util/debounce";
import { useState } from "react";

export default function UserPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const { data } = useMemberQuery(page, searchKeyword);
  const debouncedSearch = debounce(setSearchKeyword, 500);

  return (
    <div className="w-full h-full p-8 flex flex-col items-center gap-2">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">유저 관리</h1>
        <input
          placeholder="유저 검색"
          className="border-2 p-2 outline-none"
          type="text"
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-flow-row grid-rows-[repeat(20,minmax(0px,1fr))] h-full ">
        {data &&
          data?.memberInfoList &&
          data?.memberInfoList.map((member: any) => (
            <button
              type="button"
              key={member.memberId}
              className="flex p-1 gap-2 border-2 rounded-md"
            >
              <p>{member.memberId}</p>
              <p>{member.memberName}</p>
              <p>{member.memberStatus}</p>
              <p>{member.registerDate}</p>
            </button>
          ))}
      </div>
      <div className="flex items-center gap-2">
        {Array(data?.totalPages)
          .fill(0)
          .map((_, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
