"use client";
import {
  Building2,
  FileSliders,
  Home,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { RequiredComponents } from "../types";
import { useEffect, useState } from "react";

export const AppSidebar = ({
  components,
  path,
}: {
  components: RequiredComponents;
  path: string;
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
      title: "Users",
      url: `${path}/users`,
      icon: Users,
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
    {
      title: "Settings",
      url: `${path}/settings`,
      icon: Settings,
    },
  ];

  useEffect(() => {
    setPathname(typeof window !== "undefined" ? window.location.pathname : "")
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
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
};
