"use client";

import SearchBar from "@/components/searchbar/searchbar";
import { useKakaoStore } from "@/stores/usekakaostore";
import { useTrashCanStore } from "@/stores/usetrashcanstore";
import TrashCanDetail from "./trashcaninfo";

export default function FindTrashCan() {
  const { keywordSearch } = useKakaoStore();
  const { trashCanList } = useTrashCanStore();

  if (!trashCanList.length) {
    return (
      <h2 className="font-extrabold text-[1.25rem]">
        주변에 쓰레기통이 없습니다!
      </h2>
    );
  }

  return (
    <div>
      <SearchBar
        placeholder="장소, 도로, 건물 검색"
        keywordSearchMethod={keywordSearch}
        className="border-2 border-light-green rounded-md mb-4"
        logo="/svg/searchicon.svg"
      />
      <h2 className="font-extrabold text-[1.25rem]">
        지도에서 가장 가까운 쓰레기통 위치
      </h2>
      <TrashCanDetail info={trashCanList[0]} />
      <div className="border w-full mt-8" />
      <div className="my-2">
        <h2 className="font-extrabold text-[1.25rem]">주변 쓰레기통 위치</h2>
      </div>

      <div className="flex flex-col space-y-6">
        {trashCanList.slice(1).map((trashcan) => (
          <TrashCanDetail key={trashcan.id} info={trashcan} />
        ))}
      </div>
    </div>
  );
}
