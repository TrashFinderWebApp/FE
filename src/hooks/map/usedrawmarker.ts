import {
  TrashCanInfo,
  TrashCanRequest,
  TrashCanStatus,
} from "@/types/trashinfo";
import distanceBetweenLatLng from "@/util/distance";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createMarker from "@/util/kakaomap/createmarker";
import { useKakaoStore } from "@/stores/usekakaostore";
import useTrashCanInfoQuery from "@/hooks/query/usetrashcaninfoquery";
import createCustomOverlay from "@/util/kakaomap/createcustomoverlay";
import { useRouter } from "next/navigation";

const useDrawMarker = (
  status: TrashCanStatus,
  {
    isDrawMarker = true,
    markerIcon = "/svg/trashcanicon.svg",
  }: {
    isDrawMarker?: boolean;
    markerIcon?: string;
    clusterer?: any;
  } = {},
) => {
  const markerRef = useRef<any[]>([]);
  const overlayRef = useRef<any[]>([]);
  const [_, updateState] = useState({});
  const [needRefresh, setNeedRefresh] = useState(false);
  const reFresh = useCallback(() => updateState({}), []);
  const { kakaoClusterer, kakaoMap } = useKakaoStore();
  const router = useRouter();
  const queryInfo = useMemo(() => {
    if (!kakaoMap) return null;
    const bound = kakaoMap.getBounds();
    const center = kakaoMap.getCenter();

    const [NElat, NElng, SWlat, SWlng] = [
      bound.getNorthEast().getLat(),
      bound.getNorthEast().getLng(),
      bound.getSouthWest().getLat(),
      bound.getSouthWest().getLng(),
    ];

    const radius =
      (distanceBetweenLatLng(NElat, NElng, SWlat, SWlng) * 1000) / 2;

    const info: TrashCanRequest = {
      latitude: center.getLat(),
      longitude: center.getLng(),
      radius,
      status,
    };

    return info;
  }, [kakaoMap, status, _]);

  const { data } = useTrashCanInfoQuery(queryInfo);

  useEffect(() => {
    if (!kakaoMap || !isDrawMarker) return;

    kakaoClusterer?.removeMarkers(markerRef.current);
    kakaoClusterer?.removeMarkers(overlayRef.current);

    markerRef.current = [];
    overlayRef.current = [];

    data?.forEach((trashcan: TrashCanInfo) => {
      const marker = createMarker({
        latitude: trashcan.latitude,
        longitude: trashcan.longitude,
        status: trashcan.status,
        markerIcon:
          markerIcon ??
          (status === "ADDED"
            ? "/svg/trashcangreenicon.svg"
            : "/svg/trashcanicon.svg"),
      });

      const overlay = createCustomOverlay(
        trashcan,
        marker,
        kakaoClusterer,
        router,
        status,
      );

      markerRef.current.push(marker);
      overlayRef.current.push(overlay);
    });

    kakaoClusterer?.addMarkers(markerRef.current);
  }, [data]);

  useEffect(() => {
    if (kakaoMap && window.kakao) {
      window.kakao.maps.event.addListener(kakaoMap, "dragend", () => {
        setNeedRefresh(true);
      });

      window.kakao.maps.event.addListener(kakaoMap, "zoom_changed", () => {
        setNeedRefresh(true);
      });
    }
  }, [kakaoMap]);

  useEffect(() => {
    return () => {
      kakaoClusterer?.removeMarkers(markerRef.current);
      kakaoClusterer?.removeMarkers(overlayRef.current);
    };
  }, []);

  return { markerRef, overlayRef, data, reFresh, needRefresh, setNeedRefresh };
};

export default useDrawMarker;
