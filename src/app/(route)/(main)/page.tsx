"use client";

import useMap from "@/hooks/useMap";
import { useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import { TrashCan } from "@/types/TrashInfo";
import RegisterTrashCan from "./_components/registertrashcan/registertrashcan";

export default function MainPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedMarker, setSelectedMarker] = useState<TrashCan | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useMap(mapRef);

  return (
    <>
      <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
        <section className="my-5">
          <RegisterTrashCan />
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
