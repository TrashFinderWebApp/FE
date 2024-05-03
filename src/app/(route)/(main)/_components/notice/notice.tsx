"use client";

import Modal from "@/components/modal/modal";
import { APIURL } from "@/util/const";
import { useEffect, useState } from "react";

const NoticeTypeDict = {
  all: "전체",
  updated: "업데이트",
  general: "일반",
  event: "이벤트",
};

type NoticeType = keyof typeof NoticeTypeDict;

interface NoticeResponse {
  title: string;
  description: string;
  createdAt: string;
}

interface NoticeState extends NoticeResponse {
  type: NoticeType;
}

export default function Notice() {
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<Record<NoticeType, NoticeState[]>>({
    all: [],
    updated: [],
    general: [],
    event: [],
  });
  const [selectedNotice, setSelectedNotice] = useState<NoticeState | null>(
    null,
  );

  useEffect(() => {
    const fetchNotice = async (type: NoticeType) => {
      const res = await fetch(`${APIURL}/api/notification/list/${type}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("공지사항을 불러오는데 실패했습니다.");
      }
      const data = await res.json();
      return data as NoticeResponse[];
    };
    const notices = ["updated", "general", "event"] as NoticeType[];
    Promise.allSettled(
      notices.map((type) => fetchNotice(type as NoticeType)),
    ).then((data) => {
      const noticeData = data.reduce(
        (acc, cur, idx) => {
          if (!acc.all) acc.all = [];
          if (cur.status === "fulfilled") {
            const curData = cur.value.map((item) => ({
              ...item,
              type: notices[idx],
            }));
            acc[notices[idx]] = curData;
            acc.all.push(...curData);
          }
          return acc;
        },
        {} as Record<NoticeType, NoticeState[]>,
      );
      setNotice(noticeData);
    });
  }, []);

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
              [{selectedNotice?.type && NoticeTypeDict[selectedNotice?.type]}]
            </p>
            <p className="break-all mr-10">{selectedNotice?.title}</p>
          </h3>
          <p>{selectedNotice?.description}</p>
        </div>
      </Modal>
      <h2 className="text-[1.25rem] font-extrabold">랭킹</h2>
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

      {notice[selectedNoticeType]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        ?.map((item: NoticeState) => (
          <div
            key={item.createdAt}
            className="relative flex flex-col gap-2 border-2 p-4 rounded-md"
          >
            <h3 className="text-lg font-bold flex gap-2">
              <p className="text-light-green whitespace-pre">
                [{NoticeTypeDict[item.type]}]
              </p>
              <p className="break-all mr-10">
                {item.title} zzzzzzzzzzzzzzzzzzx
              </p>
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
    </div>
  );
}
