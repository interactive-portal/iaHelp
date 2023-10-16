import type { JWT } from "next-auth/jwt";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(
  request: NextRequest & { nextauth: { token: JWT | null } },
  event: NextFetchEvent
) {
  const url = request.nextUrl.clone();

  if (
    url.pathname.includes(".") || // exclude all files in the public folder
    url.pathname.startsWith("/api") || // exclude all API routes
    url.pathname.startsWith("/login") || // exclude all login
    url.pathname.startsWith("/page") // page-ийг бас орхих хэрэгтэй.
  ) {
    return;
  }

  if (url.pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }
  // console.log("url :>> ", url);
  /* ------------------------------------------------------ */
  /*                   PREPARE HOSTOBJECT                   */
  /* ------------------------------------------------------ */

  return NextResponse.rewrite(url);
}

// Даваад ирээд энийг шалгаад, ажиллуулах ёстой.

// const staticSiteDomainList = ["cozy", "moto", "infor", "cloudnew"];
// const staticSiteSlugList = [
//   { slug: "product/detaaaa", query: "filterid" },
//   { slug: "product/detaaaass", query: "filterid" },
//   { slug: "product/detaaaassss", query: "filterid" },
//   { slug: "product/detail", query: "id" },
//   { slug: "products/detail11", query: "id" },
//   { slug: "checkoutcomplete", query: "id" },
//   { slug: "product/detasdsdaaass", query: "filterid" },
// ];
