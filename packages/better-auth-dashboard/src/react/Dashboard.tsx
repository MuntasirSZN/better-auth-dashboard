import type { ReactNode } from "react";
import type { RequiredComponents, Theme } from "./types";
import { AppSidebar } from "./components/AppSidebar";

export type DashboardProps = {
  /**
   * Dashboard plugins
   */
  children: ReactNode[];
  /**
   * ShadCN components required to render the dashboard.
   */
  components: RequiredComponents;
  /**
   * Custom theme configuration.
   */
  theme?: Theme;
  /**
   * URL slug params.
   */
  params: Promise<{ all: string }>;
  /**
   * Relative URL path that leads to this dashboard.
   */
  path?: string;
};

export const Dashboard = ({
  components,
  path = "/dashboard",
}: DashboardProps) => {
  return (
    <components.SidebarProvider>
      <AppSidebar components={components} path={path} />
      <main>
        <components.SidebarTrigger />
      </main>
    </components.SidebarProvider>
  );
};
