import { TrashCanInfo, TrashCanRequest } from "@/types/TrashInfo";
import { APIURL } from "@/util/const";
import { useQuery } from "@tanstack/react-query";

export default function useTrashCanInfoQuery(info: TrashCanRequest | null) {
  return useQuery<TrashCanInfo[]>({
    queryKey: [
      info?.latitude ?? 0,
      info?.longitude ?? 0,
      info?.radius ?? 0,
      info?.status ?? "added",
      info?.id ?? "",
    ],
    queryFn: async () => {
      if (!info) return [];
      const { latitude: lat, longitude: lng, radius, status, id } = info;

      const reqURL = id
        ? `${APIURL}/api/trashcan/locations/details/${id}`
        : `${APIURL}/api/trashcan/locations?${new URLSearchParams({
            latitude: lat.toString(),
            longitude: lng.toString(),
            radius: radius.toString(),
            status: status ?? "added",
          }).toString()}`;

      const res = await fetch(reqURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data;
    },
  });
}
