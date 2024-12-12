"use client";

import { memo, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import type { DashboardProps } from "./Dashboard";
import type { Plugin } from "../../types";

export const DashboardUI = memo(
  ({
    components,
    path,
    plugins,
  }: {
    components: DashboardProps["components"];
    path: string;
    plugins: DashboardProps["plugins"];
  }) => {
    const [pathname, setPathname] = useState("");
    const [activeItem, setActiveItem] = useState<Plugin|null>(null);

    return (
      <>
        <AppSidebar
          components={components}
          path={path}
          plugins={plugins}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <main className="w-full h-screen relatvie">
          <components.SidebarTrigger className="absolute" />
          {activePluginComponent ? activePluginComponent.component() : null}
        </main>
      </>
    );
  }
);
