"use client";

import useReportsQuery from "@/hooks/query/usereportsquery";
import { useState } from "react";

export default function ReportsPage() {
  const [page, setPage] = useState(0);
  const { data } = useReportsQuery(page);

  return (
    <div className="w-full h-full p-8 flex flex-col items-center gap-2">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">신고 관리</h1>
      </div>
      <div className="grid grid-flow-row grid-rows-[repeat(20,minmax(0px,1fr))] h-full ">
        {data &&
          data?.reportResponses &&
          data?.reportResponses.map((trashcan: any) => (
            <button
              type="button"
              key={trashcan.id}
              className="flex p-1 gap-2 border-2 rounded-md"
            >
              <p>{trashcan.id}</p>
              <p>{trashcan.memberId}</p>
              <p>{trashcan.createdAt}</p>
              <p>{trashcan.description}</p>
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
