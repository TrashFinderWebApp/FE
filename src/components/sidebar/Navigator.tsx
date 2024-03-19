"use client";

import React, { useState } from "react";
import HomeSVG from "../svg/HomeSVG";
import AddLocationSVG from "../svg/AddLocationSVG";
import RankingSVG from "../svg/RankingSVG";
import AnnouncementSVG from "../svg/AnnouncementSVG";
import FindLocationSVG from "../svg/FindLocationSVG";
import GetDirectionSVG from "../svg/GetDirectionSVG";
import ConfigSVG from "../svg/ConfigSVG";
import LoginSVG from "../svg/LoginSVG";

export default function Navigator() {
  const [iconColors, setIconColors] = useState({
    Home: { color: "#184E77", background: "#FFFFFF" },
    FindLocation: { color: "#184E77", background: "#FFFFFF" },
    GetDirection: { color: "#184E77", background: "#FFFFFF" },
    AddLocation: { color: "#184E77", background: "#FFFFFF" },
    Ranking: { color: "#184E77", background: "#FFFFFF" },
    Announcement: { color: "#184E77", background: "#FFFFFF" },
  });

  interface IconColorsProps {
    iconName: string;
    newColor: string;
    newBackground: string;
  }

  const handleIconClick = ({
    iconName,
    newColor,
    newBackground,
  }: IconColorsProps) => {
    setIconColors({
      ...iconColors,
      [iconName]: { color: newColor, background: newBackground },
    });
  };

  return (
    <header className="flex flex-col w-[4.25rem] h-lvh bg-dark-blue border-2 border-r-dark-blue z-50">
      <h1 className="aspect-[3/5] w-full">쓰파인더</h1>
      <nav className=" w-full flex flex-col justify-between flex-grow rounded-tr-lg bg-white ">
        <ul className="flex flex-col items-center  space-y-2 py-2">
          <li>
            <button
              type="button"
              aria-label="Home"
              id="Home"
              className=" rounded-lg"
              style={{ backgroundColor: iconColors.Home.background }}
              onClick={() =>
                handleIconClick({
                  iconName: "Home",
                  newColor: "#ffffff",
                  newBackground: "#02C39A",
                })
              }
            >
              <HomeSVG color={iconColors.Home.color} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="FindLocation"
              id="FindLocation"
              className="  rounded-lg"
              style={{ backgroundColor: iconColors.FindLocation.background }}
              onClick={() =>
                handleIconClick({
                  iconName: "FindLocation",
                  newColor: "#ffffff",
                  newBackground: "#02C39A",
                })
              }
            >
              <FindLocationSVG color={iconColors.FindLocation.color} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="GetDirection"
              id="GetDirection"
              className="  rounded-lg"
              style={{ backgroundColor: iconColors.GetDirection.background }}
              onClick={() =>
                handleIconClick({
                  iconName: "GetDirection",
                  newColor: "#ffffff",
                  newBackground: "#02C39A",
                })
              }
            >
              <GetDirectionSVG color={iconColors.GetDirection.color} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="AddLocation"
              id="AddLocation"
              className="  rounded-lg"
              style={{ backgroundColor: iconColors.AddLocation.background }}
              onClick={() =>
                handleIconClick({
                  iconName: "AddLocation",
                  newColor: "#ffffff",
                  newBackground: "#02C39A",
                })
              }
            >
              <AddLocationSVG color={iconColors.AddLocation.color} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Ranking"
              id="Ranking"
              className=" rounded-lg"
              style={{ backgroundColor: iconColors.Ranking.background }}
              onClick={() =>
                handleIconClick({
                  iconName: "Ranking",
                  newColor: "#ffffff",
                  newBackground: "#02C39A",
                })
              }
            >
              <RankingSVG color={iconColors.Ranking.color} />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Announcement"
              id="Announcement"
              className=" rounded-lg"
              style={{ backgroundColor: iconColors.Announcement.background }}
              onClick={() =>
                handleIconClick({
                  iconName: "Announcement",
                  newColor: "#ffffff",
                  newBackground: "#02C39A",
                })
              }
            >
              <AnnouncementSVG color={iconColors.Announcement.color} />
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <ConfigSVG />
          </li>
          <li>
            <LoginSVG />
          </li>
        </ul>
      </nav>
    </header>
  );
}
