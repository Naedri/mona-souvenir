import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/favorites", "/account"];

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(
    request.cookies.get("better-auth.session_token")
  );

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites/:path*", "/account/:path*"]
};
