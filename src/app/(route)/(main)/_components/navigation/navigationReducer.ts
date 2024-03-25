/* eslint-disable import/prefer-default-export */

import {
  FeatureCollection,
  MarkerType,
  NavigationCoordinate,
  Transportation,
} from "@/types/navigate";

interface NavigationState {
  selectedTransport: Transportation;
  navgiateCoordinate: NavigationCoordinate;
  marker: MarkerType;
  isSettingMarker: boolean;
  selectedRoute?: number | null;
  carRoute: any[];
  walkRoute: FeatureCollection;
}

interface SetAction {
  type: "SET";
  payload: Partial<NavigationState>;
}

type Action = SetAction;

// 초기 상태
export const initialNavigationState: NavigationState = {
  selectedTransport: "car",
  navgiateCoordinate: {},
  marker: {},
  isSettingMarker: false,
  selectedRoute: undefined,
  carRoute: [],
  walkRoute: {
    type: "FeatureCollection",
    features: [],
  },
};

// 리듀서 함수
export const navigationReducer = (state: NavigationState, action: Action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
