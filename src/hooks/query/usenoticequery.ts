import { useQuery } from "@tanstack/react-query";
import { queryInfo } from "./query";

export const NoticeTypeDict = {
  ALL: "전체",
  UPDATED: "업데이트",
  GENERAL: "일반",
  EVENT: "이벤트",
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

const useNoticeQuery = (page: number, notificationType: NoticeType) => {
  return useQuery<NoticePageResponse>(queryInfo.notice(page, notificationType));
};

export default useNoticeQuery;
