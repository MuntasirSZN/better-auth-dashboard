"use client";
import { ChevronRight, Home } from "lucide-react";
import type { Plugin, RequiredComponents } from "../../../types";
import { memo, useEffect, useState } from "react";

type Item = {
  title: string;
  url: string;
  icon: Plugin["icon"];
  subItems: {
    title: string;
    url: string;
    icon: Plugin["icon"];
    isActive: boolean;
  }[];
  isActive: boolean;
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

    const [items, setItems] = useState<Item[]>([
      {
        title: "Home",
        url: `${path}`,
        icon: Home,
        subItems: [],
        isActive: false,
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
        subItems: x.subItems.map((z) => ({
          title: z.title,
          url: `${path}/${x.slug}/${z.slug}`,
          icon: z.icon,
          isActive: false,
        })),
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
        setItems((x) => [
          ...x.filter((z) => z.url !== pathname),
          { ...found, isActive: true },
        ]);
      } else {
        const found = items.find((x) =>
          x.subItems.find((x) => x.url === pathname)
        );
        if (found) {
          setItems((x) => [
            ...x.filter((z, i) => i === x.indexOf(found)),
            {
              ...found,
              isActive: true,
              subItems: [
                ...found.subItems.filter((x) => x.url !== pathname),
                {
                  ...found.subItems.find((x) => x.url === pathname)!,
                  isActive: true,
                },
              ],
            },
          ]);
        }
      }
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
                        SidebarMenuItem={SidebarMenuItem}
                        key={item.title + i}
                        setItemActive={() => {
                          setItems((z) => {
                            const currentActive = items.find(
                              (x) => x.isActive
                            )!;

                            z[z.indexOf(currentActive)].isActive = false;
                            z[z.indexOf(item)].isActive = true;
                            return z;
                          });
                        }}
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
                                      isActive={item.isActive}
                                      onClick={() => {
                                        window.history.pushState(
                                          item.title,
                                          item.title,
                                          item.url
                                        );
                                        setItems((z) => {
                                          const currentActive = items.find(
                                            (x) => x.isActive
                                          )!;

                                          z[z.indexOf(currentActive)].isActive =
                                            false;
                                          z[z.indexOf(item)].isActive = true;
                                          return z;
                                        });
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
  setItemActive,
}: {
  item: Item;
  setItemActive: () => void;
  SidebarMenuItem: RequiredComponents["SidebarMenuItem"];
  SidebarMenuButton: RequiredComponents["SidebarMenuButton"];
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={item.isActive}
        suppressHydrationWarning
        onClick={() => {
          window.history.pushState(item.title, item.title, item.url);
          setItemActive();
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
