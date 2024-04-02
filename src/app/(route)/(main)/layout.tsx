"use client";

import useMap from "@/hooks/useMap";
import { useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useMap(mapRef);
  return (
    <>
      <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
        <section className="my-5">{children}</section>
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
