# Getting Started

## Installation

```bash
npm i better-auth-dashboard
```

## Adding the plugin

As a bare minimum, better-auth-dashboard requires the [Admin plugin](https://www.better-auth.com/docs/plugins/admin).

In your auth file, append the `dashboardPlugin` imported from `better-auth-dashboard` to your plugins array.

```ts
//...
import { dashboardPlugin } from "better-auth-dashboard";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  //...
  plugins: [admin(), dashboardPlugin()]
});
```

## Configuring your middleware

We support route protection, by using our `dashboardMiddleware` function we allow you to configure and protect routes straight from the dashboard.

```ts
//...
import {
  dashboardMatcher,
  dashboardMiddleware,
} from "better-auth-dashboard/next";

export const middleware = dashboardMiddleware((request) => {
  // middleware code...
  return NextResponse.next();
});

//...
```

## Setup ShadCN

We rely on ShadCN components to render the dashboard, this allows you to configure the components as you desire and even theme it with the rest of your app!

If you don't have ShadCN already, use their CLI to set things up:

```bash
npx shadcn@latest init -d
```

Then, install the required components:

```bash
npx shadcn@latest add sidebar collapsible table sheet select dialog label avatar
```

Lastly, we recommend you to create an `index.ts` file in the shadcn generated components folder, and export each component straight in the `index.ts` file.
Like so:

```ts
// From sidebar
export * from "./button";
export * from "./input";
export * from "./separator";
export * from "./sheet";
export * from "./sidebar";
export * from "./skeleton";
export * from "./tooltip";
// From collapsible
export * from "./collapsible";
// From table
export * from "./table";
// From select
export * from "./select";
// From dialog
export * from "./dialog";
// From label
export * from "./label";
// From avatar
export * from "./avatar";
```

## Creating your dashboard

Everything is pretty much set, the last thing is to add the routes to the dashboard and pass in our Dashboard component.

Create a file at:

```
/app/dashboard/[[...all]]/page.tsx
```

> You can make this be any route you want, just make sure if it's different to the one we showed above, it will require a little more configuration.

Within, go ahead and paste the following code:

```tsx
"use client";
import {
  Dashboard,
  organizations,
  routeProtection,
  users,
} from "better-auth-dashboard/react";
import * as components from "@/components/components/ui"; // that index.ts file you made for shadCn componentns.
import { authClient } from "lib/auth-client"; // your better-auth auth client.

export default ({ params }: { params: Promise<{ all: string }> }) => {
  return (
    <Dashboard
      params={params}
      components={components}
      authClient={authClient as any}
      plugins={[users(), organizations(), routeProtection()]}
    />
  );
};
```

> If the route to the dashboard is differnt than normal, you'll want to pass a `path` prop to the Dashboard, and write the relative path to the dashboard. (without trailing slashes)

## That's it!

Congradulations, that's all it takes to make yourself a powerful dynamic dashboard that works with Better auth.

Boot your dev server and enjoy.