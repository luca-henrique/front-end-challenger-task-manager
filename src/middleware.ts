import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token && publicPaths.includes(request.nextUrl.pathname)) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
