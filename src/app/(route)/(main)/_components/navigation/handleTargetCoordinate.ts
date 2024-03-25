import { NavigationCoordinate } from "@/types/navigate";

export default function handleTargetCoordinate(
  type: "start" | "end",
  map: any,
  setNavigateCoordinate: React.Dispatch<
    React.SetStateAction<NavigationCoordinate>
  >,
  setIsSettingMarker: React.Dispatch<React.SetStateAction<boolean>>,
) {
  // 이미 마커를 설정 중이라면 중복 설정 방지
  setIsSettingMarker(true);

  // 마커를 클릭하면 해당 위치의 좌표를 설정
  const handleClick = (mouseEvent: any) => {
    if (type === "start") {
      setNavigateCoordinate((prev) => ({
        ...prev,
        startY: mouseEvent.latLng.getLat(),
        startX: mouseEvent.latLng.getLng(),
      }));
    } else {
      setNavigateCoordinate((prev) => ({
        ...prev,
        endY: mouseEvent.latLng.getLat(),
        endX: mouseEvent.latLng.getLng(),
      }));
    }

    // 마커 설정 후에는 다른 마커 설정을 위한 이벤트 리스너 제거
    setIsSettingMarker(false);
    window.kakao.maps.event.removeListener(map, "click", handleClick);
  };

  window.kakao.maps.event.addListener(map, "click", handleClick);
}
