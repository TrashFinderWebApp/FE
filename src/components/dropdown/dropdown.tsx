import { LocationInfo } from "@/types/TrashInfo";
import { ScrollBarStyle } from "@/util/const";
import { useEffect, useState } from "react";

type LocationIdType = LocationInfo & { id: string };

interface DropDownProps {
  locationList: LocationIdType[];
  highlight?: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (location: LocationIdType) => void;
  selectedIdx: number;
}

export default function DropDown({
  locationList,
  highlight = "",
  onClick,
  selectedIdx,
}: DropDownProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpened(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (locationList.length > 0) {
      setIsOpened(true);
    }
  }, [locationList]);

  return (
    <div>
      {locationList.length > 0 && isOpened && (
        <ul
          className={`absolute flex flex-col text-[0.875rem] whitespace-pre p-4 gap-1 rounded-md max-h-80 bg-white z-50 shadow-lg w-full overflow-y-scroll cursor-pointer ${ScrollBarStyle}`}
        >
          {locationList.map((location, idx) => (
            <li
              role="presentation"
              key={location.id}
              className={`flex justify-between${selectedIdx === idx ? " bg-[#F0F0F0]" : ""}`}
              onClick={() => {
                onClick?.(location);
                setIsOpened(false);
              }}
            >
              <div className="flex flex-col">
                <div className="flex">
                  <div>
                    {location.name?.substring(
                      0,
                      location.name?.indexOf(highlight),
                    )}
                  </div>
                  <div className="font-bold text-blue-600">
                    {location.name?.substring(
                      location.name?.indexOf(highlight),
                      location.name?.indexOf(highlight) !== -1
                        ? location.name.indexOf(highlight) + highlight.length
                        : 0,
                    )}
                  </div>
                  <div>
                    {location.name?.substring(
                      location.name?.indexOf(highlight) !== -1
                        ? location.name.indexOf(highlight) + highlight.length
                        : 0,
                    )}
                  </div>
                </div>
                <div className="text-sm text-[#888888] ">
                  {location.address}
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <div>{location.category}</div>
                <div className="text-sm text-[#888888]">
                  {location.distance ? `${location.distance}m` : ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
