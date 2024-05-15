export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/:path*",
    "/patient/homepage",
    "/patient/create_request",
    "/eps/homepage",
  ],
};
