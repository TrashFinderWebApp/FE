"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
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
  | "FindLocation"
  | "AddLocation"
  | "Ranking"
  | "Announcement"
  | "GetDirection";

interface MenuItemType {
  id: NavigatorBarType;
  // eslint-disable-next-line no-unused-vars
  icon: ({ color }: { color: string }) => JSX.Element;
}

const menuItems: MenuItemType[] = [
  {
    id: "",
    icon: HomeSVG,
  },
  {
    id: "FindLocation",
    icon: FindLocationSVG,
  },
  {
    id: "GetDirection",
    icon: GetDirectionSVG,
  },
  {
    id: "AddLocation",
    icon: AddLocationSVG,
  },
  {
    id: "Ranking",
    icon: RankingSVG,
  },
  {
    id: "Announcement",
    icon: AnnouncementSVG,
  },
];

export default function Navigator() {
  const pathName = usePathname();
  const [clicked, setClicked] = useState<NavigatorBarType>(
    pathName.slice(1) as NavigatorBarType,
  );
  const session = useSession();
  const handleOnClick = (props: NavigatorBarType) => {
    setClicked(props);
  };

  return (
    <header className="flex flex-col w-[4.25rem] h-lvh bg-dark-blue border-2 border-r-dark-blue z-50">
      <h1 className="aspect-[3/5] w-full flex flex-col items-center justify-center text-white text-sm font-bold">
        <img src="img/TFinderCharacter.webp" alt="" />
        <p>TFINDER</p>
      </h1>
      <nav className="w-full h-screen flex flex-col justify-between flex-grow rounded-tr-lg bg-white">
        <ul className="flex flex-col items-center space-y-2 py-2">
          {menuItems.map((item) => (
            <li key={item.id} className="w-full">
              <Link
                href={`/${item.id}`}
                className="rounded-lg w-full flex justify-center items-center aspect-square"
                style={{
                  backgroundColor: clicked === item.id ? "#02C39A" : "#FFFFFF",
                }}
                onClick={() => handleOnClick(item.id)}
              >
                {item.icon({
                  color: clicked === item.id ? "#FFFFFF" : "#184E77",
                })}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col items-center space-y-2 py-2">
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
