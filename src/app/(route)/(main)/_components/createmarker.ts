import { TrashCanInfo } from "@/types/TrashInfo";

export default function createMarker(
  {
    lat,
    lng,
    status,
    markerIcon,
    size = 30,
  }: Partial<Pick<TrashCanInfo, "lat" | "lng" | "status">> & {
    markerIcon?: string;
    size?: number;
  },
  callback?: () => void,
) {
  if (!window.kakao) return null;
  const icon =
    markerIcon ??
    (status === "added"
      ? "/img/TrashcanIconIMG.png"
      : "/img/TrashcanIconIMG.png");

  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
  });

  if (markerIcon) {
    const markerImage = new window.kakao.maps.MarkerImage(
      icon,
      new window.kakao.maps.Size(size, size),
      {
        offset: new window.kakao.maps.Point(15, 15),
      },
    );

    marker.setImage(markerImage);
  }

  callback?.();
  return marker;
}
