/* eslint-disable no-unused-vars */
import { TrashCanInfo, TrashCanStatus } from "@/types/trashinfo";
import { APIURL } from "@/util/const";
import { create } from "zustand";

interface TrashCanStore {
  trashCanList: TrashCanInfo[];
}

interface TrashCanActions {
  setTrashCanList: (trashCanList: TrashCanInfo[]) => void;
  getTrashCanList: (
    lat: number,
    lng: number,
    radius: number,
    status: TrashCanStatus,
  ) => Promise<void>;
  keywordSearch: (
    keyword: string,
    callback: (data: any, status: any) => void,
  ) => void;
}

const getTrashCanURL = (
  latitude: number,
  longitude: number,
  radius: number,
  status: TrashCanStatus,
) =>
  `${APIURL}/api/trashcans/locations?${new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString(),
    status,
  })}`;

export const useTrashCanStore = create<TrashCanStore & TrashCanActions>(
  (set, get) => ({
    trashCanList: [],
    setTrashCanList: (trashCanList) => set({ trashCanList }),
    getTrashCanList: async (
      lat: number,
      lng: number,
      radius: number,
      status: TrashCanStatus,
    ) => {
      const res = await fetch(getTrashCanURL(lat, lng, radius, status), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();

      set({ trashCanList: data });
    },
    keywordSearch: (keyword, callback) => {
      const searched = keyword.length
        ? get().trashCanList.filter((trashCan) => {
            return (
              trashCan.addressDetail?.includes(keyword) ||
              trashCan.address?.includes(keyword)
            );
          })
        : get().trashCanList;
      callback(
        searched.map((item) => ({
          address_name: item.address,
          x: item.longitude,
          y: item.latitude,
          place_name: item.addressDetail,
        })),
        "OK",
      );
    },
  }),
);
