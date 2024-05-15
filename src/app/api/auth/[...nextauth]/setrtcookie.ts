import { cookies } from "next/headers";

const setRefreshTokenCookie = async (res: Response) => {
  const resCookie = res.headers.getSetCookie();
  if (!resCookie || !resCookie.length) return;
  const cookie = resCookie[0]
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = value;
      return acc;
    }, {} as any);
  cookies().delete("RefreshToken");
  cookies().set("RefreshToken", cookie.RefreshToken);
};

export default setRefreshTokenCookie;
