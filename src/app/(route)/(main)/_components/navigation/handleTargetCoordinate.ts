/* eslint-disable no-unused-vars */
import { NavigationCoordinate } from "@/types/navigate";
import { NavigateActionType, NavigationAction } from "./navigationReducer";

export default function handleTargetCoordinate(
  map: any,
  dispatch: (value: NavigationAction) => void,
  type: Extract<NavigateActionType, "SET_DEPARTURE" | "SET_ARRIVAL">,
) {
  // 이미 마커를 설정 중이라면 중복 설정 방지
  dispatch({ type: "SET", payload: { isSettingMarker: true } });

  // 마커를 클릭하면 해당 위치의 좌표를 설정
  const handleClick = (mouseEvent: any) => {
    dispatch({
      type,
      payload: {
        [type === "SET_DEPARTURE" ? "startX" : "endX"]:
          mouseEvent.latLng.getLng(),
        [type === "SET_DEPARTURE" ? "startY" : "endY"]:
          mouseEvent.latLng.getLat(),
      },
    });

    // 마커 설정 후에는 다른 마커 설정을 위한 이벤트 리스너 제거
    dispatch({ type: "SET", payload: { isSettingMarker: false } });
    window.kakao.maps.event.removeListener(map, "click", handleClick);
  };

  window.kakao.maps.event.addListener(map, "click", handleClick);
}
