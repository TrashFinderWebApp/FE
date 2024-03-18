"use client";

import useMap from "@/hooks/useMap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import { TrashCan } from "@/types/TrashInfo";
import createNewMarker from "./_components/createnewmarker";

const randomLatLng = () =>
  // 서울의 위도 경도 범위
  Array(100)
    .fill(0)
    .map(() => {
      const lat = Math.random() * (37.7 - 37.4) + 37.4;
      const lng = Math.random() * (127.2 - 126.8) + 126.8;
      return { lat, lng };
    });

export default function MainPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<TrashCan | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const info = useMap(mapRef);

  useEffect(() => {
    if (!info.map || !info.clusterer) return;
    const positions = randomLatLng().map((position) =>
      createNewMarker(
        {
          lat: position.lat,
          lng: position.lng,
          status: "added",
          image: "/img/TEST.jpg",
        },
        setSelectedMarker,
      ),
    );

    info.clusterer?.addMarkers(positions.map((position) => position.marker));
  }, [info]);

  return (
    <>
      <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
        {Array(30)
          .fill(0)
          .map((_, idx) => idx + 1)
          .map((idx) => (
            <div
              key={`${idx}`}
              className="h-20 bg-white border-2 border-dark-blue p-4"
            >
              {idx}
            </div>
          ))}
      </Accordion>
      <Image
        className="absolute left-0 top-0 z-50"
        width={500}
        height={300}
        src={selectedMarker?.image ?? ""}
        alt=""
      />
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
