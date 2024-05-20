"use client";

import Button from "@/components/button/button";
import ButtonList from "@/components/button/buttonlist";
import Modal from "@/components/modal/modal";
import useTrashcanInfoByIdQuery from "@/hooks/query/usetrashcaninfobyid";
import useTrashcanListQuery from "@/hooks/query/usetrashcanlist";
import { ButtonProps } from "@/types/button";
import { TrashCanInfo, TrashCanStatus } from "@/types/trashinfo";
import { useEffect, useState } from "react";

const buttonProps: ButtonProps<TrashCanStatus>[] = [
  {
    content: "추가",
    type: "ADDED",
  },
  {
    content: "등록",
    type: "REGISTERED",
  },
  {
    content: "요청",
    type: "SUGGESTED",
  },
  {
    content: "삭제",
    type: "REMOVED",
  },
];

export default function TrashCansPage() {
  const [page, setPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<TrashCanStatus>("ADDED");
  const { data } = useTrashcanListQuery(page, selectedStatus, "DESC");
  const [modalOpened, setModalOpened] = useState(true);
  const [trashcanId, setTrashcanId] = useState<string>("");
  const { data: trashcanData, status: trashcanLoadStatus } =
    useTrashcanInfoByIdQuery(trashcanId);

  useEffect(() => {
    setPage(0);
  }, [selectedStatus]);

  const getPageArray = () => {
    if (!data?.totalPages) return [];
    const floor = Math.floor(page / 10) * 10;
    if (data.totalPages - floor > 9) {
      return Array(10)
        .fill(0)
        .map((_, idx) => idx + floor);
    }

    return Array(data.totalPages - floor)
      .fill(0)
      .map((_, idx) => idx + floor);
  };

  return (
    <div className="w-full h-full p-8 flex flex-col items-center gap-2">
      <Modal isOpen={modalOpened} onClose={() => setModalOpened(false)}>
        {trashcanLoadStatus === "pending" ? (
          <div>로딩중...</div>
        ) : (
          <div className="flex flex-col">
            <p>{trashcanData?.address}</p>
            <p>{trashcanData?.addressDetail}</p>
            <p>{trashcanData?.createdAt}</p>
            <p>{trashcanData?.status}</p>
            <p>설명</p>
            {trashcanData?.description?.map((desc) => <p>{desc}</p>)}
            <p>이미지</p>
            <div className="grid grid-cols-3 gap-1">
              {trashcanData?.imageUrls?.map((url) => (
                <img
                  src={url}
                  alt=""
                  className="w-full aspect-square object-cover rounded-md border-2"
                />
              ))}
            </div>
            <Button
              content="삭제하기"
              onClick={() => {}}
              className="bg-red-600 border-red-600 text-white"
            />
          </div>
        )}
      </Modal>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">쓰레기통 관리</h1>
        <ButtonList
          buttonInfo={buttonProps}
          selectedStatus={selectedStatus}
          setselectedStatus={setSelectedStatus}
        />
      </div>
      <div className="grid grid-flow-row grid-rows-[repeat(10,minmax(0px,1fr))] gap-2 h-full">
        {data &&
          data?.trashcanListResponses &&
          data?.trashcanListResponses.map((trashcan: TrashCanInfo) => (
            <button
              type="button"
              key={trashcan.trashcanId}
              className="flex p-1 gap-2 border-2 rounded-md"
              onClick={() => {
                setModalOpened(true);
                setTrashcanId(trashcan.trashcanId);
              }}
            >
              <p>{trashcan.trashcanId}</p>
              <p>{trashcan.address}</p>
              <p>{trashcan.addressDetail}</p>
              <p>{trashcan.description}</p>
            </button>
          ))}
      </div>
      <div className="flex items-center gap-2">
        {page > 9 && (
          <button
            type="button"
            onClick={() => {
              if (data?.totalPages)
                setPage((prev) => (Math.floor(prev / 10) - 1) * 10);
            }}
          >
            {"<<"}
          </button>
        )}
        {getPageArray().map((index) => (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => setPage(index)}
            className={index === page ? "font-bold" : ""}
          >
            {index + 1}
          </button>
        ))}
        {data?.totalPages &&
          Math.floor(data.totalPages / 10) !== Math.floor(page / 10) && (
            <button
              type="button"
              onClick={() => {
                if (data?.totalPages)
                  setPage((prev) => (Math.floor(prev / 10) + 1) * 10);
              }}
            >
              {">>"}
            </button>
          )}
      </div>
      <input
        className="border p-1 rounded-md"
        placeholder={`페이지 입력 / ${data?.totalPages}`}
        type="number"
        onKeyDown={(e) => {
          const num = Number(e.currentTarget.value);
          if (!data?.totalPages) return;
          if (e.key === "Enter" && num >= 0 && num <= data.totalPages) {
            setPage(num - 1);
          }
        }}
      />
    </div>
  );
}
