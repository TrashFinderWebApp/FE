/* eslint-disable no-unused-vars */
import { create } from "zustand";

interface KakaoState {
  isLoaded: boolean;
  isMapOpened: boolean;
  kakaoMap: any;
  kakaoRoadView: any;
  kakaoClusterer: any;
  geoCoder: any;
  keywordSearch: (
    keyword: string,
    callback: (data: any, status: any) => void,
  ) => void;
  roadViewClient: any;
}

interface KakaoActions {
  setIsMapOpened: (isMapOpened: boolean) => void;
  setKakaoMap: (map: any) => void;
  setKakaoClusterer: (clusterer: any) => void;
  setKeywordSearch: (keywordSearch: any) => void;
  setGeoCoder: (getCoder: any) => void;
  setKakakoRoadView: (roadView: any) => void;
  setRoadViewClient: (roadViewClient: any) => void;
  setCenter: (lat: number, lng: number) => void;
}

export const useKakaoStore = create<KakaoState & KakaoActions>((set) => ({
  isLoaded: false,
  kakaoMap: null,
  kakaoClusterer: null,
  geoCoder: null,
  kakaoRoadView: null,
  roadViewClient: null,
  isMapOpened: true,
  setIsMapOpened: (isMapOpened) => set({ isMapOpened }),
  setKakaoMap: (map) => set({ kakaoMap: map, isLoaded: true }),
  setGeoCoder: (getCoder) => set({ geoCoder: getCoder }),
  setKakaoClusterer: (clusterer) => set({ kakaoClusterer: clusterer }),
  keywordSearch: () => {},
  setKeywordSearch: (keywordSearch) => set({ keywordSearch }),
  setKakakoRoadView: (roadView) => set({ kakaoRoadView: roadView }),
  setRoadViewClient: (client) => set({ roadViewClient: client }),
  setCenter: (lat, lng) => {
    const center = new window.kakao.maps.LatLng(lat, lng);
    set((state) => {
      state.kakaoMap.setCenter(center);

      return state;
    });
  },
}));

export default useKakaoStore;
