/* eslint-disable no-unused-vars */
import { resolveKakaoResult } from "@/app/(route)/(main)/_components/navigation/resolveresult";
import DropDown from "@/components/dropdown/dropdown";
import useKeywordSearch from "@/hooks/optimization/usekeywordsearch";
import { useKakaoStore } from "@/stores/usekakaostore";
import { Location, LocationInfo } from "@/types/trashinfo";
import { useCallback, useMemo, useState } from "react";

type SearchLocation = LocationInfo & { id: string };

interface SearchBarProps {
  placeholder: string;
  keywordSearchMethod: (
    keyword: string,
    callback: (data: any, status: any) => void,
  ) => void;
  resolveResult?: (result: any) => SearchLocation;
  logo?: string;
  className?: string;
  onClick?: (location: SearchLocation) => void;
  placeName?: string;
}

export default function SearchBar({
  placeholder,
  logo,
  keywordSearchMethod,
  resolveResult = resolveKakaoResult,
  onClick,
  className,
  placeName,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [_placeName, setPlaceName] = useState<string>(placeName || "");
  const [selected, setSelected] = useState<boolean>(true);
  const searchResult = useKeywordSearch(keyword, keywordSearchMethod);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const locationList = useMemo(
    () => searchResult.map(resolveResult),
    [searchResult],
  );

  const { setCenter } = useKakaoStore();

  const handleClick = useCallback(
    (location: Location) => {
      setCenter(location.latitude, location.longitude);
    },
    [onClick],
  );

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className={`w-full border-2 rounded-b-md outline-none px-4 py-2 pl-12 ${className}`}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundPosition: "left 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "2rem",
        }}
        onClick={(e) => {
          setKeyword("");
          setSelected(true);
        }}
        onChange={(e) => {
          setKeyword(e.currentTarget.value);
          setSelected(false);
        }}
        onKeyDown={(e) => {
          if (locationList.length === 0) return;

          if (e.key === "ArrowDown") {
            setSelectedIdx((prev) =>
              prev === null || prev === locationList.length - 1 ? 0 : prev + 1,
            );
          } else if (e.key === "ArrowUp") {
            setSelectedIdx((prev) =>
              prev === null || prev === 0 ? locationList.length - 1 : prev - 1,
            );
          } else if (e.key === "Enter") {
            const location = locationList[selectedIdx];
            setKeyword(location.name || location.address || "");
            setSelected(true);
            setPlaceName(location.name || location.address || "");
            handleClick?.(location);
          }
        }}
        defaultValue={selected ? _placeName : keyword}
      />
      <DropDown
        locationList={locationList}
        highlight={keyword}
        selectedIdx={selectedIdx || 0}
        onClick={(location) => {
          setKeyword(location.name || location.address || "");
          setSelected(true);
          setPlaceName(location.name || location.address || "");
          handleClick?.(location);
        }}
      />
    </div>
  );
}
