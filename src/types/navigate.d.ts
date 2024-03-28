export interface NavigationCoordinate {
  startX?: number;
  startY?: number;
  startName?: string;
  endX?: number;
  endY?: number;
  endName?: string;
}

export type Transportation = "walk" | "car" | "public";

interface Coordinate {
  lng: number;
  lat: number;
}

// 카카오맵 길찾기 API 응답
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

// SK 길찾기 API 응답
export interface PointFeatureProperties {
  index: number;
  pointIndex?: number;
  name: string;
  description: string;
  direction: string;
  nearPoiName: string;
  nearPoiX: string;
  nearPoiY: string;
  intersectionName: string;
  facilityType: string;
  facilityName: string;
  turnType: number;
  pointType: string;
  totalDistance?: number;
  totalTime?: number;
}

export interface LineStringFeatureProperties {
  index: number;
  lineIndex: number;
  name: string;
  description: string;
  distance: number;
  time: number;
  roadType: number;
  categoryRoadType: number;
  facilityType: string;
  facilityName: string;
}

export interface PointFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: PointFeatureProperties;
}

interface LineStringFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: [number, number][];
  };
  properties: LineStringFeatureProperties;
}

type Feature = PointFeature | LineStringFeature;

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface MarkerType {
  startMarker?: any;
  endMarker?: any;
}

export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  address_detail?: string;
  name?: string;
  id: string;
  category?: string;
  distance?: number;
}
