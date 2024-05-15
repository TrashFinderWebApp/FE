import { TrashCanInfo, TrashCanStatus } from "@/types/trashinfo";
import { getSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { APIURL } from "../const";

export default function createCustomOverlay(
  trashcanInfo: TrashCanInfo & Partial<{ count: number }>,
  marker: any,
  clusterer: any,
  router: AppRouterInstance,
  status?: TrashCanStatus,
) {
  const content = `<div class="bg-white text-black p-3 rounded-md flex flex-col gap-2">
    <div class="flex justify-between gap-4">
      <h2 class="font-bold text-lg text-dark-green">${trashcanInfo.addressDetail ?? "쓰레기통"}</h2>
      <button id="close">X</button>
    </div>
    ${status === "REGISTERED" || status === "SUGGESTED" ? `<p class="text-sm text-[#777777]">${trashcanInfo?.count} 회 추천됨</p>` : ""}
    <div class="flex gap-2">
      <button id="navigate" class="border p-2 rounded-md">길찾기</button>
      <button id="report" class="border p-2 rounded-md bg-red-500 text-white">신고하기</button>
      ${
        status === "REGISTERED" || status === "SUGGESTED"
          ? `<button id='post' class="border-2 p-2 rounded-md bg-dark-blue text-white">${status === "REGISTERED" ? "등록" : "제안"}하기</button>`
          : ""
      }
    </div>
    </div>`;

  const overlayPos = new window.kakao.maps.LatLng(
    trashcanInfo.latitude,
    trashcanInfo.longitude,
  );

  const CustomOverlay = new window.kakao.maps.CustomOverlay({
    position: overlayPos,
    content,
    yAnchor: 1.5,
  });

  window.kakao.maps.event.addListener(marker, "click", () => {
    clusterer.addMarker(CustomOverlay);
  });

  CustomOverlay.a
    .querySelector("#close")
    .addEventListener("click", (e: any) => {
      e.stopPropagation();
      clusterer.removeMarker(CustomOverlay);
    });

  CustomOverlay.a.querySelector("#navigate").addEventListener("click", () => {
    router.push(
      `/GetDirection/${trashcanInfo.latitude}/${trashcanInfo.longitude}`,
    );
  });
  CustomOverlay.a
    .querySelector("#report")
    .addEventListener("click", async () => {
      const session = await getSession();
      const res = await fetch(
        `${APIURL}/api/trashcans/reports/${trashcanInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({ description: "buttonReport" }),
        },
      );

      const data = await res.json();
      alert(data.message ?? data.error);
    });
  CustomOverlay.a
    .querySelector("#post")
    ?.addEventListener("click", async () => {
      const session = await getSession();
      const res = await fetch(
        `${APIURL}/api/trashcans/${status === "REGISTERED" ? "registrations" : "suggestions"}/${trashcanInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      const data = await res.json();
      alert(data.message ?? data.error);
    });

  return CustomOverlay;
}
