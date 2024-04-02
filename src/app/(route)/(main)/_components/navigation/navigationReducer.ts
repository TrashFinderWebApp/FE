/* eslint-disable import/prefer-default-export */

import {
  Coordinate,
  FeatureCollection,
  MarkerType,
  NavigationCoordinate,
  RouteSection,
  Transportation,
} from "@/types/navigate";
import createMarker from "../createmarker";

interface NavigationState {
  selectedTransport: Transportation;
  navigateCoordinate: NavigationCoordinate;
  marker: MarkerType;
  isSettingMarker: boolean;
  selectedRoute: number | null;
  carRoute: RouteSection[];
  walkRoute: FeatureCollection;
  map: any;
  eraseMarker?: () => void;
  initialLocation: string;
}

// 초기 상태
export const initialNavigationState: NavigationState = {
  map: null,
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
  eraseMarker: () => {},
  initialLocation: "",
};

const Actions = {
  SET: "SET",
  SET_MAP: "SET_MAP",
  SET_TRANSPORT: "SET_TRANSPORT",
  SET_DEPARTURE: "SET_DEPARTURE",
  SET_ARRIVAL: "SET_ARRIVAL",
  SET_SELECTED_ROUTE: "SET_SELECTED_ROUTE",
  SET_CAR_ROUTE: "SET_CAR_ROUTE",
  SET_WALK_ROUTE: "SET_WALK_ROUTE",
  SWAP_DEPARTURE_ARRIVAL: "SWAP_DEPARTURE_ARRIVAL",
  REMOVE_DEPARTURE_ARRIVAL: "REMOVE_DEPARTURE_ARRIVAL",
} as const;

export type NavigateActionType = (typeof Actions)[keyof typeof Actions];

interface SetAction {
  type: "SET";
  payload: Partial<NavigationState>;
}

interface SetMapAction {
  type: "SET_MAP";
  payload: any;
}

interface SetTransportAction {
  type: "SET_TRANSPORT";
  payload: Transportation;
}

interface SetDepartureAction {
  type: "SET_DEPARTURE";
  payload: Coordinate;
}

interface SetArrivalAction {
  type: "SET_ARRIVAL";
  payload: Coordinate;
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

interface SwapDepartureArrivalAction {
  type: "SWAP_DEPARTURE_ARRIVAL";
}

interface RemoveDepartureArrivalAction {
  type: "REMOVE_DEPARTURE_ARRIVAL";
}

export type NavigationAction =
  | SetAction
  | SetMapAction
  | SetTransportAction
  | SetDepartureAction
  | SetArrivalAction
  | SetSelectedRouteAction
  | SetCarRouteAction
  | SetWalkRouteAction
  | SwapDepartureArrivalAction
  | RemoveDepartureArrivalAction;

// 리듀서 함수
export const navigationReducer = (
  state: NavigationState,
  action: NavigationAction,
): NavigationState => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_MAP": {
      const startImageSrc = "svg/departure.svg"; // 마커이미지의 주소입니다
      const endImageSrc = "svg/arrival.svg"; // 마커이미지의 주소입니다
      const startMarker = createMarker({}, startImageSrc);
      const endMarker = createMarker({}, endImageSrc);

      startMarker.setMap(action.payload);
      endMarker.setMap(action.payload);
      return {
        ...state,
        marker: {
          startMarker,
          endMarker,
        },
        map: action.payload,
      };
    }

    case "SET_TRANSPORT":
      return {
        ...state,
        selectedTransport: action.payload,
      };

    case "SET_DEPARTURE": {
      state.marker.startMarker.setPosition(
        new window.kakao.maps.LatLng(action.payload.y, action.payload.x),
      );

      state.map.setCenter(
        new window.kakao.maps.LatLng(action.payload.y, action.payload.x),
      );

      state.marker.startMarker.setMap(state.map);

      return {
        ...state,
        navigateCoordinate: {
          ...state.navigateCoordinate,
          start: { ...action.payload },
        },
      };
    }

    case "SET_ARRIVAL": {
      state.marker.endMarker.setPosition(
        new window.kakao.maps.LatLng(action.payload.y, action.payload.x),
      );

      state.map.setCenter(
        new window.kakao.maps.LatLng(action.payload.y, action.payload.x),
      );

      state.marker.endMarker.setMap(state.map);
      return {
        ...state,
        navigateCoordinate: {
          ...state.navigateCoordinate,
          end: { ...action.payload },
        },
      };
    }

    case "SET_SELECTED_ROUTE": {
      if (action.payload === null) {
        return {
          ...state,
          selectedRoute: null,
        };
      }
      return {
        ...state,
        selectedRoute: action.payload,
      };
    }

    case "SET_CAR_ROUTE":
      return {
        ...state,
        carRoute: action.payload,
        selectedRoute: 0,
      };
    case "SET_WALK_ROUTE":
      return {
        ...state,
        walkRoute: action.payload,
        selectedRoute: 0,
      };

    case "SWAP_DEPARTURE_ARRIVAL": {
      const nav = state.navigateCoordinate;

      if (!nav.start || !nav.end) return state;

      const startX = nav.start?.x;
      const startY = nav.start?.y;
      const endX = nav.end?.x;
      const endY = nav.end?.y;

      state.marker.startMarker.setPosition(
        new window.kakao.maps.LatLng(endY, endX),
      );
      state.marker.endMarker.setPosition(
        new window.kakao.maps.LatLng(startY, startX),
      );
      return {
        ...state,
        navigateCoordinate: {
          start: { ...nav.end },
          end: { ...nav.start },
        },
      };
    }

    case "REMOVE_DEPARTURE_ARRIVAL": {
      state.marker.startMarker?.setMap(null);
      state.marker.endMarker?.setMap(null);
      state.eraseMarker?.();
      return {
        ...state,
        navigateCoordinate: {},
      };
    }
    default:
      return state;
  }
};
