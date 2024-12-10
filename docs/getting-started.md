# Getting Started

## Installation

```bash
npm i better-auth-dashboard
```

## Adding the plugin

As a bare minimum, better-auth-dashboard requires the [Admin plugin](https://www.better-auth.com/docs/plugins/admin).

In your auth file, wrap your plugins array with the `dashboardPluginWrapper` imported from `better-auth-dashboard`.

```ts
//...
import { dashboardPluginWrapper } from "better-auth-dashboard";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  //...
  plugins: dashboardPluginWrapper([admin()], {}),
});
```

## Configuring your middleware

We support route protection, by using our `dashboardMiddleware` function in combination with the `dashboardMather` we can allow you to configure and protect routes straight from the dashboard.

```ts
import { NextResponse } from "next/server";
import {
  dashboardMatcher,
  dashboardMiddleware,
} from "better-auth-dashboard/next";

export const middleware = dashboardMiddleware((request) => {
  // middleware code...
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Dashboard matcher
    ...dashboardMatcher(),
  ],
};
```