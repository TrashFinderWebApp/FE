import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

const useMyRankingQuery = () => {
  return useQuery(queryInfo.myranking);
};

export default useMyRankingQuery;
