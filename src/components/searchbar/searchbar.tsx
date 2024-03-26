import { useKakaoStore } from "@/stores/useKakaoStore";
import { useCallback, useMemo, useState } from "react";
import debounce from "../util/debounce";
import DropDown from "../dropdown/dropdown";

/* eslint-disable no-unused-vars */
interface SearchBarProps {
  placeholder?: string;
}

interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export default function SearchBar({
  placeholder = "검색어를 입력하세요.",
}: SearchBarProps) {
  const { keywordSearch, kakaoMap } = useKakaoStore();
  const debouncedSearch = useCallback(debounce(keywordSearch, 500), [
    keywordSearch,
  ]);
  const [searchResult, setSearchResult] = useState<Place[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const locationList = useMemo(
    () =>
      searchResult.map((result) => ({
        latitude: Number(result.y),
        longitude: Number(result.x),
        address: result.road_address_name,
        name: result.place_name,
        id: result.id,
        category: result.category_group_name,
      })),
    [searchResult],
  );

  return (
    <div className="relative">
      <input
        className="flex-grow outline-none border-2 border-light-green rounded-md p-2 w-full pl-10"
        placeholder={placeholder}
        style={{
          backgroundImage: "url(/svg/searchIcon.svg)",
          backgroundPosition: "left 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.75rem",
        }}
        onChange={(e) => {
          debouncedSearch(e.currentTarget.value, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setSearchResult(data);
            } else {
              setSearchResult([]);
            }
          });
          setKeyword(e.currentTarget.value);
        }}
      />
      <DropDown
        locationList={locationList}
        highlight={keyword}
        onClick={(location) => {
          kakaoMap?.setCenter(
            new window.kakao.maps.LatLng(location.latitude, location.longitude),
          );
        }}
      />
    </div>
  );
}
