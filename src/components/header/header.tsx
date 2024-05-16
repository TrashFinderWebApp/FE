import { useKakaoStore } from "@/stores/usekakaostore";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import SearchBar from "../searchbar/searchbar";

type NavigatorBarType =
  | ""
  | "findlocation"
  | "addlocation"
  | "ranking"
  | "announcement"
  | "getdirection";

interface MenuItemType {
  href: NavigatorBarType;
  title: string;
  icon: string;
}

const navList: MenuItemType[] = [
  {
    href: "",
    title: "홈",
    icon: "/svg/home.svg",
  },
  {
    href: "findlocation",
    title: "위치 찾기",
    icon: "/svg/findlocation.svg",
  },
  {
    href: "getdirection",
    title: "길 찾기",
    icon: "/svg/getdirection.svg",
  },
  {
    href: "addlocation",
    title: "위치 추가",
    icon: "/svg/addlocation.svg",
  },
  {
    href: "ranking",
    title: "랭킹",
    icon: "/svg/ranking.svg",
  },
  {
    href: "announcement",
    title: "공지사항",
    icon: "/svg/announcement.svg",
  },
];
export default function Header({ children }: { children: React.ReactNode }) {
  const { keywordSearch, kakaoMap } = useKakaoStore();
  const [navOpened, setNavOpened] = useState(false);
  const [detailOpened, setDetailOpened] = useState(false);
  const pathName = usePathname();

  const [clicked, setClicked] = useState<NavigatorBarType>(
    pathName.slice(1) as NavigatorBarType,
  );

  const { data, status } = useSession();

  return (
    <header className="relative z-50 w-full pointer-events-none">
      <div className="relative flex flex-col p-4 bg-white gap-4 shadow-md pointer-events-auto">
        <div className="relative w-full flex items-center justify-between">
          <button
            type="button"
            className="flex flex-col justify-center"
            onClick={() => setNavOpened(true)}
          >
            <img src="/svg/menu.svg" alt="메뉴버튼" />
          </button>
          <h1 className="absolute left-[50%] -translate-x-[50%] text-[1.rem] font-extrabold">
            쓰파인더
          </h1>
          <button type="button" onClick={() => setDetailOpened(true)}>
            자세히 보기
          </button>
        </div>
        <SearchBar
          placeholder="장소 검색"
          keywordSearchMethod={keywordSearch}
          className="w-full border-2 border-light-green rounded-md"
          logo="/svg/searchicon.svg"
          onClick={(location) => {
            kakaoMap?.panTo(
              new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude,
              ),
            );
          }}
        />
      </div>
      <div
        className="absolute w-screen top-0 left-0 h-full bg-black bg-opacity-20 duration-300"
        style={{
          backgroundColor: navOpened
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(0, 0, 0, 0)",
          pointerEvents: navOpened ? "auto" : "none",
        }}
      >
        <nav
          className="bg-white h-full w-[50%] duration-300"
          style={{
            transform: `translateX(${navOpened ? "0" : "-100%"})`,
          }}
        >
          <div className="flex flex-col items-start p-4 gap-4 justify-between">
            <div className="w-full flex items-center gap-4">
              <img
                src={data?.user?.image ?? "/svg/defaulticon.svg"}
                className="w-[2rem] object-cover rounded-full aspect-square"
                alt="사용자 프로필"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{data?.user?.name ?? ""}</p>
                <p className="text-sm text-[#777777]">
                  {data?.user?.email ?? ""}
                </p>
              </div>
              <div className="flex-grow" />
              <button
                type="button"
                className="font-semilight text-[1.5rem]"
                onClick={() => setNavOpened(false)}
              >
                X
              </button>
            </div>
            <div className="border-b-2 w-full" />
            <div className="w-[calc(100%+2rem)] relative right-4 flex flex-col">
              {navList.map((nav) => (
                <Link
                  href={`/${nav.href}`}
                  key={nav.title}
                  onClick={() => {
                    setNavOpened(false);
                    setDetailOpened(true);
                    setClicked(nav.href);
                  }}
                  className={
                    clicked === nav.href
                      ? "w-full text-dark-green bg-black bg-opacity-10 p-3 font-semibold"
                      : "p-3 font-semibold"
                  }
                >
                  {nav.title}
                </Link>
              ))}

              {status === "authenticated" ? (
                <Link
                  href="/"
                  onClick={() => signOut()}
                  className="p-3 font-semibold"
                >
                  로그아웃
                </Link>
              ) : (
                <Link href="/login" className="p-3 font-semibold">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div
        className="absolute min-h-full overflow-y-scroll bg-white top-0 right-0 flex flex-col items-end duration-300"
        style={{
          width: detailOpened ? "100%" : "0px",
          padding: detailOpened ? "2rem" : "0px",
          pointerEvents: detailOpened ? "auto" : "none",
        }}
      >
        <div
          className={
            detailOpened
              ? "opacity-100 pointer-events-auto w-full"
              : "opacity-0 pointer-events-none"
          }
        >
          <button
            type="button"
            className="font-semilight text-[1.5rem]"
            onClick={() => setDetailOpened(false)}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </header>
  );
}
