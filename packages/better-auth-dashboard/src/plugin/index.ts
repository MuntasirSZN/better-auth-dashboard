import type { BetterAuthPlugin } from "better-auth";
import {
  APIError,
  createAuthEndpoint,
  getSessionFromCtx,
} from "better-auth/api";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type DashboardPluginConfig = {};

export const dashboardPluginWrapper = (
  plugins: BetterAuthPlugin[],
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
    throw new Error(
      `Admin Dashboard: Missing admin plugin, please include the admin plugin to your server auth instance.`
    );
  }

  const plugin: BetterAuthPlugin = {
    id: "admin-dashboard",
    endpoints: {
      getHelloWorld: createAuthEndpoint(
        "/admin-dash/",
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
