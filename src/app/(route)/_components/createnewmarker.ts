import { TrashCan } from "@/types/TrashInfo";

export default function createNewMarker(
  { lat, lng, status, image, description }: TrashCan,
  setSelectedMarker: React.Dispatch<React.SetStateAction<TrashCan | null>>,
) {
  if (!window.kakao)
    return { lat, lng, status, marker: null, image, description };
  const icon =
    status === "added"
      ? "/img/TrashcanIconIMG.png"
      : "/img/TrashcanIconIMG.png";
  const markerImage = new window.kakao.maps.MarkerImage(
    icon,
    new window.kakao.maps.Size(30, 30),
    {
      offset: new window.kakao.maps.Point(15, 15),
    },
  );
  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
    image: markerImage,
  });

  window.kakao.maps.event.addListener(marker, "click", () => {
    setSelectedMarker({ lat, lng, status, image, description });
  });

  return { lat, lng, status, marker, image, description };
}
