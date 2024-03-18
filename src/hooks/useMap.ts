import { useEffect, useState } from "react";

interface mapResult {
  map: any;
  clusterer: any;
}

export default function useMap(ref: React.RefObject<HTMLDivElement>) {
  const [mapProps, setMapProps] = useState<mapResult>({
    map: null,
    clusterer: null,
  });

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

          setMapProps({ map, clusterer });
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

  return mapProps;
}
