/* eslint-disable import/prefer-default-export */

import {
  FeatureCollection,
  MarkerType,
  NavigationCoordinate,
} from "@/types/navigate";

interface NavigationState {
  selectedTransport: string;
  navgiateCoordinate: NavigationCoordinate;
  marker: MarkerType;
  isSettingMarker: boolean;
  selectedRoute?: number | null;
  carRoute: any[];
  walkRoute: FeatureCollection;
}

// 초기 상태
export const initialState: NavigationState = {
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

interface Action {
  type: string;
  payload: any;
}

// 리듀서 함수
export const reducer = (state: NavigationState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
