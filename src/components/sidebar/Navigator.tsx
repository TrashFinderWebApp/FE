"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import HomeSVG from "../svg/HomeSVG";
import AddLocationSVG from "../svg/AddLocationSVG";
import RankingSVG from "../svg/RankingSVG";
import AnnouncementSVG from "../svg/AnnouncementSVG";
import FindLocationSVG from "../svg/FindLocationSVG";
import GetDirectionSVG from "../svg/GetDirectionSVG";
import ConfigSVG from "../svg/ConfigSVG";
import LogoutSVG from "../svg/LogoutSVG";
import LoginSVG from "../svg/LoginSVG";

type NavigatorBarType =
  | ""
  | "Home"
  | "FindLocation"
  | "AddLocation"
  | "Ranking"
  | "Announcement"
  | "GetDirection";

export default function Navigator() {
  const [clicked, setClicked] = useState<NavigatorBarType>("");

  const session = useSession();

  const handleOnClick = (props: NavigatorBarType) => {
    setClicked(props);
  };

  interface MenuItemType {
    id: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItemType[] = [
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
      <nav className=" w-full h-screen flex flex-col justify-between flex-grow rounded-tr-lg bg-white ">
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
                onClick={() => handleOnClick(item.id as NavigatorBarType)}
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
            {session.status === "authenticated" ? (
              <Link href="/">
                <button
                  type="button"
                  aria-label="로그아웃"
                  onClick={() => signOut()}
                >
                  <LogoutSVG />
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <LoginSVG />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
