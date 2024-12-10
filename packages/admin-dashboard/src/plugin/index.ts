import type { BetterAuthPlugin } from "better-auth";
import {
  APIError,
  createAuthEndpoint,
  getSessionFromCtx,
} from "better-auth/api";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type AdminDashboardPluginConfig = {};

export const adminDashboardPlugin = (
  plugins: BetterAuthPlugin[],
  config: AdminDashboardPluginConfig = {}
) => {
  return plugins.concat(adminDashboardPlugin_internal(config, { plugins }));
};

type InternalConfig = {
  plugins: BetterAuthPlugin[];
};

function adminDashboardPlugin_internal(
  config: AdminDashboardPluginConfig,
  internal_config: InternalConfig
) {
  if (!hasAdminPlugin(internal_config.plugins)) {
    throw console.error(
      `Admin Dashboard: Missing admin plugin.\nPlease include the admin plugin to your server auth instance.`
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
