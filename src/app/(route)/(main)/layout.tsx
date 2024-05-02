"use client";

import useMap from "@/hooks/useMap";
import { useEffect, useRef, useState } from "react";
import Accordion from "@/components/accordion/accordion";
import { isMobile } from "react-device-detect";
import Navigator from "@/components/sidebar/Navigator";
import Header from "@/components/header/header";
import { useKakaoStore } from "@/stores/useKakaoStore";
import distanceBetweenLatLng from "@/util/distance";
import { useTrashCanStore } from "@/stores/useTrashCanStore";
import ButtonList from "@/components/button/buttonlist";
import { ButtonProps } from "@/types/button";
import createMarker from "./_components/createmarker";

interface MainLayoutProps {
  children: React.ReactNode;
}

const buttonProps: ButtonProps<boolean>[] = [
  {
    content: "지도",
    type: true,
  },
  {
    content: "로드뷰",
    type: false,
  },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const roadViewRef = useRef<HTMLDivElement | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { kakaoMap, kakaoClusterer, isMapOpened, setIsMapOpened } =
    useKakaoStore();
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
  const [needRefresh, setNeedRefresh] = useState(false);
  const { trashCanList, getTrashCanList } = useTrashCanStore();
  const markerRef = useRef<any[]>([]);

  useEffect(() => {
    if (isMobile) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, [isMobile]);

  useMap(mapRef, roadViewRef);

  const drawMarker = () => {
    const bound = kakaoMap.getBounds();
    const center = kakaoMap.getCenter();

    const [NElat, NElng, SWlat, SWlng] = [
      bound.getNorthEast().getLat(),
      bound.getNorthEast().getLng(),
      bound.getSouthWest().getLat(),
      bound.getSouthWest().getLng(),
    ];

    const radius =
      (distanceBetweenLatLng(NElat, NElng, SWlat, SWlng) * 1000) / 2;

    getTrashCanList(center.getLat(), center.getLng(), radius, "added");
  };

  useEffect(() => {
    if (kakaoMap && window.kakao) {
      window.kakao.maps.event.addListener(kakaoMap, "dragend", () => {
        setNeedRefresh(true);
      });

      window.kakao.maps.event.addListener(kakaoMap, "zoom_changed", () => {
        setNeedRefresh(true);
      });
    }
  }, [kakaoMap]);

  useEffect(() => {
    if (kakaoClusterer && kakaoMap) {
      kakaoClusterer.clear();

      markerRef.current.length = 0;
      if (!Array.isArray(trashCanList)) return;
      trashCanList.forEach((trashcan) => {
        const marker = createMarker({
          latitude: trashcan.latitude,
          longitude: trashcan.longitude,
          status: trashcan.status,
          markerIcon: "/svg/trashcanicongreen.svg",
        });

        markerRef.current.push(marker);

        kakaoClusterer.addMarker(marker);
      });
    }
  }, [trashCanList]);

  return (
    <>
      {deviceType === "mobile" ? (
        <Header>
          <section className="my-5 w-full">{children}</section>
        </Header>
      ) : (
        <>
          <Navigator />
          <Accordion isOpen={isAccordionOpen} setIsOpen={setIsAccordionOpen}>
            <section className="my-5">{children}</section>
          </Accordion>
        </>
      )}
      <button
        className={`absolute duration-300 top-4 left-[50%] -translate-x-[50%] z-50 bg-white rounded-md shadow-lg p-4 font-bold text-light-blue ${needRefresh ? "bg-white pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        type="button"
        onClick={() => {
          setNeedRefresh(false);
          drawMarker();
        }}
      >
        새로 고침
      </button>
      <ButtonList
        selectedStatus={isMapOpened}
        setselectedStatus={setIsMapOpened}
        buttonInfo={buttonProps}
        className="absolute top-4 right-4 z-50 w-40"
      />
      <div
        ref={mapRef}
        style={{ zIndex: isMapOpened ? "10" : "0" }}
        className={
          isAccordionOpen
            ? "absolute top-0 h-screen duration-300 w-[calc(100%-20rem)] translate-x-[19.875rem] box-content"
            : "absolute top-0 h-screen duration-300 w-full box-content"
        }
      />
      <div
        ref={roadViewRef}
        style={{
          zIndex: isMapOpened ? "0" : "10",
        }}
        className={
          isAccordionOpen
            ? "absolute top-0 left-0 h-screen duration-300 w-[calc(100%-20rem)] translate-x-[19.875rem] box-content"
            : "absolute top-0 left-0 h-screen duration-300 w-full box-content"
        }
      />
    </>
  );
}
