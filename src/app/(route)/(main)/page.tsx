"use client";

import useMap from "@/hooks/useMap";
import { useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import SearchBar from "../../../components/searchbar/searchbar";
import Navigation from "./_components/navigation/navigation";

export default function MainPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useMap(mapRef);

  return (
    <>
      <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
        <SearchBar placeholder="장소, 도로, 건물 검색" />
        <section className="my-5">
          <Navigation />
        </section>
      </Accordion>
      <div
        ref={mapRef}
        className={
          isAccordionOpen
            ? "absolute z-0 top-0 h-screen duration-300 w-[calc(100%-20rem)] translate-x-[19.875rem] box-content"
            : "absolute z-0 top-0 h-screen duration-300 w-full box-content"
        }
      />
    </>
  );
}
