
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "advising-notes/:path*",
    "appointments/:path*",
    "availability/:path*",
    "/dashboard/:path*",
    "degree-progress/:path*",
    "messages-resources/:path*",
    "/students/:path*",
    "/advisor/:path*",
    "/admin/:path*",
    "/user/:path*",
  ],
};
