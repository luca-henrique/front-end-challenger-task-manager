import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "dashboard"];

export function middleware(request: NextRequest, response: NextResponse) {
  // const accessToken = request.cookies.get("accessToken");
  // const refreshToken = request.cookies.get("refreshToken");

  // console.log(request, response);

  // if (publicPaths.includes(request.nextUrl.pathname)) {
  //   return NextResponse.next();
  // }

  // if (!accessToken && !refreshToken) {
  //   const url = new URL("/dashboard", request.url);
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
