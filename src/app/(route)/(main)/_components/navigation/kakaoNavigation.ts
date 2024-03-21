/* eslint-disable camelcase */
interface Coordinate {
  x: number;
  y: number;
}

interface RouteSummary {
  origin: Coordinate;
  destination: Coordinate;
  waypoints: unknown[]; // 결과를 몰라 unknown으로 둠
  priority: string;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  fare: {
    taxi: number;
    toll: number;
  };
  distance: number;
  duration: number;
}

interface RoadSegment {
  name: string;
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
}

interface RouteGuide {
  name: string;
  x: number;
  y: number;
  distance: number;
  duration: number;
  type: number;
  guidance: string;
  road_index: number;
}

interface RouteSection {
  distance: number;
  duration: number;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  roads: RoadSegment[];
  guides: RouteGuide[];
}

interface RouteResult {
  result_code: number;
  result_msg: string;
  summary: RouteSummary;
  sections: RouteSection[];
}

interface NavigationResponse {
  trans_id: string;
  routes: RouteResult[];
}

export default function KakaoNavigation(
  navigate: NavigationResponse,
  map: any,
) {
  const { trans_id, routes } = navigate;
  if (!navigate || !trans_id || !routes) return null;
  routes.forEach((route) => {
    route.sections.forEach((section) => {
      const points = section.guides.map((guide) => {
        return new window.kakao.maps.LatLng(guide.y, guide.x);
      });

      const polyline = new window.kakao.maps.Polyline({
        path: points,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      polyline.setMap(map);
    });
  });
}
