import { useInfiniteQuery } from "@tanstack/react-query";
import useIntersectionObserver from "../animation/useintersectionobserver";
import { infiniteQueryInfo } from "./query";

const useRankingQuery = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    infiniteQueryInfo.ranking,
  );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { data, setTarget };
};

export default useRankingQuery;
