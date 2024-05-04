import { useInfiniteQuery } from "@tanstack/react-query";
import { APIURL } from "@/util/const";
import useIntersectionObserver from "../animation/useIntersectionObserver";

const useRankingQuery = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["ranking"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${APIURL}/api/rank/list?startIndex=${pageParam}&endIndex=${pageParam + 9}`,
      );
      const result = await response.json();
      return result;
    },
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage?.message || lastPage?.length < 10) {
        return undefined;
      }
      return allPage.length * 10 + 1;
    },
    initialPageParam: 1,
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { data, setTarget };
};

export default useRankingQuery;
