import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

const useReportsQuery = (page: number) => {
  return useQuery(queryInfo.reportList(page));
};

export default useReportsQuery;
