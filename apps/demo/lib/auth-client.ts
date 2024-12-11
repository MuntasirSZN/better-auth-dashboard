import { dashboardClientPlugin } from "better-auth-dashboard";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plguns: [dashboardClientPlugin],
});
