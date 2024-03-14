import useAnimation from "@/hooks/useAnimation";
import Image from "next/image";
import LeftArrowSvg from "public/svg/LeftArrow.svg";
import { useState } from "react";

export default function Accordion({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { render, animation, handleAnimationEnd } = useAnimation(isOpen);

  return (
    <div
      className={
        animation
          ? "flex flex-row items-center h-screen duration-300 translate-x-0"
          : "flex flex-row items-center h-screen duration-300 -translate-x-80"
      }
      onTransitionEnd={handleAnimationEnd}
    >
      <section className="w-80 px-3 h-screen bg-white border-2 border-dark-blue shadow-lg drop-shadow-lg overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#AAAAAA] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#D9D9D9]">
        {children}
      </section>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-[0.625rem] py-5 w-fit h-fit bg-white border-y-dark-blue border-y-2 border-r-dark-blue border-r-2 rounded-r-md shadow-lg drop-shadow-lg"
      >
        <Image
          src={LeftArrowSvg}
          alt="왼쪽으로 접기"
          className={
            render
              ? "w-[0.625rem] h-[1.125rem] duration-100"
              : "w-[0.625rem] h-[1.25rem] duration-100 rotate-180"
          }
        />
      </button>
    </div>
  );
}
