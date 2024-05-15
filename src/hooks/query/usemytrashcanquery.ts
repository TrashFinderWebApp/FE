import { useInfiniteQuery } from "@tanstack/react-query";
import useIntersectionObserver from "../animation/useintersectionobserver";
import { infiniteQueryInfo } from "./query";

const useMyTrashcanQuery = (type: "REGISTRATION" | "SUGGESTION") => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    infiniteQueryInfo.mytrashcan(type),
  );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { data, setTarget, status };
};

export default useMyTrashcanQuery;
