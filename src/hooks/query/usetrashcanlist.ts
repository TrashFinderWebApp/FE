import { useQuery } from "@tanstack/react-query";
import { TrashCanStatus } from "@/types/trashinfo";
import { queryInfo } from "./query";

const useTrashcanListQuery = (
  page: number,
  status: TrashCanStatus,
  sort: "ASC" | "DESC" = "DESC",
) => {
  return useQuery(queryInfo.trashcanList(page, status, sort));
};

export default useTrashcanListQuery;
