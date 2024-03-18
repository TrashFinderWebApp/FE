import Image from "next/image";
import HomeSVG from "../svg/HomeSVG";
import RegisterSVG from "../svg/RegisterSVG";

export default function Navigator() {
  return (
    <header className="flex flex-col w-[4.25rem] h-lvh bg-dark-blue border-2 border-r-dark-blue z-50">
      <h1 className="aspect-[3/5] w-full">쓰파인더</h1>
      <nav className=" w-full flex flex-col flex-grow rounded-tr-lg bg-white ">
        <ul className="flex flex-col items-center space-y-6">
          <li className="mt-6">
            <HomeSVG
              width="32"
              height="46"
              color="#05668D"
              className="w-[100px]"
            />
          </li>
          <li>
            <Image src="/svg/Home.svg" alt="Home" width={32} height={46} />
          </li>
          <li>
            <RegisterSVG width="32" height="46" color="black" />
          </li>
          <li>
            <Image src="/svg/Home.svg" alt="Home" width={32} height={46} />
          </li>
          <li>
            <Image src="/svg/Home.svg" alt="Home" width={32} height={46} />
          </li>
          <li>
            <Image src="/svg/Home.svg" alt="Home" width={32} height={46} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
