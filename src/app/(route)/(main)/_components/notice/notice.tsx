"use client";

import Modal from "@/components/modal/modal";
import useNoticeQuery, {
  NoticeResponse,
  NoticeType,
  NoticeTypeDict,
} from "@/hooks/query/usenoticequery";
import { useState } from "react";

export default function Notice() {
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data: noticeData } = useNoticeQuery(page);
  const [selectedNotice, setSelectedNotice] = useState<NoticeResponse | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-4">
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="공지사항"
      >
        <div className="flex flex-col gap-4 p-4 break-all">
          <h3 className="text-lg font-bold flex gap-2">
            <p className="text-light-green whitespace-pre">
              [
              {selectedNotice?.state &&
                NoticeTypeDict[selectedNotice?.state as NoticeType]}
              ]
            </p>
            <p className="break-all mr-10">{selectedNotice?.title}</p>
          </h3>
          <p>{selectedNotice?.description}</p>
        </div>
      </Modal>
      <h2 className="text-[1.25rem] font-extrabold">공지사항</h2>
      <div className="grid w-full grid-cols-4">
        {Object.entries(NoticeTypeDict).map((type) => (
          <button
            key={type[0]}
            type="button"
            onClick={() =>
              setSelectedNoticeType(
                type[0] as "all" | "updated" | "event" | "general",
              )
            }
            className={`${selectedNoticeType === type[0] ? "text-light-green border-b-4 border-light-green font-bold" : "border-b-2 py-2"}`}
          >
            {type[1]}
          </button>
        ))}
      </div>

      {noticeData?.notificationInfoList
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .filter((item) =>
          selectedNoticeType === "all"
            ? true
            : item.state === NoticeTypeDict[selectedNoticeType],
        )
        ?.map((item: NoticeResponse) => (
          <div
            key={item.createdAt}
            className="relative flex flex-col gap-2 border-2 p-4 rounded-md"
          >
            <h3 className="text-lg font-bold flex gap-2">
              <p className="text-light-green whitespace-pre">[{item.state}]</p>
              <p className="break-all mr-10">{item.title}</p>
              <button
                className="absolute top-4 right-4 text-2xl text-center"
                type="button"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  setSelectedNotice(item);
                }}
              >
                +
              </button>
            </h3>
            <p>{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      {Array(noticeData?.totalPage)
        .fill(0)
        .map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <button key={index} type="button" onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
    </div>
  );
}
