"use client";

import { createContext, useEffect, useRef, useState } from "react";

export const mapContext = createContext<any>(null);

export default function mapLayout({
  children,
}: {
  children: React.ReactNode;
  params: {
    map: any;
  };
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  useEffect(() => {
    const kakaoMapAction = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 2,
        };

        const mapObj = new window.kakao.maps.Map(mapRef.current, options);

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const pos = new window.kakao.maps.LatLng(latitude, longitude);
          mapObj.setCenter(pos);
        });

        setMap(mapObj);
      });
    };

    if (window.kakao) {
      kakaoMapAction();
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;

    document.head.appendChild(script);

    script.addEventListener("load", kakaoMapAction);
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />
      <mapContext.Provider value={{ map }}>{children}</mapContext.Provider>
    </>
  );
}
