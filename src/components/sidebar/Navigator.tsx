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

  return (
    <header className="flex flex-col w-[4.25rem] h-lvh bg-dark-blue border-2 border-r-dark-blue z-50">
      <h1 className="aspect-[3/5] w-full">쓰파인더</h1>
      <nav className=" w-full flex flex-col justify-between flex-grow rounded-tr-lg bg-white ">
        <ul className="flex flex-col items-center  space-y-2 py-2">
          <li className="w-full">
            <button
              type="button"
              aria-label="Home"
              id="Home"
              className="rounded-lg w-full flex justify-center items-center aspect-square"
              style={{
                backgroundColor: clicked === "Home" ? "#02C39A" : "#FFFFFF",
              }}
              onClick={() => handleOnClick("Home")}
            >
              <HomeSVG color={clicked === "Home" ? "#FFFFFF" : "#184E77"} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="FindLocation"
              id="FindLocation"
              className="  rounded-lg"
              style={{
                backgroundColor:
                  clicked === "FindLocation" ? "#02C39A" : "#FFFFFF",
              }}
              onClick={() => handleOnClick("FindLocation")}
            >
              <FindLocationSVG
                color={clicked === "FindLocation" ? "#FFFFFF" : "#184E77"}
              />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="GetDirection"
              id="GetDirection"
              className="  rounded-lg"
              style={{
                backgroundColor:
                  clicked === "GetDirection" ? "#02C39A" : "#FFFFFF",
              }}
              onClick={() => handleOnClick("GetDirection")}
            >
              <GetDirectionSVG
                color={clicked === "GetDirection" ? "#FFFFFF" : "#184E77"}
              />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="AddLocation"
              id="AddLocation"
              className="  rounded-lg"
              style={{
                backgroundColor:
                  clicked === "AddLocation" ? "#02C39A" : "#FFFFFF",
              }}
              onClick={() => handleOnClick("AddLocation")}
            >
              <AddLocationSVG
                color={clicked === "AddLocation" ? "#FFFFFF" : "#184E77"}
              />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Ranking"
              id="Ranking"
              className=" rounded-lg"
              style={{
                backgroundColor: clicked === "Ranking" ? "#02C39A" : "#FFFFFF",
              }}
              onClick={() => handleOnClick("Ranking")}
            >
              <RankingSVG
                color={clicked === "Ranking" ? "#FFFFFF" : "#184E77"}
              />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Announcement"
              id="Announcement"
              className=" rounded-lg"
              style={{
                backgroundColor:
                  clicked === "Announcement" ? "#02C39A" : "#FFFFFF",
              }}
              onClick={() => handleOnClick("Announcement")}
            >
              <AnnouncementSVG
                color={clicked === "Announcement" ? "#FFFFFF" : "#184E77"}
              />
            </button>
          </li>
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
