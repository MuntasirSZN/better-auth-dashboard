import { memo } from "react";
import type { Plugin, RequiredComponents } from "../../types";
import { AppSidebar } from "./AppSidebar";
import { dashboardContext } from "./dashboardContext";
import type { createAuthClient } from "better-auth/react";

export type DashboardProps = {
  /**
   * ShadCN components required to render the dashboard.
   */
  components: RequiredComponents;
  /**
   * URL slug params.
   */
  params: Promise<{ all: string }>;
  /**
   * Relative URL path that leads to this dashboard.
   */
  path?: string;
  /**
   * List of dashboard plugins.
   */
  plugins: Plugin[];
  /**
   * Your Better-Auth client auth instance.
   */
  authClient: ReturnType<typeof createAuthClient>;
};

export const Dashboard = memo(
  ({ components, path = "/dashboard", plugins }: DashboardProps) => {
    return (
      <dashboardContext.Provider value={{}}>
        <components.SidebarProvider>
          <AppSidebar components={components} path={path} plugins={plugins} />
          <main className="w-full h-screen relatvie">
            <components.SidebarTrigger className="absolute" />
          </main>
        </components.SidebarProvider>
      </dashboardContext.Provider>
    );
  }
);
Dashboard.displayName = `Dashboard`;
