import HomeSVG from "../svg/HomeSVG";
import AddLocationSVG from "../svg/AddLocationSVG";
import RankingSVG from "../svg/RankingSVG";
import AnnouncementSVG from "../svg/AnnouncementSVG";
import FindLocationSVG from "../svg/FindLocationSVG";
import GetDirectionSVG from "../svg/GetDirectionSVG";
import ConfigSVG from "../svg/ConfigSVG";
import LoginSVG from "../svg/LoginSVG";

export default function Navigator() {
  return (
    <header className="flex flex-col w-[4.25rem] h-lvh bg-dark-blue border-2 border-r-dark-blue z-50">
      <h1 className="aspect-[3/5] w-full">쓰파인더</h1>
      <nav className=" w-full flex justify-center flex-grow rounded-tr-lg bg-white ">
        <ul className="flex flex-col items-center space-y-2 py-2">
          <li
            id="Home"
            className="hover:bg-[#02C39A] px-[1rem] py-[0.5rem] rounded-lg"
          >
            <HomeSVG />
          </li>
          <li
            id="FindLocation"
            className="hover:bg-[#02C39A] px-[1rem] py-[0.5rem] rounded-lg"
          >
            <FindLocationSVG />
          </li>
          <li
            id="GetDirection"
            className="hover:bg-[#02C39A] px-[1rem] py-[0.5rem] rounded-lg"
          >
            <GetDirectionSVG />
          </li>
          <li
            id="AddLocationSVG"
            className="hover:bg-[#02C39A] px-[1rem] py-[0.5rem] rounded-lg"
          >
            <AddLocationSVG />
          </li>
          <li
            id="RankingSVG"
            className="hover:bg-[#02C39A] px-[1rem] py-[0.5rem] rounded-lg"
          >
            <RankingSVG />
          </li>
          <li
            id="AnnouncementSVG"
            className="hover:bg-[#02C39A] px-[1rem] py-[0.5rem] rounded-lg"
          >
            <AnnouncementSVG />
          </li>
        </ul>
        <ul className="absolute bottom-2 space-y-2">
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
