import { APIURL } from "@/util/const";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { NoticeResponse } from "../query/usenoticequery";

const useNoticeMutation = ({
  id,
  method = "POST",
}: {
  id?: string;
  method?: "POST" | "DELETE";
} = {}) => {
  const session = useSession();

  return useMutation({
    mutationFn: async (input: NoticeResponse) => {
      const res = await fetch(
        `${APIURL}/api/notification${id ? `/${id}` : "/"}`,
        {
          method: id ? "PATCH" : method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
          body: JSON.stringify(input),
        },
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onError: (e) => {
      alert(e);
    },
  });
};

export default useNoticeMutation;
