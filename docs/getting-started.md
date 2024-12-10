# Getting Started

## Installation

```bash
npm i better-auth-dashboard
```

## Adding the plugin

Head to your auth file, and follow this example:
```ts
//...
import { dashboardPluginWrapper } from "better-auth-dashboard";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  //...
  plugins: dashboardPluginWrapper([admin()], {}),
});
```