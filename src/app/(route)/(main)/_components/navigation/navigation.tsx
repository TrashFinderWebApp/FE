/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import ButtonList from "@/components/button/buttonlist";
import CarIconSVG from "@/components/svg/cariconsvg";
import NavigationIconSVG from "@/components/svg/navigationiconsvg";
import WalkerIconSVG from "@/components/svg/walkericonsvg";
import { ButtonProps } from "@/types/button";
import {
  MarkerType,
  NavigationCoordinate,
  NavigationResponse,
  PointFeatureProperties,
  Transportation,
} from "@/types/navigate";
import { useEffect, useReducer, useRef } from "react";
import { useKakaoStore } from "@/stores/usekakaostore";
import SearchBar from "@/components/searchbar/searchbar";
import { useTrashCanStore } from "@/stores/usetrashcanstore";
import useNavigationQuery from "@/hooks/query/usenavigationquery";
import { drawKakaoNavigation, drawSKNavigation } from "./drawnavigation";
import NavigationDetail from "./navigationdetail";
import { initialNavigationState, navigationReducer } from "./navigationReducer";

const transportInfo: ButtonProps<Transportation>[] = [
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

const checkNavigationCoordinate = (coordinate: NavigationCoordinate) => {
  return (
    coordinate.start &&
    coordinate.start.x !== undefined &&
    coordinate.start.y !== undefined &&
    coordinate.end &&
    coordinate.end.x !== undefined &&
    coordinate.end.y !== undefined
  );
};

interface NavigationProps {
  end?: { lat: number; lng: number; name?: string };
}

export default function Navigation({ end }: NavigationProps) {
  const [
    {
      selectedTransport,
      navigateCoordinate,
      selectedRoute,
      carRoute,
      walkRoute,
      marker,
    },
    dispatch,
  ] = useReducer(navigationReducer, initialNavigationState, () =>
    end
      ? {
          ...initialNavigationState,
          navigateCoordinate: {
            end: { x: end.lng, y: end.lat, name: end.name },
          },
        }
      : initialNavigationState,
  );

  const { keywordSearch: trashCanSearch } = useTrashCanStore();

  const markerRef = useRef<MarkerType>(marker);

  const path = useNavigationQuery(selectedTransport, navigateCoordinate);
  const erase = useRef<() => void>();

  const { kakaoMap, geoCoder, keywordSearch } = useKakaoStore();

  useEffect(() => {
    if (kakaoMap) {
      dispatch({ type: "SET_MAP", payload: kakaoMap });
    }
  }, [kakaoMap]);

  useEffect(() => {
    if (!marker.startMarker || !marker.endMarker) return;

    markerRef.current = marker;

    navigator.geolocation.getCurrentPosition((position) => {
      geoCoder.coord2Address(
        position.coords.longitude,
        position.coords.latitude,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            dispatch({
              type: "SET_DEPARTURE",
              payload: {
                x: position.coords.longitude,
                y: position.coords.latitude,
                name: result[0].address.address_name,
              },
            });
          }
        },
      );
    });
  }, [marker]);

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
    // navigateCoordinate가 비어있다면
    if (!checkNavigationCoordinate(navigateCoordinate)) {
      return () => erase.current?.();
    }

    if (
      selectedRoute !== null &&
      carRoute.length > 0 &&
      selectedTransport === "car" &&
      carRoute[selectedRoute]
    ) {
      erase.current = drawKakaoNavigation(carRoute[selectedRoute], kakaoMap);
    }
    if (
      selectedRoute !== null &&
      walkRoute.features.length > 0 &&
      selectedTransport === "walk"
    ) {
      erase.current = drawSKNavigation(walkRoute, kakaoMap);
    }

    return () => erase.current?.();
  }, [selectedRoute, selectedTransport, path, navigateCoordinate]);

  useEffect(() => {
    return () => {
      markerRef.current?.startMarker?.setMap(null);
      markerRef.current?.endMarker?.setMap(null);
      erase.current?.();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.25rem] font-extrabold flex items-center gap-2">
        <div className="bg-light-green p-[2px] rounded-md">
          <NavigationIconSVG fill="white" />
        </div>
        <p>길찾기</p>
      </h2>
      <div className="w-full border" />
      <ButtonList
        selectedStatus={selectedTransport}
        setselectedStatus={(status) =>
          dispatch({ type: "SET_TRANSPORT", payload: status })
        }
        buttonInfo={transportInfo}
      />
      <div className="flex justify-between gap-4">
        <form className="w-full flex flex-col gap-0">
          <SearchBar
            placeName={navigateCoordinate.start?.name}
            placeholder="출발지를 입력하세요."
            logo="/svg/departure.svg"
            onClick={(location) => {
              dispatch({
                type: "SET_DEPARTURE",
                payload: {
                  x: location.longitude,
                  y: location.latitude,
                  name: location.address,
                },
              });
            }}
            keywordSearchMethod={keywordSearch}
            className="rounded-md rounded-b-none"
          />
          <SearchBar
            placeName={navigateCoordinate.end?.name}
            placeholder="도착지를 입력하세요."
            logo="/svg/arrival.svg"
            onClick={(location) => {
              dispatch({
                type: "SET_ARRIVAL",
                payload: {
                  x: location.longitude,
                  y: location.latitude,
                  name: location.address,
                },
              });
            }}
            keywordSearchMethod={trashCanSearch}
            className="rounded-md rounded-t-none border-t-0"
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
            onClick={() => {
              dispatch({ type: "REMOVE_DEPARTURE_ARRIVAL" });
              erase.current?.();
            }}
          >
            <img src="/svg/remove.svg" alt="값 비우기" />
          </button>
        </div>
      </div>
      {checkNavigationCoordinate(navigateCoordinate) && (
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
                  .map(
                    (feature) => feature.properties as PointFeatureProperties,
                  )
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
              onClick={() =>
                dispatch({ type: "SET_SELECTED_ROUTE", payload: 0 })
              }
              isSelected
            />
          )}
        </ul>
      )}
    </div>
  );
}
