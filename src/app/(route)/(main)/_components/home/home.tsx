import SearchBar from "@/components/searchbar/searchbar";
import { useKakaoStore } from "@/stores/useKakaoStore";
import Link from "next/link";

export default function Home() {
  const { keywordSearch } = useKakaoStore();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 font-bold text-[1.75rem]">
        <div>ㅇ</div>
        <div>
          <span>닉네임</span> 님
        </div>
      </h2>
      <SearchBar
        placeholder="장소, 도로, 건물 검색"
        keywordSearchMethod={keywordSearch}
        className="border-2 border-light-green rounded-md"
        logo="/svg/searchicon.svg"
      />
      <div className="bg-[#A1D7FF] bg-opacity-20 rounded-md px-3 py-2 mt-2 flex items-center gap-2 ">
        <img src="svg/megaphone.svg" alt="" />
        <div className="flex text-[0.875rem] gap-2">
          <p className="font-bold">[업데이트]</p>
          <p className="truncate w-[9rem]">
            테스트 zzzzzzzzzzzzzzzzzzxxxxxxxxxxxxxxx
          </p>
        </div>
        <div className="flex-grow" />
        <Link href="/Notice" className="text-sm text-[#666666]">
          더보기
        </Link>
      </div>
      <div className="border w-full my-4" />
      <div className="ranking flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.25rem] font-bold">랭킹</h3>
          <Link href="/Ranking" className="text-sm text-[#666666]">
            더보기
          </Link>
        </div>
        <div className="border-2 border-light-green shadow-md rounded-md font-bold px-8 py-4 flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div className="flex items-end">
              <p className="text-[1.5rem] mr-1">00등</p>/
              <p className="text-[0.875rem]">000명</p>
            </div>
            <div className="text-[0.875rem] text-light-green">000 point</div>
          </div>
          <div className="relative flex justify-between rounded-md bg-[#eeeeee] h-8">
            <div
              className="bg-light-green rounded-l-md"
              style={{
                width: "50%",
              }}
            />
            <div className="text-sm absolute right-2 top-[50%] -translate-y-[50%]">
              상위 0%
            </div>
          </div>
        </div>
      </div>
      <div className="border w-full my-4" />
      <div className="RecordByMe">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.25rem] font-bold">내가 등록한 장소</h3>
          <button type="button" className="text-sm text-[#666666]">
            최근 등록 순
          </button>
        </div>
        <div className="shadow-md rounded-md border-2 border-[#aaaaaa] p-3 flex text-sm">
          <img
            src="img/TEST.jpg"
            alt=""
            className="w-[30%] aspect-[5/3] object-cover rounded-sm"
          />
          <div className="ml-2 flex flex-col">
            <p className="text-[0.875rem] font-semibold">로데오거리 쓰레기통</p>
            <p className="truncate w-36">부산광역시 동구 중앙대로 200222222</p>
            <p className="mt-6">0000년 00월 00일</p>
          </div>
          <div className="flex-grow" />
          <div className="flex flex-col items-end justify-between">
            <div className="px-2 bg-[#E74A62] text-white rounded-md">
              등록성공
            </div>
            <div className="font-bold text-[0.875rem] text-light-green">
              + 5 Point
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
