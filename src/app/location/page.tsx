"use client";

import { useEffect, useRef } from "react";

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

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
        });

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: mapRef.current,
          averageCenter: true,
          minLevel: 7,
        });

        clusterer.addMarkers([]);
      });
    }
  }, []);

  return <div ref={mapRef} className="w-screen h-screen" />;
}
