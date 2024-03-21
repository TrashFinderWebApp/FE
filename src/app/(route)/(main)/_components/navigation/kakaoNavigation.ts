/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import { NavigationResponse, RouteSection } from "@/types/navigate";

const colorByTrafficState = [
  "#1E7EFA",
  "#E60023",
  "#FF4545",
  "#02C39A",
  "#1E7EFA",
  "#E60023",
];

export const drawKakaoNavigation = (section: RouteSection, map: any) => {
  const points = section.roads.map((road) => {
    const zipped: number[][] = [[]];

    road.vertexes.forEach((vertex) => {
      if (zipped[zipped.length - 1].length === 2) {
        zipped.push([]);
      }
      zipped[zipped.length - 1].push(vertex);
    });

    return {
      point: zipped.map((vertex) => {
        const [x, y] = vertex;
        return new window.kakao.maps.LatLng(y, x);
      }),
      distance: road.distance,
      duration: road.duration,
      traffic_state: road.traffic_state,
    };
  });

  const lines = points.map((point) => {
    const polyline = new window.kakao.maps.Polyline({
      path: point.point,
      strokeWeight: 5,
      strokeColor: colorByTrafficState[point.traffic_state],
      strokeOpacity: 1,
      strokeStyle: "solid",
    });

    polyline.setMap(map);

    return polyline;
  });

  const guidepoints = section.guides.map((guide) => {
    const circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(guide.y, guide.x),
      radius: 3,
      strokeWeight: 1,
      strokeColor: "black",
      strokeOpacity: 1,
      fillColor: "white",
      fillOpacity: 1,
    });

    circle.setMap(map);

    return circle;
  });

  // 기존의 선과 점을 지도에서 제거
  return () => {
    lines.forEach((line) => {
      line.setMap(null);
    });
    guidepoints.forEach((guidepoint) => {
      guidepoint.setMap(null);
    });
  };
};

export const KakaoNavigation = (
  navigate: NavigationResponse,
  map: any,
  sections: RouteSection[],
  selectedRoute: number | null = null,
) => {
  const { trans_id, routes } = navigate;
  if (!navigate || !trans_id || !routes) return false;

  if (selectedRoute !== null && sections[selectedRoute]) {
    drawKakaoNavigation(sections[selectedRoute], map);
  }
  return true;
};
