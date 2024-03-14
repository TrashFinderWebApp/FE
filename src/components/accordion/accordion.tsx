import useAnimation from "@/hooks/useAnimation";
import Image from "next/image";
import LeftArrowSvg from "public/svg/LeftArrow.svg";
import ScrollToTopSvg from "public/svg/ScrollToTop.svg";
import { useEffect, useRef, useState } from "react";

export default function Accordion({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { render, animation, handleAnimationEnd } = useAnimation(isOpen);
  const [scrollToTop, setScrollToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const { clientHeight, scrollTop } = target;
      if (scrollTop > clientHeight) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };

    scrollRef.current?.addEventListener("scroll", scrollHandler);
    return () => {
      scrollRef.current?.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div
      className={
        animation
          ? "relative flex flex-row items-center h-screen duration-300"
          : "relative flex flex-row items-center h-screen duration-300 -translate-x-80"
      }
      onTransitionEnd={handleAnimationEnd}
    >
      <section
        ref={scrollRef}
        className="relative w-80 px-3 h-screen bg-white border-2 border-dark-blue shadow-lg drop-shadow-lg overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#AAAAAA] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#D9D9D9]"
      >
        {children}
      </section>
      {scrollToTop && render && (
        <button
          type="button"
          className="absolute z-50 bottom-3 right-[3.125rem]"
          onClick={() => {
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image src={ScrollToTopSvg} alt="위로 올라가기" />
        </button>
      )}
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
