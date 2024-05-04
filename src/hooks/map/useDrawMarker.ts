import { TrashCanRequest, TrashCanStatus } from "@/types/TrashInfo";
import distanceBetweenLatLng from "@/util/distance";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createMarker from "@/util/createmarker";
import { useKakaoStore } from "@/stores/useKakaoStore";
import useTrashCanInfoQuery from "../query/useTrashcanInfo";

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
  const [_, updateState] = useState({});
  const [needRefresh, setNeedRefresh] = useState(false);
  const reFresh = useCallback(() => updateState({}), []);
  const { kakaoClusterer, kakaoMap } = useKakaoStore();

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

    kakaoClusterer?.clear();
    markerRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markerRef.current = [];
    data?.forEach((trashcan) => {
      const marker = createMarker({
        latitude: trashcan.latitude,
        longitude: trashcan.longitude,
        status: trashcan.status,
        markerIcon:
          markerIcon ??
          (status === "added"
            ? "/svg/trashcangreenicon.svg"
            : "/svg/trashcanicon.svg"),
      });

      markerRef.current.push(marker);
      marker.setMap(kakaoMap);
      kakaoClusterer?.addMarker(marker);
    });
  }, [data, kakaoMap]);

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
      markerRef.current.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, []);

  return { markerRef, data, reFresh, needRefresh, setNeedRefresh };
};

export default useDrawMarker;
