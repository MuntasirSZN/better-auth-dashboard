"use client";
import {
  Building2,
  FileSliders,
  Home,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
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
        title: "Organizations",
        url: `${path}/organizations`,
        icon: Building2,
      },
      {
        title: "Route protection",
        url: `${path}/route-protection`,
        icon: ShieldCheck,
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
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
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
