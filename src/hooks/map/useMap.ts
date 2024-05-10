/* eslint-disable no-unused-vars */
import { useKakaoStore } from "@/stores/useKakaoStore";
import { useEffect } from "react";

export interface mapResult {
  map: any;
  clusterer: any;
  keywordSearch: (
    keyword: string,
    callback: (data: any, status: any, pagination?: any) => void,
  ) => void;
}

export default function useMap(
  mapRef: React.RefObject<HTMLDivElement>,
  roadViewRef?: React.RefObject<HTMLDivElement>,
) {
  const {
    kakaoMap,
    setKakaoMap,
    setKakaoClusterer,
    setKeywordSearch,
    setGeoCoder,
    setKakakoRoadView,
    setRoadViewClient,
  } = useKakaoStore();

  useEffect(() => {
    const kakaoMapAction = () => {
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);

      map.setCopyrightPosition(
        window.kakao.maps.CopyrightPosition.BOTTOMRIGHT,
        true,
      );

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: 7,
      });

      const placeSearch = new window.kakao.maps.services.Places();
      const geocoder = new window.kakao.maps.services.Geocoder();

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const pos = new window.kakao.maps.LatLng(latitude, longitude);
        map.setCenter(pos);
        setKakaoMap(map);
        setKakaoClusterer(clusterer);
        setKeywordSearch(placeSearch.keywordSearch);
        setGeoCoder(geocoder);
      });

      if (roadViewRef) {
        const roadView = new window.kakao.maps.Roadview(roadViewRef.current);
        const roadViewClient = new window.kakao.maps.RoadviewClient();
        setKakakoRoadView(roadView);
        setRoadViewClient(roadViewClient);
      }
    };
    const onLoadKakaoMap = () => {
      if (window.kakao) {
        window.kakao.maps.load(kakaoMapAction);
      }
    };

    if (!window.kakao) {
      const script = document.createElement("script");

      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;

      document.head.appendChild(script);
      script.addEventListener("load", onLoadKakaoMap);
    } else {
      onLoadKakaoMap();
    }
  }, []);
}
