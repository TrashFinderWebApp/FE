import { TrashCanRequest } from "@/types/TrashInfo";
import { APIURL } from "@/util/const";

export const queryInfo = {
  notice: {
    queryKey: ["notice"],
    queryFn: async () => {
      const res = await fetch(`${APIURL}/api/notification`);
      if (!res.ok) return [];
      const data = await res.json();
      return data;
    },
  },
  user: (searchQuery?: string) => ({
    queryKey: ["user", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/members/list${searchQuery ? `/${searchQuery}` : `?page=${pageParam}`}`,
      );
      const result = await response.json();
      return result;
    },
    getNextPageParam: (lastPage: any, allPage: any) => {
      if (lastPage.isLast) return undefined;
      return allPage.length + 1;
    },
    initialPageParam: 1,
  }),
  trashcaninfo: (info: TrashCanRequest | null) => ({
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
  }),
  mytrashcan: (accessToken?: string) => ({
    queryKey: ["myTrashcan"],
    queryFn: async () => {
      if (!accessToken) throw new Error("로그인이 필요합니다.");
      const res = await fetch(`${APIURL}/api/trashcan/member/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("쓰레기통 정보를 불러오는데 실패했습니다.");
      }
      return res.json();
    },
  }),
  myranking: (accessToken?: string) => ({
    queryKey: ["rank"],
    queryFn: async () => {
      if (!accessToken) throw new Error("로그인이 필요합니다.");
      const res = await fetch(`${APIURL}/api/rank/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("랭킹 정보를 불러오는데 실패했습니다.");
      }
      return res.json();
    },
  }),
};

export const infiniteQueryInfo = {
  ranking: {
    queryKey: ["ranking"],
    queryFn: async ({ pageParam = 1 }) => {
      if (pageParam === undefined || typeof pageParam !== "number") return [];
      const response = await fetch(
        `${APIURL}/api/rank/list?startIndex=${pageParam}&endIndex=${pageParam + 9}`,
      );
      const result = await response.json();
      return result;
    },
    getNextPageParam: (lastPage: any, allPage: any) => {
      if (lastPage?.message || lastPage?.length < 10) {
        return undefined;
      }
      return allPage.length * 10 + 1;
    },
    initialPageParam: 1,
  },
};
