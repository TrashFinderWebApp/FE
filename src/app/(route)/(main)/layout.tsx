"use client";

import useMap from "@/hooks/map/useMap";
import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import { isMobile } from "react-device-detect";
import Header from "@/components/header/header";
import { useKakaoStore } from "@/stores/useKakaoStore";
import ButtonList from "@/components/button/buttonlist";
import { ButtonProps } from "@/types/button";
import Navigator from "@/components/sidebar/Navigator";
import useDrawMarker from "@/hooks/map/useDrawMarker";
import { useTrashCanStore } from "@/stores/useTrashCanStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

const buttonProps: ButtonProps<boolean>[] = [
  {
    content: "지도",
    type: false,
  },
  {
    content: "로드뷰",
    type: true,
  },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const roadViewRef = useRef<HTMLDivElement | null>(null);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
  const [isRoadView, setIsRoadView] = useState(false);
  const {
    kakaoMap,
    isMapOpened,
    roadViewClient,
    kakaoRoadView,
    setIsMapOpened,
  } = useKakaoStore();

  useMap(mapRef, roadViewRef);
  const { data, needRefresh, setNeedRefresh, reFresh } = useDrawMarker(
    "added",
    {
      markerIcon: "/svg/trashcanicongreen.svg",
    },
  );
  const { setTrashCanList } = useTrashCanStore();

  useEffect(() => {
    if (data) {
      setTrashCanList(data);
    }
  }, [data]);

  useEffect(() => {
    if (isMobile) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, [isMobile]);

  useEffect(() => {
    if (window.kakao && isRoadView) {
      kakaoMap.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
      const handleClick = (mouseEvent: any) => {
        const position = mouseEvent.latLng;
        roadViewClient.getNearestPanoId(position, 50, (panoId: any) => {
          setIsMapOpened(false);
          kakaoRoadView.setPanoId(panoId, position);
        });

        window.kakao.maps.event.removeListener(kakaoMap, "click", handleClick);
      };
      window.kakao.maps.event.addListener(kakaoMap, "click", handleClick);
    }

    if (window.kakao && !isRoadView) {
      kakaoMap.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
      setIsMapOpened(true);
    }
  }, [isRoadView]);

  return (
    <>
      {deviceType === "mobile" ? (
        <Header>
          <section className="w-full">{children}</section>
        </Header>
      ) : (
        <>
          <Navigator />
          <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
            <section className="my-5">{children}</section>
          </Accordion>
        </>
      )}

      <ButtonList
        selectedStatus={isRoadView}
        setselectedStatus={setIsRoadView}
        buttonInfo={buttonProps}
        className={`absolute right-4 z-30 w-40${
          deviceType === "mobile" ? " top-36" : " top-4"
        }`}
      />
      <button
        className={`absolute duration-300 top-4 left-[50%] -translate-x-[50%] z-50 bg-white rounded-md shadow-lg p-4 font-bold text-light-blue ${needRefresh ? "bg-white pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        type="button"
        onClick={() => {
          setNeedRefresh(false);
          reFresh();
        }}
      >
        새로 고침
      </button>
      <div
        ref={mapRef}
        style={{ zIndex: isMapOpened ? "10" : "0" }}
        className={
          isAccordionOpen
            ? "absolute top-0 h-svh duration-300 w-[calc(100%-20rem)] translate-x-[19.875rem] box-content"
            : "absolute top-0 h-svh duration-300 w-full box-content"
        }
      />
      <div
        ref={roadViewRef}
        style={{
          zIndex: isMapOpened ? "0" : "10",
        }}
        className={
          isAccordionOpen
            ? "absolute top-0 left-0 h-svh duration-300 w-[calc(100%-20rem)] translate-x-[19.875rem] box-content"
            : "absolute top-0 left-0 h-svh duration-300 w-full box-content"
        }
      />
    </>
  );
}
