"use client";

import Accordion from "@/components/accordion/accordion";
import { useEffect, useRef } from "react";

const randomLatLng = () =>
  // 서울의 위도 경도 범위
  Array(1000)
    .fill(0)
    .map(() => {
      const lat = Math.random() * (37.7 - 37.4) + 37.4;
      const lng = Math.random() * (127.2 - 126.8) + 126.8;
      return new window.kakao.maps.LatLng(lat, lng);
    });

export default function LocationPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.4, 126.8),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        map.setCopyrightPosition(
          window.kakao.maps.CopyrightPosition.BOTTOMRIGHT,
          true,
        );

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: mapRef.current,
          averageCenter: true,
          minLevel: 7,
        });

        const positions = randomLatLng().map(
          (position) =>
            new window.kakao.maps.Marker({
              position,
            }),
        );

        clusterer.addMarkers(positions);
      });
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="fixed z-0"
        style={{ width: "100%", height: "100vh" }}
      />
      <Accordion>
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
    </div>
  );
}
