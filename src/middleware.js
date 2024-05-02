import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = ["/login", "/signup"].includes(path);
  const token = request.cookies.get("token")?.value || "";

  if (path === "/" || (isPublic && token)) {
    // Allow access to the home page for all users
    return null;
  }

  if (isPublic && token) {
    // Redirect authenticated users away from public pages
    return NextResponse.redirect(new URL("/", request.url).toString());
  }

  if (!isPublic && !token) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL("/login", request.url).toString());
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
