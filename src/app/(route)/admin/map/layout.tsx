"use client";

import { useMemo, useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import SearchBar from "@/components/searchbar/searchbar";
import useMap from "@/hooks/map/useMap";
import { useKakaoStore } from "@/stores/useKakaoStore";
import MapContext from "./[...status]/mapContext";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { kakaoMap, keywordSearch } = useKakaoStore();
  const [refreshCallback, setRefreshCallback] = useState<() => void>(() => {});
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  console.log(refreshCallback);

  const context = useMemo(
    () => ({ setRefreshCallback, setNeedRefresh }),
    [setRefreshCallback, setNeedRefresh],
  );

  useMap(mapRef);

  return (
    <>
      <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
        <SearchBar
          placeholder="장소, 도로, 건물 검색"
          onClick={(location) => {
            kakaoMap?.panTo(
              new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude,
              ),
            );
            refreshCallback();
          }}
          logo="/svg/searchicon.svg"
          keywordSearchMethod={keywordSearch}
          className="border-2 border-light-green rounded-md p-2"
        />
        <MapContext.Provider value={context}>{children}</MapContext.Provider>
      </Accordion>
      <button
        className={`absolute duration-300 top-4 left-[50%] -translate-x-[50%] z-50 bg-white rounded-md shadow-lg p-4 font-bold text-light-blue ${needRefresh ? "bg-white pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        type="button"
        onClick={() => {
          setNeedRefresh(false);
          refreshCallback();
        }}
      >
        새로 고침
      </button>

      <div
        ref={mapRef}
        className="h-full absolute w-[calc(100%-15rem)] right-0"
      />
    </>
  );
}
