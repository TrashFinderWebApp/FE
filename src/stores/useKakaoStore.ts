/* eslint-disable no-unused-vars */
import { create } from "zustand";

interface KakaoState {
  isLoaded: boolean;
  kakaoMap: any;
  kakaoClusterer: any;
  keywordSearch: (
    keyword: string,
    callback: (data: any, status: any) => void,
  ) => void;
}

interface KakaoActions {
  setKakaoMap: (map: any) => void;
  setKakaoClusterer: (clusterer: any) => void;
  setKeywordSearch: (keywordSearch: any) => void;
}

export const useKakaoStore = create<KakaoState & KakaoActions>((set) => ({
  isLoaded: false,
  kakaoMap: null,
  setKakaoMap: (map) => set({ kakaoMap: map, isLoaded: true }),
  kakaoClusterer: null,
  setKakaoClusterer: (clusterer) => set({ kakaoClusterer: clusterer }),
  keywordSearch: () => {},
  setKeywordSearch: (keywordSearch) => set({ keywordSearch }),
}));

export default useKakaoStore;
