/* eslint-disable no-unused-vars */
import DropDown from "@/components/dropdown/dropdown";
import useKeywordSearch from "@/hooks/useKeywordSearch";
import { LocationInfo, OptionalTrashCanInfo } from "@/types/TrashInfo";
import { Coordinate } from "@/types/navigate";
import { useMemo, useState } from "react";

interface SearchTargetProps {
  placeName: string;
  placeholder: string;
  logo: string;
  setTarget: (coordinate: Coordinate & { name?: string }) => void;
  keywordSearch: (
    keyword: string,
    callback: (data: any, status: any) => void,
  ) => void;
  resolveResult: (result: any) => LocationInfo & { id: string };
}

export default function SearchTarget({
  setTarget,
  placeName,
  placeholder,
  logo,
  keywordSearch,
  resolveResult,
}: SearchTargetProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [selected, setSelected] = useState<boolean>(true);
  const searchResult = useKeywordSearch(keyword, keywordSearch);

  const locationList = useMemo(
    () => searchResult.map(resolveResult),
    [searchResult],
  );

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className="w-full border-2 rounded-b-md outline-none px-4 py-2 pl-12"
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
          setTarget({
            x: Number(location.lng),
            y: Number(location.lat),
            name: location.name || location.address,
          });
          setSelected(true);
        }}
      />
    </div>
  );
}
