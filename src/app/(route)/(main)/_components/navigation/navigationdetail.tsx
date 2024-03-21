import { RouteSection } from "@/types/navigate";

interface NavigationDetailProps {
  details: RouteSection;
  onClick: () => void;
  isSelected: boolean;
}

export default function NavigationDetail({
  details,
  onClick,
  isSelected,
}: NavigationDetailProps) {
  const bg = isSelected ? "bg-[#f8f8f8]" : "bg-white";

  return (
    <li>
      <button
        type="button"
        className={`relative flex flex-col border-2 border-t-0 w-[calc(100%+2rem)] right-4 ${bg}`}
        onClick={onClick}
      >
        <div className="relative flex items-end gap-2 w-full p-4 border-b">
          <div className="flex font-bold items-end">
            <div className="text-[1.75rem]">
              {(details.duration / 60).toFixed(0)}
            </div>
            <div className="relative bottom-1">분</div>
          </div>
          <div className="relative bottom-2 w-0 border-[1px] border-[#dddddd] h-[1rem]" />
          <div className="relative bottom-1 text-[#666666]">
            {details.distance > 1000
              ? `${(details.distance / 1000).toFixed(0)}km`
              : `${details.distance}m`}
          </div>
        </div>
        <div className="px-4 flex flex-col text-start ">
          {details.guides
            .slice(1, details.guides.length)
            .map((guide, idx, org) => (
              <ol
                key={guide.name + guide.guidance + guide.distance}
                className="flex items-center justify-between border-b-2 py-2 gap-2"
              >
                <div className="w-[2rem] h-[2rem] border-2 flex items-center justify-center rounded-full ">
                  {idx + 1}
                </div>
                <div className="flex-grow basis-0">
                  {`${idx !== org.length - 1 ? `${guide.name} ` : ""}${guide.guidance}`}
                </div>
                <div className="text-[#666666]">
                  {guide.distance > 1000
                    ? `${(guide.distance / 1000).toFixed(1)}km`
                    : `${guide.distance}m`}
                </div>
              </ol>
            ))}
        </div>
      </button>
    </li>
  );
}
