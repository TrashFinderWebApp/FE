/* eslint-disable jsx-a11y/mouse-events-have-key-events */

"use client";

import { memo, useContext, useEffect, useRef, useState } from "react";
import useGetTrashCanInfo from "@/hooks/usetrashcaninfo";
import {
  TrashCanInfo,
  TrashCanRequest,
  TrashCanStatus,
  TrashCanStatusList,
} from "@/types/TrashInfo";
import createMarker from "@/util/createmarker";
import distanceBetweenLatLng from "@/util/distance";
import { useKakaoStore } from "@/stores/useKakaoStore";
import Modal from "@/components/modal/modal";
import MapContext from "./mapContext";

function RegisterationPage({ params }: { params: { status: string } }) {
  const { setRefreshCallback } = useContext(MapContext);
  const [reqInfo, setReqInfo] = useState<TrashCanRequest | null>(null);
  const { data: trashcanList } = useGetTrashCanInfo(reqInfo);
  const { kakaoMap } = useKakaoStore();

  const [selectedTrashcan, setSelectedTrashcan] = useState<TrashCanInfo | null>(
    null,
  );
  const [isModalOpened, setIsModalOpened] = useState(false);
  const patchRef = useRef<TrashCanInfo>({
    id: "",
    address: "",
    addressDetail: "",
    latitude: 0,
    longitude: 0,
    status: "added",
    description: "",
    imageUrls: [],
  });

  const markerRef = useRef<any[]>([]);

  const handleReqInfo = () => {
    if (
      !kakaoMap ||
      !TrashCanStatusList.includes(params.status[0] as TrashCanStatus)
    )
      return;

    const status = params.status[0] as TrashCanStatus;
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
    const info = {
      latitude: center.getLat(),
      longitude: center.getLng(),
      radius,
      status,
    };
    setReqInfo(info);
  };

  useEffect(() => {
    handleReqInfo();
  }, [kakaoMap, params.status[0]]);

  useEffect(() => {
    markerRef.current.forEach((marker) => {
      marker.setMap(null);
    });

    markerRef.current = [];

    trashcanList?.forEach((trashcan) => {
      const marker = createMarker({
        latitude: trashcan.latitude,
        longitude: trashcan.longitude,
        status: params.status[0] as TrashCanStatus,
        markerIcon: "/svg/trashcanicon.svg",
      });

      markerRef.current.push(marker);

      marker.setMap(kakaoMap);
    });
  }, [trashcanList]);

  useEffect(() => {
    setRefreshCallback(() => handleReqInfo);
    return () => {
      markerRef.current.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <div className="flex flex-col">
          <p>
            id:
            <input
              defaultValue={selectedTrashcan?.id}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.id = e.currentTarget.value;
              }}
            />
          </p>
          <p>
            address:
            <input
              defaultValue={selectedTrashcan?.address}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.address = e.currentTarget.value;
              }}
            />
          </p>
          <p>
            addressDetail:
            <input
              defaultValue={selectedTrashcan?.addressDetail}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.addressDetail = e.currentTarget.value;
              }}
            />
          </p>
          <p>
            lat:
            <input
              defaultValue={selectedTrashcan?.latitude}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.latitude = Number(e.currentTarget.value);
              }}
            />
          </p>
          <p>
            lng:
            <input
              defaultValue={selectedTrashcan?.longitude}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.longitude = Number(e.currentTarget.value);
              }}
            />
          </p>
          <p>
            status:
            <input
              defaultValue={selectedTrashcan?.status}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.status = e.currentTarget
                  .value as TrashCanStatus;
              }}
            />
          </p>
          <p>
            description:
            <input
              defaultValue={selectedTrashcan?.description}
              className="w-full border rounded-md p-1"
              onChange={(e) => {
                patchRef.current.description = e.currentTarget.value;
              }}
            />
          </p>
          <p>
            <p>images</p>
            {selectedTrashcan?.imageUrls ? (
              <div>
                {selectedTrashcan?.imageUrls?.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="trashcan"
                    className="aspect-square w-15"
                  />
                ))}
              </div>
            ) : (
              <p>no image</p>
            )}
          </p>
          <button
            type="button"
            className="p-2 bg-dark-blue font-bold text-white rounded-md text-lg"
          >
            수정
          </button>
        </div>
      </Modal>

      {trashcanList?.map((trashcan, idx) => (
        <button
          key={trashcan.id}
          type="button"
          className="py-4 border-b-2 flex flex-col"
          onMouseOver={() => {
            const greenIcon = new window.kakao.maps.MarkerImage(
              "/svg/trashcanicongreen.svg",
              new window.kakao.maps.Size(30, 30),
              {
                offset: new window.kakao.maps.Point(15, 15),
              },
            );
            markerRef.current[idx].setImage(greenIcon);
          }}
          onMouseOut={() => {
            const redIcon = new window.kakao.maps.MarkerImage(
              "/svg/trashcanicon.svg",
              new window.kakao.maps.Size(30, 30),
              {
                offset: new window.kakao.maps.Point(15, 15),
              },
            );
            markerRef.current[idx].setImage(redIcon);
          }}
          onClick={() => {
            kakaoMap?.panTo(
              new window.kakao.maps.LatLng(
                trashcan.latitude,
                trashcan.longitude,
              ),
            );
            setSelectedTrashcan(trashcan);
            patchRef.current = trashcan;
            setIsModalOpened(true);
          }}
        >
          <p>id: {trashcan.id}</p>
          <p>address: {trashcan.address}</p>
          <p>addressDetail: {trashcan.addressDetail}</p>
        </button>
      ))}
    </div>
  );
}

export default memo(RegisterationPage);
