/* eslint-disable camelcase */
import ButtonList from "@/components/button/buttonlist";
import BusIconSVG from "@/components/svg/BusIconSvg";
import CarIconSVG from "@/components/svg/CarIconSVG";
import NavigationIconSVG from "@/components/svg/NavigationIconSVG";
import WalkerIconSVG from "@/components/svg/WalkerIconSVG";
import { ButtonProps } from "@/types/button";
import {
  NavigationCoordinate,
  NavigationResponse,
  RouteSection,
  Transportation,
} from "@/types/navigate";
import { useEffect, useState } from "react";
import useNavigation from "@/hooks/useNavigation";
import { drawKakaoNavigation } from "./kakaoNavigation";

interface NavigationProps {
  map: any;
}

interface MarkerType {
  startMarker: any;
  endMarker: any;
}

type TargetType = "start" | "end";

const trasnportInfo: ButtonProps<Transportation>[] = [
  {
    content: "대중교통",
    type: "public",
    iconComponent: BusIconSVG,
  },
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

const hangleTargetCoordinate = (
  type: TargetType,
  map: any,
  setNavigateCoordinate: React.Dispatch<
    React.SetStateAction<NavigationCoordinate>
  >,
  setIsSettingMarker: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsSettingMarker(true);

  const handleClick = (mouseEvent: any) => {
    if (type === "start") {
      setNavigateCoordinate((prev) => ({
        ...prev,
        startY: mouseEvent.latLng.getLat(),
        startX: mouseEvent.latLng.getLng(),
      }));
    } else {
      setNavigateCoordinate((prev) => ({
        ...prev,
        endY: mouseEvent.latLng.getLat(),
        endX: mouseEvent.latLng.getLng(),
      }));
    }
    setIsSettingMarker(false);
    window.kakao.maps.event.removeListener(map, "click", handleClick);
  };

  window.kakao.maps.event.addListener(map, "click", handleClick);
};

export default function Navigation({ map }: NavigationProps) {
  const [selectedTransport, setSelectedTransport] =
    useState<Transportation>("car");

  const [navgiateCoordinate, setNavigateCoordinate] =
    useState<NavigationCoordinate>({
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    });

  const [marker, setMarker] = useState<MarkerType>({
    startMarker: null,
    endMarker: null,
  });

  const [isSettingMarker, setIsSettingMarker] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [section, setSection] = useState<RouteSection[]>([]);

  const path = useNavigation(selectedTransport, navgiateCoordinate);

  useEffect(() => {
    // 카카오맵일때

    if (path.navigate?.trans_id && path.navigate?.routes[0].result_code === 0) {
      const navigate = path.navigate as NavigationResponse;

      const { trans_id, routes } = navigate;
      if (navigate && trans_id && routes) {
        setSection(routes.map((route) => route.sections[0]));
      }
    }

    if (path.navigate?.trans_id && path.navigate?.routes[0].result_code !== 0) {
      alert(path.navigate?.routes[0].result_msg);
    }
  }, [path.navigate]);

  useEffect(() => {
    let erase: () => void;
    if (selectedRoute !== null) {
      if (section[selectedRoute]) {
        erase = drawKakaoNavigation(section[selectedRoute], map);
      }
    }
    return () => erase?.();
  }, [selectedRoute]);

  useEffect(() => {
    if (navgiateCoordinate.startX && navgiateCoordinate.startY) {
      if (marker.startMarker) {
        marker.startMarker.setPosition(
          new window.kakao.maps.LatLng(
            navgiateCoordinate.startY,
            navgiateCoordinate.startX,
          ),
        );
      } else {
        setMarker((prev) => ({
          ...prev,
          startMarker: new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              navgiateCoordinate.startY,
              navgiateCoordinate.startX,
            ),
          }),
        }));
      }
    }
    if (navgiateCoordinate.endX && navgiateCoordinate.endY) {
      if (marker.endMarker) {
        marker.endMarker.setPosition(
          new window.kakao.maps.LatLng(
            navgiateCoordinate.endY,
            navgiateCoordinate.endX,
          ),
        );
      } else {
        setMarker((prev) => ({
          ...prev,
          endMarker: new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              navgiateCoordinate.endY,
              navgiateCoordinate.endX,
            ),
          }),
        }));
      }
    }
  }, [navgiateCoordinate]);

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
          hangleTargetCoordinate(
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
          hangleTargetCoordinate(
            "end",
            map,
            setNavigateCoordinate,
            setIsSettingMarker,
          )
        }
      >
        도착 위치
      </button>
      {section.map((route, index) => (
        <button
          type="button"
          key={route.duration}
          onClick={() => setSelectedRoute(index)}
        >
          {index}
        </button>
      ))}
    </div>
  );
}
