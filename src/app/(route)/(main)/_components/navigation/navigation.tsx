/* eslint-disable camelcase */

import ButtonList from "@/components/button/buttonlist";
import CarIconSVG from "@/components/svg/CarIconSVG";
import NavigationIconSVG from "@/components/svg/NavigationIconSVG";
import WalkerIconSVG from "@/components/svg/WalkerIconSVG";
import { ButtonProps } from "@/types/button";
import {
  FeatureCollection,
  NavigationCoordinate,
  NavigationResponse,
  PointFeatureProperties,
  RouteSection,
  Transportation,
} from "@/types/navigate";
import { useEffect, useState } from "react";
import useNavigation from "@/hooks/useNavigation";
import { drawKakaoNavigation, drawSKNavigation } from "./drawnavigation";
import NavigationDetail from "./navigationdetail";
import handleTargetCoordinate from "./handleTargetCoordinate";

interface NavigationProps {
  map: any;
}

interface MarkerType {
  startMarker?: any;
  endMarker?: any;
}

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

export default function Navigation({ map }: NavigationProps) {
  const [selectedTransport, setSelectedTransport] =
    useState<Transportation>("car");

  const [navigateCoordinate, setNavigateCoordinate] =
    useState<NavigationCoordinate>({});

  const [marker, setMarker] = useState<MarkerType>({});

  const [isSettingMarker, setIsSettingMarker] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const [carRoute, setCarRoute] = useState<RouteSection[]>([]);
  const [walkRoute, setWalkRoute] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  const path = useNavigation(selectedTransport, navigateCoordinate);

  useEffect(() => {
    // 카카오 길찾기 일때

    if (path.navigate?.trans_id && path.navigate?.routes[0].result_code === 0) {
      const navigate = path.navigate as NavigationResponse;

      const { trans_id, routes } = navigate;
      if (navigate && trans_id && routes) {
        setCarRoute(routes.map((route) => route.sections[0]));
        setSelectedRoute(0);
      }
    }

    if (path.navigate?.trans_id && path.navigate?.routes[0].result_code !== 0) {
      alert(path.navigate?.routes[0].result_msg);
    }

    // SK길찾기일때

    if (path.navigate?.type === "FeatureCollection") {
      setWalkRoute(path.navigate);
      setSelectedRoute(0);
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

  useEffect(() => {
    if (navigateCoordinate.startX && navigateCoordinate.startY) {
      if (marker.startMarker) {
        marker.startMarker.setPosition(
          new window.kakao.maps.LatLng(
            navigateCoordinate.startY,
            navigateCoordinate.startX,
          ),
        );
      } else {
        setMarker((prev) => ({
          ...prev,
          startMarker: new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              navigateCoordinate.startY,
              navigateCoordinate.startX,
            ),
          }),
        }));
      }
    }
    if (navigateCoordinate.endX && navigateCoordinate.endY) {
      if (marker.endMarker) {
        marker.endMarker.setPosition(
          new window.kakao.maps.LatLng(
            navigateCoordinate.endY,
            navigateCoordinate.endX,
          ),
        );
      } else {
        setMarker((prev) => ({
          ...prev,
          endMarker: new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              navigateCoordinate.endY,
              navigateCoordinate.endX,
            ),
          }),
        }));
      }
    }
  }, [navigateCoordinate]);

  useEffect(() => {
    if (marker.startMarker) {
      marker.startMarker.setMap(map);
    }
    if (marker.endMarker) {
      marker.endMarker.setMap(map);
    }
  }, [marker]);

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
        setselectedStatus={setSelectedTransport}
        buttonInfo={trasnportInfo}
      />
      <form className="flex flex-col gap-0">
        <input
          className="bg-red border-2 rounded-t-md border-s outline-none"
          type=""
        />
        <input className="bg-red border-2 rounded-b-md outline-none" />
      </form>
      <button
        type="button"
        onClick={() =>
          isSettingMarker ||
          handleTargetCoordinate(
            "start",
            map,
            setNavigateCoordinate,
            setIsSettingMarker,
          )
        }
      >
        시작 위치
      </button>
      <button
        type="button"
        onClick={() =>
          isSettingMarker ||
          handleTargetCoordinate(
            "end",
            map,
            setNavigateCoordinate,
            setIsSettingMarker,
          )
        }
      >
        도착 위치
      </button>
      <ul>
        {selectedTransport === "car" &&
          carRoute.map((route, index) => (
            <NavigationDetail
              key={route.distance + route.duration}
              details={route}
              onClick={() => setSelectedRoute(index)}
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
            onClick={() => setSelectedRoute(0)}
            isSelected
          />
        )}
      </ul>
    </div>
  );
}
