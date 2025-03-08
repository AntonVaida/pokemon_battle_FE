import { NextResponse } from "next/server";

const protectedPath = ['game']

export async function middleware(req) {
  const { nextUrl } = req;
  const redirectedUrl = nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken");

  if (redirectedUrl === "/" && !accessToken) {
    return NextResponse.redirect(new URL("/pokemon", req.url));
  }

  console.log("middleware", {
    accessToken,
    check: protectedPath.some(path => redirectedUrl.includes(path)),
    protectedPath
  })
  // if (!accessToken && protectedPath.some(path => redirectedUrl.includes(path))) {
  //   const url = new URL("/pokemon", req.url);
  //   url.searchParams.set("afterGamePage", true);
    
  //   return NextResponse.redirect(url);
  // }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], 
};