import { memo } from "react";
import type { Plugin, RequiredComponents } from "../../types";
import { dashboardContext } from "./dashboardContext";
import { DashboardUI } from "./DashboardUI";

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
};

export const Dashboard = memo(
  ({ components, path = "/dashboard", plugins }: DashboardProps) => {
    return (
      <dashboardContext.Provider value={{}}>
        <components.SidebarProvider>
          <DashboardUI components={components} path={path} plugins={plugins} />
        </components.SidebarProvider>
      </dashboardContext.Provider>
    );
  }
);
Dashboard.displayName = `Dashboard`;
