import { NavigationCoordinate, Transportation } from "@/types/navigate";
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

const getFetchInfo = (type: Transportation, payload: NavigationCoordinate) => {
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
            startX: payload.start?.x,
            startY: payload.start?.y,
            endX: payload.end?.x,
            endY: payload.end?.y,
            startName: "출발지",
            endName: "도착지",
            format: "json",
            count: 10,
            speed: 4,
          }),
        },
      ];
    case "car":
      return [
        `${url.car}?${new URLSearchParams({
          origin: `${payload.start?.x},${payload.start?.y}`,
          destination: `${payload.end?.x},${payload.end?.y}`,
          alternatives: "true",
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

const NavigationCoordinateKeys = ["start", "end"] as const;

export default function useNavigation(
  type: Transportation,
  payload: NavigationCoordinate,
) {
  const isAllCoordinateExist = NavigationCoordinateKeys.every(
    (key) => payload[key]?.x && payload[key]?.y,
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.navigation, payload, type],
    queryFn: async () =>
      fetch(...(getFetchInfo(type, payload) as [string, {}])).then((res) =>
        res.json(),
      ),
    enabled: isAllCoordinateExist,
    refetchOnWindowFocus: false,
  });

  return {
    navigate: data,
    isLoading,
    isError,
    refetch,
  };
}
