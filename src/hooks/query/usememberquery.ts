import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

const useMemberQuery = (page: number, name?: string) => {
  return useQuery(queryInfo.memberList(page, name));
};

export default useMemberQuery;
