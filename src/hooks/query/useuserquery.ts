import { useInfiniteQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

const useUserQuery = (searchQuery?: string) => {
  return useInfiniteQuery(queryInfo.user(searchQuery));
};

export default useUserQuery;
