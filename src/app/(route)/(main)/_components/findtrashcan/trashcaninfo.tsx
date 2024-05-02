import Button from "@/components/button/button";
import { TrashCanInfo } from "@/types/TrashInfo";
import Image from "next/image";
import { useKakaoStore } from "@/stores/useKakaoStore";
import { useRouter } from "next/navigation";

export default function TrashCanDetail({ info }: { info: TrashCanInfo }) {
  const {
    addressDetail = "",
    address = "",
    distance = 0,
    imageList = [],
    latitude,
    longitude,
  } = info || {};

  const { kakaoRoadView, roadViewClient, setIsMapOpened } = useKakaoStore();
  const route = useRouter();
  return (
    <article className="w-full border-2 border-light-green rounded-md shadow-sm py-4">
      <div className="flex items-center justify-between px-3 pb-4">
        <h3 className="font-bold text-[1.125rem]">{addressDetail ?? ""}</h3>
        <img src="//svg/AlertIcon.svg" alt="쓰레기통 사진" />
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
          icon="/svg/NavigationIcon.svg"
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
          icon="/svg/RoadViewIcon.svg"
          content="로드뷰"
          className="flex-grow"
        />
      </div>
      <div className="px-3 text-sm flex items-center gap-1">
        <p className="font-bold">주소</p>
        <p>{address}</p>
        <p>내 위치에서 {distance ?? "0"}m</p>
      </div>
    </article>
  );
}
