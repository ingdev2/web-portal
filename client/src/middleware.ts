export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard_admin/:path*"],
};
