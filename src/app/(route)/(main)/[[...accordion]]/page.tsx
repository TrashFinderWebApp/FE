"use client";

import useMap from "@/hooks/useMap";
import { useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import FindTrashCan from "../_components/findtrashcan/findtrashcan";
import RegisterTrashCan from "../_components/registertrashcan/registertrashcan";
import Navigation from "../_components/navigation/navigation";

const selectedAccordion = (accordion: string) => {
  switch (accordion) {
    case "findtrashcan":
      return <FindTrashCan />;
    case "registertrashcan":
      return <RegisterTrashCan />;
    case "navigation":
      return <Navigation />;
    default:
      return <FindTrashCan />;
  }
};

export default function MainPage({
  params,
}: {
  params: { accordion: string[] };
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  useMap(mapRef);
  return (
    <>
      <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
        <section className="my-5">
          {selectedAccordion(
            params.accordion ? params.accordion[0] : "findtrashcan",
          )}
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
