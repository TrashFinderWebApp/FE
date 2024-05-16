import Button from "@/components/button/button";
import { TrashCanInfo } from "@/types/trashinfo";
import Image from "next/image";
import { useKakaoStore } from "@/stores/usekakaostore";
import { useRouter } from "next/navigation";
import { APIURL } from "@/util/const";
import Modal from "@/components/modal/modal";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function TrashCanDetail({ info }: { info: TrashCanInfo }) {
  const {
    addressDetail = "",
    imageUrls: imageList = [],
    latitude,
    longitude,
    trashcanId: id,
  } = info || {};

  const { kakaoRoadView, roadViewClient, setIsMapOpened } = useKakaoStore();
  const session = useSession();
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <article className="w-full border-2 border-light-green rounded-md shadow-sm py-4">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[1.25rem]">
            쓰레기통을 신고하는 이유를 작성해주세요.
          </p>
          <textarea
            className="border-2 rounded-md min-h-32"
            ref={textareaRef}
          />
          <Button
            onClick={() => {
              fetch(
                `${APIURL}/api/trashcans/reports/${id}?description=${textareaRef.current?.value}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.data?.accessToken}`,
                  },
                  body: JSON.stringify({
                    description: textareaRef.current?.value,
                  }),
                },
              )
                .then((res) => res.json())
                .then((data) => {
                  alert(data.message);
                });
            }}
            content="신고하기"
            className="bg-light-green text-white font-bold"
          />
        </div>
      </Modal>
      <div className="flex items-center justify-between px-3 pb-4">
        <h3 className="font-bold text-[1.125rem]">{addressDetail ?? ""}</h3>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <img src="/svg/alerticon.svg" alt="쓰레기통 사진" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        {imageList?.slice(0, 2).map((img, idx) => (
          <Image
            key={`${img + idx}`}
            src={img}
            alt="쓰레기통 사진"
            sizes="100vw"
            style={{
              width: "calc(50% - 0.1rem)",
              aspectRatio: "16/10",
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={500}
            height={100}
            loading="lazy"
          />
        ))}
      </div>
      <div className="flex items-center justify-center p-3 gap-3">
        <Button
          onClick={() => {
            route.push(`/GetDirection/${latitude}/${longitude}`);
          }}
          icon="/svg/navigationicon.svg"
          content="길찾기"
          className="flex-grow"
        />
        <Button
          onClick={() => {
            roadViewClient.getNearestPanoId(
              new window.kakao.maps.LatLng(latitude, longitude),
              50,
              (panoId: any) => kakaoRoadView.setPanoId(panoId),
            );
            setIsMapOpened(false);
          }}
          icon="/svg/roadviewicon.svg"
          content="로드뷰"
          className="flex-grow"
        />
      </div>
    </article>
  );
}
