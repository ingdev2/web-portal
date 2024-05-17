export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/:path*",
    "/patient/homepage/:path*",
    "/eps/homepage/:path*",
  ],
};
