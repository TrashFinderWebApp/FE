import { TrashCanInfo, TrashCanRequest } from "@/types/trashinfo";
import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

export default function useTrashCanInfoQuery(info: TrashCanRequest | null) {
  return useQuery<TrashCanInfo[]>(queryInfo.trashcaninfo(info));
}
