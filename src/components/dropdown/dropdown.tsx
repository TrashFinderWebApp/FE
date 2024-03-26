import { useEffect, useRef, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  address_detail?: string;
  name?: string;
  id: string;
  category?: string;
  distance?: number;
}

interface DropDownProps {
  locationList: Location[];
  highlight?: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (location: Location) => void;
}

export default function DropDown({
  locationList,
  highlight = "",
  onClick,
}: DropDownProps) {
  const dropDownRef = useRef<HTMLUListElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropDownRef]);

  useEffect(() => {
    if (locationList.length > 0) {
      setIsOpened(true);
    }
  }, [locationList]);

  return (
    <div>
      {locationList.length > 0 && isOpened && (
        <ul
          ref={dropDownRef}
          className="absolute flex flex-col text-[0.875rem] whitespace-pre p-4 gap-1 rounded-md max-h-80 bg-white z-50 shadow-lg w-full overflow-y-scroll cursor-pointer [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#AAAAAA] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#D9D9D9]"
        >
          {locationList.map((location) => (
            <li
              role="presentation"
              key={location.id}
              className="flex justify-between"
              onClick={() => onClick?.(location)}
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
