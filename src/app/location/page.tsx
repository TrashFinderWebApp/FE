"use client";

import Link from "next/link";
import { useEffect, useRef, useReducer } from "react";

const randomLatLng = () =>
  // 서울의 위도 경도 범위
  Array(1000)
    .fill(0)
    .map(() => {
      const lat = Math.random() * (37.7 - 37.4) + 37.4;
      const lng = Math.random() * (127.2 - 126.8) + 126.8;
      return new window.kakao.maps.LatLng(lat, lng);
    });

function LocationPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.4, 126.8),
          level: 3,
        };

        mapRef.current = new window.kakao.maps.Map(mapRef.current, options);

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
    <div className="flex flex-col">
      <div ref={mapRef} style={{ width: "100%", height: "90vh" }} />
      <Link href="/login">로그인</Link>
    </div>
  );
}

export default LocationPage;
