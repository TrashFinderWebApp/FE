import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

const useMyRankingQuery = (accessToken?: string) => {
  return useQuery(queryInfo.myranking(accessToken));
};

export default useMyRankingQuery;
