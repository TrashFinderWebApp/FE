import { TrashCanInfo } from "@/types/trashinfo";

export default function createMarker(
  {
    latitude,
    longitude,
    status,
    markerIcon,
    size = 30,
  }: Partial<
    Pick<TrashCanInfo, "latitude" | "longitude" | "status" | "trashcanId">
  > & {
    markerIcon?: string;
    size?: number;
  },
  // eslint-disable-next-line no-unused-vars
  callback?: (marker: any) => void,
) {
  if (!window.kakao) return null;
  const icon =
    markerIcon ??
    (status === "ADDED"
      ? "/svg/trashcanicongreen.svg"
      : "/svg/trashcanicon.svg");

  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(latitude, longitude),
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

  callback?.(marker);
  return marker;
}
