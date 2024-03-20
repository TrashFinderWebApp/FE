import { Coordinate, Transportation } from "@/types/navigate";
import { useQuery } from "@tanstack/react-query";

/* eslint-disable import/prefer-default-export */
const QUERY_KEY = {
  navigation: "navigation",
};

const url = {
  pedestrian: "https://apis.openapi.sk.com/tmap/routes/pedestrian",
  car: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
  public: "https://apis.openapi.sk.com/transit/routes",
};

export const useNavigation = (type: Transportation, payload: Coordinate) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.navigation, payload, type],
    queryFn: async () =>
      fetch(url[type], {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY || "",
        },
        body: JSON.stringify({
          ...payload,
          startName: "출발지",
          endName: "도착지",
          format: "json",
        }),
      }).then((res) => res.json()),
  });

  return {
    navigate: data,
    isLoading,
    isError,
  };
};
