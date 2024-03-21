import { Coordinate, Transportation } from "@/types/navigate";
import { useQuery } from "@tanstack/react-query";

/* eslint-disable import/prefer-default-export */
const QUERY_KEY = {
  navigation: "navigation",
};

const url = {
  walk: "https://apis.openapi.sk.com/tmap/routes/pedestrian",
  car: "https://apis-navi.kakaomobility.com/v1/directions",
  public: "https://apis.openapi.sk.com/transit/routes",
};

const getFetchInfo = (type: Transportation, payload: Coordinate) => {
  switch (type) {
    case "walk":
      return [
        url.walk,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY || "",
          },
          body: JSON.stringify({
            ...payload,
            startName: "출발지",
            endName: "도착지",
            format: "json",
            count: 10,
          }),
        },
      ];
    case "car":
      return [
        `${url.car}?${new URLSearchParams({
          origin: `${payload.startX},${payload.startY}`,
          destination: `${payload.endX},${payload.endY}`,
        }).toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      ];
    default:
      return ["", {}];
  }
};

export const useNavigation = (type: Transportation, payload: Coordinate) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.navigation, payload, type],
    queryFn: async () =>
      fetch(...(getFetchInfo(type, payload) as [string, {}])).then((res) =>
        res.json(),
      ),
  });

  return {
    navigate: data,
    isLoading,
    isError,
  };
};