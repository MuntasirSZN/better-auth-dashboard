import type { BetterAuthPlugin } from "better-auth";
import {
  APIError,
  createAuthEndpoint,
  getSessionFromCtx,
} from "better-auth/api";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DashboardPluginConfig = {};

export const dashboardPluginWrapper = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: any[],
  config: DashboardPluginConfig = {}
) => {
  return plugins.concat(dashboardPlugin(config, { plugins }));
};

type InternalConfig = {
  plugins: BetterAuthPlugin[];
};

function dashboardPlugin(
  config: DashboardPluginConfig,
  internal_config: InternalConfig
) {
  if (!hasAdminPlugin(internal_config.plugins)) {
    const err = new Error(
      `Admin Dashboard: Missing admin plugin, please include the admin plugin to your server auth instance.`
    );
    err.stack = undefined;
    throw err;
  }

  const plugin: BetterAuthPlugin = {
    id: "admin-dashboard",
    schema: {
      routeProtection: {
        fields: {
          route: {
            type: "string",
            unique: true,
            required: true,
            input: true,
          },
          isRoleProtected: {
            type: "boolean",
            input: true,
            required: true,
          },
          roleProtection: {
            type: "string",
            input: true,
            required: true,
          },
          isAccAgeProtected: {
            type: "boolean",
            input: true,
            required: true,
          },
          accAgeProtection: {
            type: "date",
            input: true,
            required: true,
          },
          isAuthenticatedProtected: {
            type: "boolean",
            input: true,
            required: true,
          },
        },
      },
    },
    endpoints: {
      routeProtection: createAuthEndpoint(
        "/dashboard/route-protection",
        {
          method: "GET",
        },
        async (ctx) => {
          const session = await getSessionFromCtx(ctx);

          if (!session || session.user.role != "admin") {
            throw new APIError("UNAUTHORIZED", {
              message: `Invalid or missing session.`,
            });
          }

          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  };

  return plugin;
}

function hasAdminPlugin(plugins: BetterAuthPlugin[]) {
  return Boolean(plugins.find((x) => x.id === "admin"));
}
