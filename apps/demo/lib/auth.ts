import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db";
import { dashboardPlugin } from "better-auth-dashboard";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  appName: "admin-dashboard-demo",
  plugins: [admin(), dashboardPlugin(), nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  baseURL: "http://localhost:3000"
});
