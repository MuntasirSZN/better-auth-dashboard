"use client";
import { memo, useContext, useState, type ReactNode } from "react";
import type { Plugin, RequiredComponents } from "../../types";
import { AppSidebar } from "./AppSidebar";
import { dashboardContext } from "./dashboardContext";

export type DashboardProps = {
  /**
   * Dashboard plugins
   */
  children: ReactNode[] | ReactNode;
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
};

const MemoedChildren = memo(
  ({ children }: { children: DashboardProps["children"] }) => {
    return (
      <>
        {Array.isArray(children)
          ? children.map((x, i) => <div key={i}>{x}</div>)
          : children}
      </>
    );
  }
);

export const Dashboard = memo(
  ({ components, path = "/dashboard", children }: DashboardProps) => {
    const [plugins, setPlugins] = useState<Plugin[]>([]);

    return (
      <dashboardContext.Provider
        value={{
          initPlugin(plugin) {
            setPlugins((x) => [...x, plugin]);
          },
        }}
      >
        <components.SidebarProvider>
          <AppSidebar components={components} path={path} plugins={plugins} />
          <main>
            <components.SidebarTrigger />
            <MemoedChildren>{children}</MemoedChildren>
          </main>
        </components.SidebarProvider>
      </dashboardContext.Provider>
    );
  }
);
Dashboard.displayName = `Dashboard`;

export const useDashboard = () => {
  const ctx = useContext(dashboardContext);
  if (!ctx) {
    throw new Error(
      `The useDashboard hook must be used in as a child of <Dashboard>.`
    );
  }

  return ctx;
};
