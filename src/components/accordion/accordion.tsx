import useAnimation from "@/hooks/animation/useanimation";
import { ScrollBarStyle } from "@/util/const";
import Image from "next/image";
import LeftArrowSvg from "public/svg/leftarrow.svg";
import ScrollToTopSvg from "public/svg/scrolltotop.svg";
import { useEffect, useRef, useState } from "react";

export default function Accordion({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
          ? "z-30 flex flex-row w-fit items-center h-svh duration-300 -translate-x-1 pointer-events-none"
          : "z-30 flex flex-row w-fit items-center h-svh duration-300 -translate-x-[24.5rem] pointer-events-none"
      }
      onTransitionEnd={handleAnimationEnd}
    >
      <section
        ref={scrollRef}
        className={`relative w-[24.5rem] px-6 py-[4rem] h-svh pointer-events-auto bg-white border-x-2 border-dark-blue shadow-lg drop-shadow-lg overflow-y-scroll ${ScrollBarStyle}`}
      >
        {children}
      </section>
      {scrollToTop && render && (
        <button
          type="button"
          className="absolute z-50 bottom-3 right-[3.125rem] pointer-events-auto"
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
        className="px-[0.625rem] py-5 w-fit h-fit bg-white border-y-dark-blue border-y-2 border-r-dark-blue border-r-2 rounded-r-md shadow-lg drop-shadow-lg pointer-events-auto"
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
