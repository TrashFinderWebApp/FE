"use client";

import React, { useState } from "react";
import Link from "next/link";
import HomeSVG from "../svg/HomeSVG";
import AddLocationSVG from "../svg/AddLocationSVG";
import RankingSVG from "../svg/RankingSVG";
import AnnouncementSVG from "../svg/AnnouncementSVG";
import FindLocationSVG from "../svg/FindLocationSVG";
import GetDirectionSVG from "../svg/GetDirectionSVG";
import ConfigSVG from "../svg/ConfigSVG";
import LoginSVG from "../svg/LoginSVG";

export default function Navigator() {
  const [clicked, setClicked] = useState<string>("");

  const handleOnClick = (props: string) => {
    setClicked(props);
  };

  const menuItems = [
    {
      id: "Home",
      icon: <HomeSVG color={clicked === "Home" ? "#ffffff" : "#184E77"} />,
    },
    {
      id: "FindLocation",
      icon: (
        <FindLocationSVG
          color={clicked === "FindLocation" ? "#ffffff" : "#184E77"}
        />
      ),
    },
    {
      id: "AddLocation",
      icon: (
        <AddLocationSVG
          color={clicked === "AddLocation" ? "#ffffff" : "#184E77"}
        />
      ),
    },
    {
      id: "Ranking",
      icon: (
        <RankingSVG color={clicked === "Ranking" ? "#ffffff" : "#184E77"} />
      ),
    },
    {
      id: "Announcement",
      icon: (
        <AnnouncementSVG
          color={clicked === "Announcement" ? "#ffffff" : "#184E77"}
        />
      ),
    },
    {
      id: "GetDirection",
      icon: (
        <GetDirectionSVG
          color={clicked === "GetDirection" ? "#ffffff" : "#184E77"}
        />
      ),
    },
  ];

  return (
    <header className="flex flex-col w-[4.25rem] h-lvh bg-dark-blue border-2 border-r-dark-blue z-50">
      <h1 className="aspect-[3/5] w-full">쓰파인더</h1>
      <nav className=" w-full flex flex-col justify-between flex-grow rounded-tr-lg bg-white ">
        <ul className="flex flex-col items-center  space-y-2 py-2">
          {menuItems.map((item) => (
            <li key={item.id} className="w-full">
              <button
                type="button"
                aria-label={item.id}
                className="rounded-lg w-full flex justify-center items-center aspect-square"
                style={{
                  backgroundColor: clicked === item.id ? "#02C39A" : "#FFFFFF",
                }}
                onClick={() => handleOnClick(item.id)}
              >
                {item.icon}
              </button>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col items-center  space-y-2 py-2">
          <li>
            <ConfigSVG />
          </li>
          <li>
            <Link href="/login">
              <LoginSVG />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
