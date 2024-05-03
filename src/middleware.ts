import { getToken } from "next-auth/jwt";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret: process.env.AUTH_KEY });

  switch (pathname) {
    case "/admin":
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.next();
    default: {
      const { device } = userAgent(request);

      if (device.type === "mobile") {
        return NextResponse.rewrite(
          new URL(`/mobile${request.nextUrl.pathname}`, request.url),
        );
      }

      return NextResponse.next();
    }
  }
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
