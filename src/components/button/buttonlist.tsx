import { ButtonProps } from "@/types/button";
import Button from "./button";

interface ButtonListProps<T extends unknown> {
  selectedStatus: T;
  setselectedStatus: (
    // eslint-disable-next-line no-unused-vars
    status: T,
  ) => void | React.Dispatch<React.SetStateAction<T>>;
  buttonInfo: ButtonProps<T>[];
}

const buttontTailwindConfig = {
  selected:
    "flex-grow rounded-md border-2 border-0 shadow-md bg-light-green text-white scale-105",
  unselected:
    "flex-grow rounded-none border-2 border-[#aaaaaa] bg-white text-[#0a0a0a] border-l-0",
  startIcon: "rounded-l-md border-l-2",
  endIcon: "rounded-r-md ",
};

export default function ButtonList<T>({
  selectedStatus,
  setselectedStatus,
  buttonInfo,
}: ButtonListProps<T>) {
  return (
    <div className="flex flex-row">
      {buttonInfo.map((item, idx) => (
        <Button
          key={item.content}
          onClick={() => {
            setselectedStatus(item.type);
          }}
          content={item.content}
          className={`${
            item.type === selectedStatus
              ? buttontTailwindConfig.selected
              : buttontTailwindConfig.unselected
          } ${idx === 0 ? buttontTailwindConfig.startIcon : ""} ${idx === buttonInfo.length - 1 ? buttontTailwindConfig.endIcon : ""}`}
          icon={item.icon}
          iconComponent={item.iconComponent?.({
            fill: item.type === selectedStatus ? "white" : "black",
          })}
        />
      ))}
    </div>
  );
}
