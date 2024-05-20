import { useQuery } from "@tanstack/react-query";
import { TrashCanInfo } from "@/types/trashinfo";
import { queryInfo } from "./query";

export default function useTrashcanInfoByIdQuery(id: string) {
  return useQuery<TrashCanInfo>(queryInfo.trashcaninfobyid(id));
}
