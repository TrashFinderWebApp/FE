/* eslint-disable no-unused-vars */
import { resolveKakaoResult } from "@/app/(route)/(main)/_components/navigation/resolveresult";
import DropDown from "@/components/dropdown/dropdown";
import useKeywordSearch from "@/hooks/useKeywordSearch";
import { Location } from "@/types/navigate";
import { useMemo, useState } from "react";

interface SearchBarProps {
  placeholder: string;
  keywordSearchMethod: (
    keyword: string,
    callback: (data: any, status: any) => void,
  ) => void;
  resolveResult?: (result: any) => Location;
  logo?: string;
  className?: string;
  onClick?: (location: Location) => void;
}

export default function SearchBar({
  placeholder,
  logo,
  keywordSearchMethod,
  resolveResult = resolveKakaoResult,
  onClick,
  className,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");
  const [selected, setSelected] = useState<boolean>(true);
  const searchResult = useKeywordSearch(keyword, keywordSearchMethod);

  const locationList = useMemo(
    () => searchResult.map(resolveResult),
    [searchResult],
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
          setSelected(false);
        }}
        onChange={(e) => {
          setKeyword(e.currentTarget.value);
          setSelected(false);
        }}
        value={selected ? placeName : keyword}
      />
      <DropDown
        locationList={locationList}
        highlight={keyword}
        onClick={(location) => {
          setKeyword(location.name || location.address);
          setSelected(true);
          setPlaceName(location.name || location.address);
          onClick?.(location);
        }}
      />
    </div>
  );
}
