"use client";

import { useEffect, useRef } from "react";

export default function AdminPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;

    document.head.appendChild(script);

    const kakaoMapAction = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const pos = new window.kakao.maps.LatLng(latitude, longitude);
          map.setCenter(pos);
        });
      });
    };
    script.addEventListener("load", kakaoMapAction);
  }, []);
  return <div ref={mapRef} className="w-screen h-screen" />;
}
