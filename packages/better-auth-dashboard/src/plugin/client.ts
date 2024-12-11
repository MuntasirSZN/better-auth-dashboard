import type { BetterAuthClientPlugin } from "better-auth/client";
import type { DashboardPlugin } from "./server";
import type { BetterFetchOption } from "@better-fetch/fetch";

export const dashboardClientPlugin = () =>
  ({
    id: "better-auth-dashboard",
    $InferServerPlugin: {} as ReturnType<DashboardPlugin>,
    getActions: ($fetch) => {
      return {
        getEndpoints: async (fetchOptions?: BetterFetchOption) => {
          const res = $fetch("/dashboard/get-endpoints", {
            method: "GET",
            ...fetchOptions,
          });
          return res;
        },
      };
    },
  }) satisfies BetterAuthClientPlugin;
