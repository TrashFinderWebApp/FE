import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

export const NoticeTypeDict = {
  all: "전체",
  updated: "업데이트",
  general: "일반",
  event: "이벤트",
};
export type NoticeType = keyof typeof NoticeTypeDict;

export interface NoticeResponse {
  title: string;
  description: string;
  createdAt: string;
  state: string;
}

export interface NoticePageResponse {
  notificationInfoList: NoticeResponse[];
  totalPage: number;
}

const useNoticeQuery = (page: number) => {
  return useQuery<NoticePageResponse>(queryInfo.notice(page));
};

export default useNoticeQuery;
