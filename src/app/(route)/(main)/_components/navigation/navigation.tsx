/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import ButtonList from "@/components/button/buttonlist";
import CarIconSVG from "@/components/svg/CarIconSVG";
import NavigationIconSVG from "@/components/svg/NavigationIconSVG";
import WalkerIconSVG from "@/components/svg/WalkerIconSVG";
import { ButtonProps } from "@/types/button";
import {
  NavigationResponse,
  PointFeatureProperties,
  Transportation,
} from "@/types/navigate";
import { useEffect, useReducer } from "react";
import useNavigation from "@/hooks/useNavigation";
import { useKakaoStore } from "@/stores/useKakaoStore";
import { drawKakaoNavigation, drawSKNavigation } from "./drawnavigation";
import NavigationDetail from "./navigationdetail";
import handleTargetCoordinate from "./handleTargetCoordinate";
import { initialNavigationState, navigationReducer } from "./navigationReducer";

const trasnportInfo: ButtonProps<Transportation>[] = [
  {
    content: "자동차",
    type: "car",
    iconComponent: CarIconSVG,
  },
  {
    content: "도보",
    type: "walk",
    iconComponent: WalkerIconSVG,
  },
];

export default function Navigation() {
  const [
    {
      selectedTransport,
      navigateCoordinate,
      isSettingMarker,
      selectedRoute,
      carRoute,
      walkRoute,
    },
    dispatch,
  ] = useReducer(navigationReducer, initialNavigationState);

  const path = useNavigation(selectedTransport, navigateCoordinate);
  const { kakaoMap: map } = useKakaoStore();
  useEffect(() => {
    if (map) {
      dispatch({ type: "SET_MAP", payload: map });
    }
  }, [map]);

  useEffect(() => {
    if (path.navigate && Object.keys(path.navigate).length === 0) return;

    // 카카오 길찾기 일때
    if (path.navigate?.trans_id && path.navigate?.routes[0].result_code === 0) {
      const navigate = path.navigate as NavigationResponse;

      const { trans_id, routes } = navigate;
      if (navigate && trans_id && routes) {
        dispatch({
          type: "SET_CAR_ROUTE",
          payload: routes.map((route) => route.sections[0]),
        });
      }
    }

    if (path.navigate?.trans_id && path.navigate?.routes[0].result_code !== 0) {
      alert(path.navigate?.routes[0].result_msg);
    }

    // SK길찾기일때

    if (path.navigate?.type === "FeatureCollection") {
      dispatch({ type: "SET_WALK_ROUTE", payload: path.navigate });
    }

    if (path.navigate?.error && path.navigate?.error.message) {
      alert(path.navigate?.error.message);
    }
  }, [path.navigate]);

  useEffect(() => {
    let erase: () => void;
    if (
      selectedRoute !== null &&
      carRoute.length > 0 &&
      selectedTransport === "car" &&
      carRoute[selectedRoute]
    ) {
      erase = drawKakaoNavigation(carRoute[selectedRoute], map);
    }
    if (
      selectedRoute !== null &&
      walkRoute.features.length > 0 &&
      selectedTransport === "walk"
    ) {
      erase = drawSKNavigation(walkRoute, map);
    }
    return () => erase?.();
  }, [selectedRoute, selectedTransport, path]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.25rem] font-extrabold flex items-center gap-2 ">
        <div className=" bg-light-green p-[2px] rounded-md">
          <NavigationIconSVG fill="white" />
        </div>
        <p>길찾기</p>
      </h2>
      <div className="w-full border " />
      <ButtonList
        selectedStatus={selectedTransport}
        setselectedStatus={(status) =>
          dispatch({ type: "SET_TRANSPORT", payload: status })
        }
        buttonInfo={trasnportInfo}
      />
      <div className="flex justify-between gap-4">
        <form className="w-full flex flex-col gap-0">
          <div className="relative">
            <input
              className="w-full border-2 rounded-t-md outline-none px-4 py-2 pl-12"
              type=""
              style={{
                backgroundImage: "url(/svg/departure.svg)",
                backgroundPosition: "left 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "2rem",
              }}
              placeholder="출발지를 입력하세요"
            />
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-0 w-10 h-10"
              onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                  dispatch({
                    type: "SET_DEPARTURE",
                    payload: {
                      startY: position.coords.latitude,
                      startX: position.coords.longitude,
                    },
                  });
                });
              }}
            >
              <img src="/svg/RightMyGps.svg" alt="현재 위치" />
            </button>
          </div>
          <input
            className=" border-2 border-t-0 rounded-b-md outline-none px-4 py-2 pl-12"
            style={{
              backgroundImage: "url(/svg/arrival.svg)",
              backgroundPosition: "left 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "2rem",
            }}
            placeholder="도착지를 입력하세요"
          />
        </form>
        <div className="flex flex-col items-center justify-around">
          <button
            type="button"
            onClick={() => dispatch({ type: "SWAP_DEPARTURE_ARRIVAL" })}
          >
            <img src="/svg/swap.svg" alt="출발지 목적지 교체" />
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "REMOVE_DEPARTURE_ARRIVAL" })}
          >
            <img src="/svg/remove.svg" alt="값 비우기" />
          </button>
        </div>
      </div>

      <ul>
        {selectedTransport === "car" &&
          carRoute.map((route, index) => (
            <NavigationDetail
              key={route.distance + route.duration}
              details={route}
              onClick={() =>
                dispatch({ type: "SET_SELECTED_ROUTE", payload: index })
              }
              isSelected={selectedRoute === index}
            />
          ))}
        {selectedTransport === "walk" && walkRoute.features.length > 0 && (
          <NavigationDetail
            details={{
              distance:
                (walkRoute.features[0].properties as PointFeatureProperties)
                  .totalDistance || 0,
              duration:
                (walkRoute.features[0].properties as PointFeatureProperties)
                  .totalTime || 0,
              guides: walkRoute.features
                .filter((feature) => feature.geometry.type === "Point")
                .map((feature) => feature.properties as PointFeatureProperties)
                .map((property) => {
                  return {
                    name: property.name,
                    guidance: property.description,
                    distance: 0,
                    duration: 0,
                    description: property.description,
                  };
                }),
            }}
            onClick={() => dispatch({ type: "SET_SELECTED_ROUTE", payload: 0 })}
            isSelected
          />
        )}
      </ul>
    </div>
  );
}
