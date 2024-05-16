import { cookies } from "next/headers";

const setRefreshTokenCookie = async (res: Response) => {
  const resCookie = res.headers.getSetCookie();
  console.log(resCookie);
  if (!resCookie || !resCookie.length) return;
  const cookie = resCookie[0]
    .split(";")
    .map((item) => item.split("="))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = value;
      return acc;
    }, {} as any);
  cookies().set("RefreshToken", cookie.RefreshToken, { secure: true });
};

export default setRefreshTokenCookie;
