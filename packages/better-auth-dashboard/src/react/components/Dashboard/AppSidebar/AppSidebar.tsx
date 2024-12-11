"use client";
import { ChevronRight, Home } from "lucide-react";
// import { Search, Settings  } from "lucide-react";
import type { Plugin, RequiredComponents } from "../../../types";
import { memo, useEffect, useState } from "react";

type Item = {
  title: string;
  url: string;
  icon: Plugin["icon"];
  subItems: { title: string; url: string; icon: Plugin["icon"] }[];
};

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
      Collapsible,
      CollapsibleContent,
      CollapsibleTrigger,
    } = components;

    const items: Item[] = [
      {
        title: "Home",
        url: `${path}`,
        icon: Home,
        subItems: [],
      },
      // {
      //   title: "Search",
      //   url: `${path}/search`,
      //   icon: Search,
      // },
      ...plugins.map((x) => ({
        title: x.title,
        url: `${path}/${x.slug}`,
        icon: x.icon,
        subItems: x.subItems.map((z) => ({
          title: z.title,
          url: `${path}/${x.slug}/${z.slug}`,
          icon: z.icon,
        })),
      })),
      // {
      //   title: "Settings",
      //   url: `${path}/settings`,
      //   icon: Settings,
      // },
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
                  if (item.subItems.length === 0) {
                    return (
                      <SidebarItem
                        SidebarMenuButton={SidebarMenuButton}
                        item={item}
                        pathname={pathname}
                        setPathname={setPathname}
                        SidebarMenuItem={SidebarMenuItem}
                        key={item.title + i}
                      />
                    );
                  } else {
                    return (
                      <Collapsible
                        key={item.title}
                        title={item.title}
                        className="group/collapsible"
                      >
                        <SidebarGroup className="p-0">
                          <SidebarGroupLabel
                            asChild
                            className="text-sm group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          >
                            <CollapsibleTrigger className="py-2 min-h-[35px]">
                              <div className="flex items-center w-full gap-2 h-5 [&>svg]:size-4">
                                <item.icon />
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                              </div>
                            </CollapsibleTrigger>
                          </SidebarGroupLabel>
                          <CollapsibleContent>
                            <SidebarGroupContent>
                              <SidebarMenu className="pl-2 mt-1">
                                {item.subItems.map((item) => (
                                  <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                      asChild
                                      isActive={pathname === item.url}
                                      onClick={() => {
                                        window.history.pushState(
                                          item.title,
                                          item.title,
                                          item.url
                                        );
                                        setPathname(item.url);
                                      }}
                                    >
                                      <div>
                                        <item.icon />
                                        <span>{item.title}</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                ))}
                              </SidebarMenu>
                            </SidebarGroupContent>
                          </CollapsibleContent>
                        </SidebarGroup>
                      </Collapsible>
                    );
                  }
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

function SidebarItem({
  SidebarMenuButton,
  SidebarMenuItem,
  item,
  pathname,
  setPathname,
}: {
  item: Item;
  pathname: string;
  setPathname: (path: string) => void;
  SidebarMenuItem: RequiredComponents["SidebarMenuItem"];
  SidebarMenuButton: RequiredComponents["SidebarMenuButton"];
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.url}
        suppressHydrationWarning
        onClick={() => {
          window.history.pushState(item.title, item.title, item.url);
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
}
