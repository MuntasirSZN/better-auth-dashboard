import {
  Building2,
  Home,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { RequiredComponents } from "../types";

export const AppSidebar = ({
  components,
  path,
}: {
  components: RequiredComponents;
  path: string;
}) => {
  const {
    SidebarProvider,
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
      title: "Settings",
      url: `${path}/settings`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
