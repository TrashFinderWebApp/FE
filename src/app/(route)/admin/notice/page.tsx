"use client";

import ButtonList from "@/components/button/buttonlist";
import Modal from "@/components/modal/modal";
import useNoticeMutation from "@/hooks/mutation/useNoticeMutation";
import useNoticeQuery, {
  NoticeResponse,
  NoticeType,
  NoticeTypeDict,
} from "@/hooks/query/useNoticeQuery";
import { ButtonProps } from "@/types/button";
import { useRef, useState } from "react";

const buttonProps: ButtonProps<NoticeType>[] = [
  {
    content: "전체",
    type: "all",
  },
  {
    content: "업데이트",
    type: "updated",
  },
  {
    content: "이벤트",
    type: "event",
  },
  {
    content: "일반",
    type: "general",
  },
];

const defaultRef = {
  title: "",
  description: "",
  createdAt: "",
  state: "",
};

export default function NoticePage() {
  const { data: noticeData } = useNoticeQuery();
  const [selectedNoticeType, setSelectedNoticeType] =
    useState<NoticeType>("all");
  const selectedNoticeRef = useRef<NoticeResponse>(defaultRef);
  const [selectedNoticeId] = useState<string>("");
  const [selectedNoticeRefType, setSelectedNoticeRefType] =
    useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createNotice, setCreateNotice] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState(false);

  const { mutate } = useNoticeMutation({
    id: selectedNoticeId,
    method: deleteNotice ? "DELETE" : "POST",
  });

  return (
    <div className="w-full p-8 flex flex-col">
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCreateNotice(false);
        }}
      >
        {deleteNotice ? (
          <div className="flex flex-col items-center gap-2">
            <p>정말로 삭제하시겠습니까?</p>
            <button
              type="button"
              className="w-full bg-dark-blue text-white text-[1.25rem] font-bold p-2 rounded-md"
              onClick={() => {
                setIsModalOpen(false);
                setDeleteNotice(false);
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="w-full bg-red-500 text-white text-[1.25rem] font-bold p-2 rounded-md"
              onClick={() => {
                mutate(selectedNoticeRef.current);
                setIsModalOpen(false);
                setDeleteNotice(false);
              }}
            >
              삭제
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 p-4 break-all">
            <fieldset className="flex items-center">
              state:
              <div className="flex gap-2">
                {["업데이트", "이벤트", "일반"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`mx-1 border-2 p-2 rounded-md font-bold border-dark-green ${selectedNoticeRefType === type ? " bg-dark-green text-white" : ""}`}
                    onClick={() => {
                      selectedNoticeRef.current.state = type;
                      setSelectedNoticeRefType(type);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </fieldset>
            <p className="flex items-center">
              title:
              <input
                defaultValue={selectedNoticeRef.current.title}
                onChange={(e) => {
                  selectedNoticeRef.current.title = e.target.value;
                }}
                className="flex-grow border-2 p-1 rounded-md"
              />
            </p>
            <p className="flex flex-col">
              description:
              <textarea
                defaultValue={selectedNoticeRef.current.description}
                onChange={(e) => {
                  selectedNoticeRef.current.description = e.target.value;
                }}
                className="flex-grow border-2 p-1 rounded-md w-96"
              />
            </p>
            <button
              type="button"
              className="bg-dark-blue text-white text-[1.25rem] font-bold p-2 rounded-md"
              onClick={() => {
                if (createNotice) {
                  mutate(selectedNoticeRef.current);
                }
              }}
            >
              {createNotice ? "생성" : "수정"}하기
            </button>
            {createNotice || (
              <button
                type="button"
                className="bg-red-600 text-white text-[1.25rem] font-bold p-2 rounded-md"
                onClick={() => {
                  setIsModalOpen(true);
                  setDeleteNotice(true);
                }}
              >
                삭제하기
              </button>
            )}
          </div>
        )}
      </Modal>
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-2xl">공지사항</h1>
        <div className="flex gap-2 items-center">
          <ButtonList
            selectedStatus={selectedNoticeType}
            setselectedStatus={setSelectedNoticeType}
            buttonInfo={buttonProps}
            className="w-fit-content"
          />

          <button
            type="button"
            className="bg-dark-blue text-white font-bold p-2 rounded-md"
            onClick={() => {
              selectedNoticeRef.current = defaultRef;
              setSelectedNoticeRefType("");
              setIsModalOpen(!isModalOpen);
              setCreateNotice(true);
            }}
          >
            공지 생성
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#AAAAAA] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#D9D9D9]">
        {noticeData
          ?.sort(
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
                <p className="text-light-green whitespace-pre">
                  [{item.state}]
                </p>
                <p className="break-all mr-10">{item.title}</p>
                <button
                  className="absolute top-4 right-4 text-2xl text-center"
                  type="button"
                  onClick={() => {
                    selectedNoticeRef.current = { ...item };

                    setIsModalOpen(!isModalOpen);
                    setSelectedNoticeRefType(item.state);
                  }}
                >
                  +
                </button>
              </h3>
              <p>{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
