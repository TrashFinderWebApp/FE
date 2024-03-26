/* eslint-disable no-unused-vars */
import debounce from "@/components/util/debounce";
import { useCallback, useEffect, useState } from "react";

export default function useKeywordSearch(
  keyword: string,
  keywordSearch: (
    word: string,
    callback: (data: any, status: any, pagination?: any) => void,
  ) => void,
) {
  const [searchResult, setSearchResult] = useState<any>();

  const debouncedSearch = useCallback(debounce(keywordSearch, 500), []);

  useEffect(() => {
    if (keyword) {
      debouncedSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResult(data);
        }
      });
    } else {
      setSearchResult(null);
    }
  }, [keyword]);

  return searchResult;
}
