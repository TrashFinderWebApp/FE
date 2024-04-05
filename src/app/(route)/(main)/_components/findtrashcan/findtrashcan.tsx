"use client";

import { TrashCanInfo } from "@/types/TrashInfo";
import SearchBar from "@/components/searchbar/searchbar";
import { useKakaoStore } from "@/stores/useKakaoStore";
import TrashCanDetail from "./trashcaninfo";

const status = ["added", "waiting", "removed"] as const;

const tempData = Array(10)
  .fill(0)
  .map(
    (_, i): TrashCanInfo => ({
      name: `로데오 거리 쓰레기통 ${i + 1}`,
      address: "서울특별시 강남구 강남대로 1234",
      status: status[i % 3],
      imageList: ["/img/TEST.jpg", "/img/TEST.jpg", "/img/TEST.jpg"],
      lat: 37.497942,
      lng: 127.026978,
      id: `${i}`,
    }),
  );

export default function FindTrashCan() {
  const { keywordSearch } = useKakaoStore();
  return (
    <div>
      <SearchBar
        placeholder="장소, 도로, 건물 검색"
        keywordSearchMethod={keywordSearch}
        className="border-2 border-light-green rounded-md mb-4"
        logo="/svg/searchicon.svg"
      />
      <h2 className="font-extrabold text-[1.25rem]">
        가장 가까운 쓰레기통 위치
      </h2>
      <TrashCanDetail info={tempData[0]} />
      <div className="border w-full mt-8" />
      <div className="my-2">
        <h2 className="font-extrabold text-[1.25rem]">주변 쓰레기통 위치</h2>
      </div>
      <div className="flex flex-col space-y-6">
        {tempData.map((data) => (
          <TrashCanDetail key={data.id} info={data} />
        ))}
      </div>
    </div>
  );
}
