import { Transportation } from "@/types/navigate";
import { ButtonProps } from "@/types/button";
import Button from "./button";

interface ButtonListProps {
  selectedStatus: string;
  setselectedStatus: React.Dispatch<React.SetStateAction<Transportation>>;
  buttonInfo: ButtonProps[];
}

export default function ButtonList({
  selectedStatus,
  setselectedStatus,
  buttonInfo,
}: ButtonListProps) {
  return (
    <div className="flex flex-row">
      {buttonInfo.map((item, idx) => (
        <Button
          key={item.content}
          onClick={() => {
            setselectedStatus(item.type as Transportation);
          }}
          content={item.content}
          className="text-black flex-grow border-[#aaaaaa]"
          style={{
            backgroundColor: item.type === selectedStatus ? "#02C39A" : "white",
            color: item.type === selectedStatus ? "white" : "black",
            fontWeight: item.type === selectedStatus ? "bold" : "normal",
            borderColor: item.type === selectedStatus ? "#02C39A" : "#aaaaaa",
            borderRight: idx === 0 ? "none" : "",
            borderLeft: idx === buttonInfo.length - 1 ? "none" : "",
            borderTopLeftRadius:
              item.type === selectedStatus
                ? "0.375rem"
                : idx === 0
                  ? "0.375rem"
                  : "0",
            borderBottomLeftRadius:
              item.type === selectedStatus
                ? "0.375rem"
                : idx === 0
                  ? "0.375rem"
                  : "0",
            borderTopRightRadius:
              item.type === selectedStatus
                ? "0.375rem"
                : idx === buttonInfo.length - 1
                  ? "0.375rem"
                  : "0",
            borderBottomRightRadius:
              item.type === selectedStatus
                ? "0.375rem"
                : idx === buttonInfo.length - 1
                  ? "0.375rem"
                  : "0",
            zIndex: item.type === selectedStatus ? "1" : "0",

            boxShadow:
              item.type === selectedStatus ? "0 0 0 0.125rem #02C39A" : "",
          }}
          icon={item.icon}
          iconComponent={item.iconComponent?.({
            fill: item.type === selectedStatus ? "white" : "black",
          })}
        />
      ))}
    </div>
  );
}
