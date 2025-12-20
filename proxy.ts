import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const publicPaths = ["/login", "/signin"];
  const url = new URL(request.url);
  const origin = url.origin;
  const urlpathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', urlpathname);
  const headers: {
    request: {
      headers: Headers;
    };
  } = {
    request: {
      headers: requestHeaders,
    }
  };

  if (publicPaths.includes(pathname) && !token) {
    return NextResponse.next(headers);
  }

  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const resp = NextResponse.redirect(new URL("/login", request.url));
      resp.cookies.delete("token");
      return resp;
    }
  } catch (e) {
    const resp = NextResponse.redirect(new URL("/login", request.url));
    resp.cookies.delete("token");
    return resp;
  }

  return NextResponse.next(headers);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
