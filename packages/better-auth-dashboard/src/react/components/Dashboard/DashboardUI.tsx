"use client";

import { memo, useEffect, useState } from "react";
import { AppSidebar, type Item } from "./AppSidebar";
import type { DashboardProps } from "./Dashboard";
import { Home } from "lucide-react";

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
    const [items, setItems] = useState<Item[]>([
      {
        title: "Home",
        url: `${path}`,
        icon: Home,
        isActive: false,
        component() {
          return <h1>welcome to the dashboard home tab.</h1>;
        },
      },
      // {
      //   title: "Search",
      //   url: `${path}/search`,
      //   icon: Search,
      // },
      ...plugins.map((x) => ({
        title: x.title,
        url: `${path}/${x.slug}`,
        isActive: false,
        icon: x.icon,
        component: () => <x.component components={components} />,
      })),
      // {
      //   title: "Settings",
      //   url: `${path}/settings`,
      //   icon: Settings,
      // },
    ]);

    useEffect(() => {
      const pathname = window.location.pathname;
      const found = items.find((x) => x.url === pathname);
      if (found) {
        setItems((x) => {
          x[x.indexOf(found)].isActive = true;
          return x;
        });
      }
    }, []);

    return (
      <>
        <AppSidebar components={components} setItems={setItems} items={items} />
        <main className="w-full h-screen relatvie">
          <components.SidebarTrigger className="absolute -ml-8 bottom-1" />
          {items.find((x) => x.isActive)?.component()}
        </main>
      </>
    );
  }
);
