import { TrashCanRequest } from "@/types/TrashInfo";
import { useQuery } from "@tanstack/react-query";

export default function useGetTrashCanLocation(info: TrashCanRequest | null) {
  if (!info) return { data: null, isLoading: false, error: null };
  const { lat, lng, radius, status, id } = info;

  const result = useQuery({
    queryKey: [lat, lng, radius, status ?? "added", id ?? ""],
    queryFn: async () => {
      const res = await fetch(
        id
          ? `http://35.216.97.185:8080/api/trashcan/locations/details/${id}`
          : `http://35.216.97.185:8080/api/trashcan/locations${new URLSearchParams(
              {
                latitude: lat.toString(),
                longitude: lng.toString(),
                radius: radius.toString(),
                status: status ?? "added",
              },
            ).toString()}`,
      );
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return result;
}
