/* eslint-disable import/prefer-default-export */

import {
  FeatureCollection,
  MarkerType,
  NavigationCoordinate,
  RouteSection,
  Transportation,
} from "@/types/navigate";

interface NavigationState {
  selectedTransport: Transportation;
  navigateCoordinate: NavigationCoordinate;
  marker: MarkerType;
  isSettingMarker: boolean;
  selectedRoute: number | null;
  carRoute: RouteSection[];
  walkRoute: FeatureCollection;
}

// 초기 상태
export const initialNavigationState: NavigationState = {
  selectedTransport: "car",
  navigateCoordinate: {},
  marker: {},
  isSettingMarker: false,
  selectedRoute: null,
  carRoute: [],
  walkRoute: {
    type: "FeatureCollection",
    features: [],
  },
};

const Actions = {
  SET: "SET",
  SET_TRANSPORT: "SET_TRANSPORT",
  SET_DEPARTURE: "SET_DEPARTURE",
  SET_ARRIVAL: "SET_ARRIVAL",
  SET_NAV_MARKER: "SET_NAV_MARKER",
  SET_SELECTED_ROUTE: "SET_SELECTED_ROUTE",
  SET_CAR_ROUTE: "SET_CAR_ROUTE",
  SET_WALK_ROUTE: "SET_WALK_ROUTE",
} as const;

export type NavigateActionType = (typeof Actions)[keyof typeof Actions];

interface SetAction {
  type: "SET";
  payload: Partial<NavigationState>;
}

interface SetTransportAction {
  type: "SET_TRANSPORT";
  payload: Transportation;
}

interface SetDepartureAction {
  type: "SET_DEPARTURE";
  payload: Pick<NavigationCoordinate, "startX" | "startY">;
}

interface SetArrivalAction {
  type: "SET_ARRIVAL";
  payload: Pick<NavigationCoordinate, "endX" | "endY">;
}

interface SetNavMarkerAction {
  type: "SET_NAV_MARKER";
  payload: MarkerType;
}

interface SetSelectedRouteAction {
  type: "SET_SELECTED_ROUTE";
  payload: number | null;
}

interface SetCarRouteAction {
  type: "SET_CAR_ROUTE";
  payload: RouteSection[];
}

interface SetWalkRouteAction {
  type: "SET_WALK_ROUTE";
  payload: FeatureCollection;
}

export type NavigationAction =
  | SetAction
  | SetTransportAction
  | SetDepartureAction
  | SetArrivalAction
  | SetNavMarkerAction
  | SetSelectedRouteAction
  | SetCarRouteAction
  | SetWalkRouteAction;

// 리듀서 함수
export const navigationReducer = (
  state: NavigationState,
  action: NavigationAction,
) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_TRANSPORT":
      return {
        ...state,
        selectedTransport: action.payload,
      };

    case "SET_DEPARTURE":
    case "SET_ARRIVAL":
      return {
        ...state,
        navigateCoordinate: {
          ...state.navigateCoordinate,
          ...action.payload,
        },
      };
    case "SET_NAV_MARKER":
      return {
        ...state,
        marker: {
          ...state.marker,
          ...action.payload,
        },
      };
    case "SET_SELECTED_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload,
      };

    case "SET_CAR_ROUTE":
      return {
        ...state,
        carRoute: action.payload,
      };
    case "SET_WALK_ROUTE":
      return {
        ...state,
        walkRoute: action.payload,
      };
    default:
      return state;
  }
};
