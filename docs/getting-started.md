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