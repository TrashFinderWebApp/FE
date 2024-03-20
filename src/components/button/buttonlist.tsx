import { ButtonProps } from "@/types/button";
import Button from "./button";

interface ButtonListProps<T> {
  selectedStatus: T;
  setselectedStatus: React.Dispatch<React.SetStateAction<T>>;
  buttonInfo: ButtonProps<T>[];
}

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
