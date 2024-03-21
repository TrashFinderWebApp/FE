import ButtonList from "@/components/button/buttonlist";
import BusIconSVG from "@/components/svg/BusIconSvg";
import CarIconSVG from "@/components/svg/CarIconSVG";
import NavigationIconSVG from "@/components/svg/NavigationIconSVG";
import WalkerIconSVG from "@/components/svg/WalkerIconSVG";
import { ButtonProps } from "@/types/button";
import { Transportation } from "@/types/navigate";
import { useState } from "react";

const trasnportInfo: ButtonProps<Transportation>[] = [
  {
    content: "대중교통",
    type: "public",
    iconComponent: BusIconSVG,
  },
  {
    content: "자동차",
    type: "car",
    iconComponent: CarIconSVG,
  },
  {
    content: "도보",
    type: "walk",
    iconComponent: WalkerIconSVG,
  },
];

export default function Navigation() {
  const [selectedTransport, setSelectedTransport] =
    useState<Transportation>("car");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.25rem] font-extrabold flex items-center gap-2 ">
        <div className=" bg-light-green p-[2px] rounded-md">
          <NavigationIconSVG fill="white" />
        </div>
        <p>길찾기</p>
      </h2>
      <div className="w-full border " />
      <ButtonList
        selectedStatus={selectedTransport}
        setselectedStatus={setSelectedTransport}
        buttonInfo={trasnportInfo}
      />
      <form className="flex flex-col gap-0">
        <input className="bg-red border-2 rounded-t-md border-s outline-none" />
        <input className="bg-red border-2 rounded-b-md outline-none" />
      </form>
    </div>
  );
}
