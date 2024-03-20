/* eslint-disable no-unused-vars */

"use client";

import useMap from "@/hooks/useMap";
import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import { TrashCan } from "@/types/TrashInfo";
import SearchBar from "../../../components/searchbar/searchbar";
import createNewMarker from "./_components/createnewmarker";
import FindTrashCan from "./_components/findtrashcan/findtrashcan";
import Navigation from "./_components/navigation/navigation";

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
  // eslint-disable-next-line no-unused-vars
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
          imageList: ["/img/TEST.jpg"],
        },
        setSelectedMarker,
      ),
    );

    info.clusterer?.addMarkers(positions.map((position) => position.marker));
  }, [info]);

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
