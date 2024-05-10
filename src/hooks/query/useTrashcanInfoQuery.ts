import { TrashCanInfo, TrashCanRequest } from "@/types/TrashInfo";
import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

export default function useTrashCanInfoQuery(info: TrashCanRequest | null) {
  return useQuery<TrashCanInfo[]>(queryInfo.trashcaninfo(info));
}
