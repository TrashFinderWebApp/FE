import Button from "@/components/button/button";
import { TrashCan } from "@/types/TrashInfo";
import Image from "next/image";

interface TrashCanInfoProps extends TrashCan {
  distance?: number;
}

export default function TrashCanInfo({
  title,
  address,
  imageList,
  distance,
}: TrashCanInfoProps) {
  return (
    <article className="w-full border-2 border-light-green rounded-md shadow-sm py-4">
      <div className="flex items-center justify-between px-3 pb-4">
        <h3 className="font-bold text-[1.125rem]">{title ?? ""}</h3>
        <img src="svg/AlertIcon.svg" alt="쓰레기통 사진" />
      </div>
      <div className="flex items-center justify-between">
        {imageList?.slice(0, 2).map((img) => (
          <Image
            key={img}
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
      <div className="flex items-center justify-center py-3 gap-3">
        <Button
          onClick={() => {}}
          icon="svg/ShareIcon.svg"
          className="px-1 py-1 aspect-square"
        />
        <Button
          onClick={() => {}}
          icon="svg/NavigationIcon.svg"
          content="길찾기"
        />
        <Button
          onClick={() => {}}
          icon="svg/RoadViewIcon.svg"
          content="로드뷰"
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
