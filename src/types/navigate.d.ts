export interface NavigationCoordinate {
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}

export type Transportation = "walk" | "car" | "public";

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

export interface RouteSection {
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

export interface NavigationResponse {
  trans_id: string;
  routes: RouteResult[];
}
