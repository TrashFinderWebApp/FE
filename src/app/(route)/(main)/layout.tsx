"use client";

import useMap from "@/hooks/useMap";
import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";

import { isMobile } from "react-device-detect";
import Navigator from "@/components/sidebar/Navigator";
import Header from "@/components/header/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    if (isMobile) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, [isMobile]);

  useMap(mapRef);

  return (
    <>
      {deviceType === "mobile" ? (
        <Header>
          <section className="my-5 w-full">{children}</section>
        </Header>
      ) : (
        <>
          <Navigator />
          <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
            <section className="my-5">{children}</section>
          </Accordion>
        </>
      )}
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
