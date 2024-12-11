"use client";
import { FileSliders, Home, Search, Settings } from "lucide-react";
import type { Plugin, RequiredComponents } from "../../../types";
import { memo, useEffect, useState } from "react";

export const AppSidebar = memo(
  ({
    components,
    path,
    plugins,
  }: {
    components: RequiredComponents;
    path: string;
    plugins: Plugin[];
  }) => {
    const [pathname, setPathname] = useState("");
    const {
      Sidebar,
      SidebarContent,
      SidebarGroup,
      SidebarGroupLabel,
      SidebarGroupContent,
      SidebarMenu,
      SidebarMenuButton,
      SidebarMenuItem,
    } = components;

    const items = [
      {
        title: "Home",
        url: `${path}`,
        icon: Home,
      },
      {
        title: "Search",
        url: `${path}/search`,
        icon: Search,
      },
      {
        title: "Plugin Configuration",
        url: `${path}/plugin-config`,
        icon: FileSliders,
      },
      ...plugins.map((x) => ({
        title: x.title,
        url: `${path}/${x.slug}`,
        icon: x.icon,
      })),
      {
        title: "Settings",
        url: `${path}/settings`,
        icon: Settings,
      },
    ];

    useEffect(() => {
      setPathname(
        typeof window !== "undefined" ? window.location.pathname : ""
      );
    }, []);

    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, i) => {
                  return (
                    <SidebarMenuItem key={item.title + i}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        suppressHydrationWarning
                        onClick={() => {
                          window.history.pushState(
                            item.title,
                            item.title,
                            item.url
                          );
                          setPathname(item.url);
                        }}
                        className="cursor-pointer select-none"
                      >
                        <div className="w-full h-full">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
);
AppSidebar.displayName = `AppSidebar`;
