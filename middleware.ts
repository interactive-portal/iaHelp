import type { JWT } from "next-auth/jwt";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prepareHostObjectMiddleware } from "./util/middlewareHelp";

export default async function middleware(
  request: NextRequest & { nextauth: { token: JWT | null } },
  event: NextFetchEvent
) {
  const url = request.nextUrl.clone();

  if (
    url.pathname.includes(".") || // exclude all files in the public folder
    url.pathname.startsWith("/api") || // exclude all API routes
    url.pathname.startsWith("/login") || // exclude all login
    url.pathname.startsWith("/category]") // page-ийг бас орхих хэрэгтэй.
  ) {
    return;
  }

  const hostObjectMiddleware = await prepareHostObjectMiddleware({
    hostname: request.headers.get("host") || "",
    pathname: url.pathname.substring(1),
  });

  // console.log("hostObjectMiddleware :>> ", hostObjectMiddleware);

  if (url.pathname.startsWith("./undefined")) {
    return new Response("/404", { status: 404 });
  }

  url.pathname = `/${hostObjectMiddleware.toDetectPath}`;

  if (url.pathname.startsWith("./undefined")) {
    return new Response("/home", { status: 404 });
  }
  return NextResponse.rewrite(url);
}
