import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

const useMyTrashcanQuery = (accessToken?: string) => {
  return useQuery(queryInfo.mytrashcan(accessToken));
};

export default useMyTrashcanQuery;
