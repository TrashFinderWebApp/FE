import ButtonList from "@/components/button/buttonlist";
import SearchBar from "@/components/searchbar/searchbar";
import { useKakaoStore } from "@/stores/useKakaoStore";
import { ButtonProps } from "@/types/button";
import { Coordinate } from "@/types/navigate";
import { useEffect, useRef, useState } from "react";

type RegisterType = "new" | "recommend";

const buttonInfo: ButtonProps<RegisterType>[] = [
  {
    content: "위치 신규 등록",
    type: "new",
  },
  {
    content: "위치 제안",
    type: "recommend",
  },
];

interface Marker {
  marker: any;
  info: any;
}

const onFileChange =
  (setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setSelectedImage(Array.from(files).slice(0, 5));
    }
  };

const moveMarker = (marker: Marker, kakaoMap: any, coordinate: Coordinate) => {
  const latlng = new window.kakao.maps.LatLng(coordinate.lat, coordinate.lng);
  marker?.marker.setPosition(latlng);
  marker?.info.setPosition(latlng);

  kakaoMap.setCenter(latlng);
};

export default function RegisterTrashCan() {
  const [selectedMethod, setSelectedMethod] = useState<RegisterType>("new");
  const [selectedLocation, setSelectedCoordinate] = useState<Coordinate | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const explanation = useRef<string>("");
  const marker = useRef<Marker>({
    marker: null,
    info: null,
  });
  const { kakaoMap, keywordSearch } = useKakaoStore();

  useEffect(() => {
    if (kakaoMap) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectedCoordinate({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });

        const imageSrc = "/svg/selectmarker.svg";
        const imageSize = new window.kakao.maps.Size(40, 40);
        const imageOption = { offset: new window.kakao.maps.Point(20, 40) };
        const center = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        marker.current.marker = new window.kakao.maps.Marker({
          position: center,
          image: new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          ),
          map: kakaoMap,
        });

        marker.current.info = new window.kakao.maps.CustomOverlay({
          position: center,
          content:
            "<div class='bg-opacity-70 bg-[#111111] rounded-md border border-black text-white p-2'>지도를 끌어서 이동</div>",
          yAnchor: 2,
        });

        marker.current.info.setMap(kakaoMap);

        kakaoMap.setCenter(
          new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          ),
        );
      });
    }
    const onDragMap = () => {
      const center = kakaoMap.getCenter();
      moveMarker(marker.current, kakaoMap, {
        lat: center.getLat(),
        lng: center.getLng(),
      });
    };

    if (kakaoMap) {
      window.kakao.maps.event.addListener(kakaoMap, "drag", onDragMap);
    }

    return () => {
      if (kakaoMap) {
        window.kakao.maps.event.removeListener(kakaoMap, "drag", onDragMap);
      }
    };
  }, [kakaoMap]);

  return (
    <div className="flex flex-col gap-4">
      <h1>target:{`${selectedLocation?.lat} ${selectedLocation?.lng}`}</h1>
      <h2 className="font-extrabold text-[1.25rem] py-2">새로운 장소</h2>
      <ButtonList
        selectedStatus={selectedMethod}
        setselectedStatus={(status) => {
          setSelectedMethod(status);
        }}
        buttonInfo={buttonInfo}
      />
      <div className="text-dark-blue text-sm">
        *
        {selectedMethod === "new"
          ? "등록되지 않은 쓰레기통의 위치를 등록 요청 할 수 있습니다."
          : "쓰레기통이 있으면 좋은 위치를 추천 할 수 있습니다."}
      </div>
      <div className="w-full border" />
      <div className="flex flex-col gap-4 mt-4">
        <p>1. 등록하고 싶은 쓰레기통의 위치를 지정해 주세요.</p>
        <SearchBar
          placeholder="장소, 도로, 건물 검색"
          onClick={(location) => {
            setSelectedCoordinate({
              lat: location.latitude,
              lng: location.longitude,
            });
            marker.current.marker.setPosition(
              new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude,
              ),
            );

            marker.current.info.setPosition(
              new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude,
              ),
            );

            kakaoMap.setCenter(
              new window.kakao.maps.LatLng(
                location.latitude,
                location.longitude,
              ),
            );
          }}
          logo="/svg/searchicon.svg"
          keywordSearchMethod={keywordSearch}
          className="border-2 border-light-green rounded-md p-2"
        />
        <p className="text-dark-blue text-sm">
          * 위치를 검색해 현재 위치를 조정 할 수 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <p>2. 위치를 확인할 수 있는 사진을 첨부해 주세요.(선택)</p>
        <div className="flex flex-col justify-between w-full rounded-md border-2 border-light-green aspect-[3/1] p-2">
          {selectedImage.length === 0 && (
            <p className="text-[#AAAAAA]">
              500MB 이하의 jpg, png 파일을 최대 5개 까지 등록할 수 있습니다.
            </p>
          )}
          <div className="w-full grid grid-flow-rows grid-cols-3 gap-4">
            {selectedImage.map((image) => (
              <div
                key={image.size + image.name}
                className="flex items-center justify-between gap-1 rounded-full text-sm border-2 border-black p-1"
              >
                <div className="truncate">{image.name}</div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(
                      selectedImage.filter((selected) => selected !== image),
                    );
                  }}
                >
                  <img
                    src="/svg/remove.svg"
                    alt="닫기"
                    className="w-3 min-w-3"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p />
            <input
              type="file"
              id="input-file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={onFileChange(setSelectedImage)}
              multiple
            />
            <label
              htmlFor="input-file"
              className="bg-light-green text-white w-8 aspect-square cursor-pointer rounded-md flex items-center justify-center"
            >
              <p className="relative bottom-[1px]">+</p>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <p>3. 선택한 위치에 대한 설명을 간단히 작성해 주세요.</p>
        <textarea
          className="w-full aspect-[5/2] border-2 border-light-green rounded-md p-2 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#AAAAAA] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#D9D9D9]"
          placeholder={
            selectedMethod === "new"
              ? "예) 스타벅스 정문 앞 오른쪽에 있어요."
              : "예 : 스타벅스 부산역점 입구 앞 도보에 쓰레기가 넘쳐납니다. 쓰레기통이 새롭게 설치되면 좋을것 같아요."
          }
          onChange={(e) => {
            explanation.current = e.target.value;
          }}
        />
      </div>
      <button
        type="button"
        className="bg-light-green text-white w-full p-2 rounded-md flex items-center justify-center"
      >
        요청하기
      </button>
    </div>
  );
}
