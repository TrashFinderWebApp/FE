/* eslint-disable no-unused-vars */
import { useKakaoStore } from "@/stores/useKakaoStore";
import { useEffect, useState } from "react";

export interface mapResult {
  map: any;
  clusterer: any;
  keywordSearch: (
    keyword: string,
    callback: (data: any, status: any, pagination?: any) => void,
  ) => void;
}

export default function useMap(ref: React.RefObject<HTMLDivElement>) {
  const { setKakaoMap, setKakaoClusterer, setKeywordSearch } = useKakaoStore();
  useEffect(() => {
    const onLoadKakaoMap = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(37.4, 126.8),
            level: 3,
          };

          const map = new window.kakao.maps.Map(ref.current, options);

          map.setCopyrightPosition(
            window.kakao.maps.CopyrightPosition.BOTTOMRIGHT,
            true,
          );

          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
          });

          const clusterer = new window.kakao.maps.MarkerClusterer({
            map,
            averageCenter: true,
            minLevel: 7,
          });

          const placeSearch = new window.kakao.maps.services.Places();

          setKakaoMap(map);
          setKakaoClusterer(clusterer);
          setKeywordSearch(placeSearch.keywordSearch);
        });
      }
    };

    if (!window.kakao) {
      const script = document.createElement("script");

      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;

      document.head.appendChild(script);
      script.addEventListener("load", onLoadKakaoMap);
    }
  }, []);
}
