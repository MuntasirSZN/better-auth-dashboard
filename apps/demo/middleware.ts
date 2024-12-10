import { NextResponse } from "next/server";
import {
  dashboardMatcher,
  dashboardMiddleware,
} from "better-auth-dashboard/next";

export const middleware = dashboardMiddleware((request) => {
  return NextResponse.redirect(new URL("/home", request.url));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Dashboard matcher
    dashboardMatcher(),
  ],
};
