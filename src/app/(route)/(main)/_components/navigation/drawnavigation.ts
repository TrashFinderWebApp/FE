/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import { Feature, FeatureCollection, RouteSection } from "@/types/navigate";

const colorByTrafficState = [
  "#1E7EFA",
  "#E60023",
  "#FF4545",
  "#02C39A",
  "#1E7EFA",
  "#E60023",
];

export const drawKakaoNavigation = (section: RouteSection, map: any) => {
  // 하나의 길에 대한 점을 정리하는 과정

  const points = section.roads.map((road) => {
    const zipped: number[][] = [[]];

    // 좌표값이 나열되어 있어 두 쌍으로 묶어줌
    road.vertexes.forEach((vertex) => {
      if (zipped[zipped.length - 1].length === 2) {
        zipped.push([]);
      }
      zipped[zipped.length - 1].push(vertex);
    });

    // 묶여있는 좌표값을 LatLng 객체로 변환
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

  // 위의 좌표값을 기반으로 선을 그림
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

  // 가이드 포인트를 그림
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

  // 기존의 선과 점을 지도에서 제거하는 콜백함수 반환
  return () => {
    lines.forEach((line) => {
      line.setMap(null);
    });
    guidepoints.forEach((guidepoint) => {
      guidepoint.setMap(null);
    });
  };
};

export const drawSKNavigation = (
  featureCollection: FeatureCollection,
  map: any,
) => {
  // 특징값을 기반으로 선과 점을 그림
  const mapObjects = featureCollection.features.reduce(
    (acc, feature: Feature) => {
      // 특징이 선분이면 선을 그림
      if (feature.geometry.type === "LineString") {
        const polyline = new window.kakao.maps.Polyline({
          path: feature.geometry.coordinates.map(
            (coordinate) =>
              new window.kakao.maps.LatLng(coordinate[1], coordinate[0]),
          ),
          strokeWeight: 5,
          strokeColor: "#1E7EFA",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        polyline.setMap(map);
        acc.push(polyline);
      }
      // 특징이 점이면 점을 그림
      else {
        const circle = new window.kakao.maps.Circle({
          center: new window.kakao.maps.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ),
          radius: 3,
          strokeWeight: 1,
          strokeColor: "black",
          strokeOpacity: 1,
          fillColor: "white",
          fillOpacity: 1,
        });

        circle.setMap(map);
        acc.push(circle);
      }
      return acc;
    },
    [] as any[],
  );

  // 기존의 선과 점을 지도에서 제거하는 콜백함수 반환
  return () => {
    mapObjects.forEach((obj) => {
      obj.setMap(null);
    });
  };
};
