"use client";
import type { Plugin, RequiredComponents } from "../../../types";
import {
  memo,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type Item = {
  title: string;
  url: string;
  icon: Plugin["icon"];
  // subItems: {
  //   title: string;
  //   url: string;
  //   icon: Plugin["icon"];
  //   isActive: boolean;
  // }[];
  isActive: boolean;
  component: () => ReactNode;
};

export const AppSidebar = memo(
  ({
    components,
    items,
    setItems,
  }: {
    components: RequiredComponents;
    setItems: Dispatch<SetStateAction<Item[]>>;
    items: Item[];
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
      // Collapsible,
      // CollapsibleContent,
      // CollapsibleTrigger,
    } = components;

    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, i) => {
                  // if (item.subItems.length === 0) {
                  return (
                    <SidebarItem
                      SidebarMenuButton={SidebarMenuButton}
                      item={item}
                      SidebarMenuItem={SidebarMenuItem}
                      key={item.title + i}
                      setItemActive={() => {
                        setItems((z) => {
                          const currentActive = items.find((x) => x.isActive)!;

                          z[z.indexOf(currentActive)].isActive = false;
                          z[z.indexOf(item)].isActive = true;
                          return z;
                        });
                      }}
                    />
                  );
                  // } else {
                  //   return (
                  //     <Collapsible
                  //       key={item.title}
                  //       title={item.title}
                  //       className="group/collapsible"
                  //     >
                  //       <SidebarGroup className="p-0">
                  //         <SidebarGroupLabel
                  //           asChild
                  //           className="text-sm group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  //         >
                  //           <CollapsibleTrigger className="py-2 min-h-[35px]">
                  //             <div className="flex items-center w-full gap-2 h-5 [&>svg]:size-4">
                  //               <item.icon />
                  //               <span>{item.title}</span>
                  //               <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  //             </div>
                  //           </CollapsibleTrigger>
                  //         </SidebarGroupLabel>
                  //         <CollapsibleContent>
                  //           <SidebarGroupContent>
                  //             <SidebarMenu className="pl-2 mt-1">
                  //               {item.subItems.map((item) => (
                  //                 <SidebarMenuItem key={item.title}>
                  //                   <SidebarMenuButton
                  //                     asChild
                  //                     isActive={item.isActive}
                  //                     onClick={() => {
                  //                       window.history.pushState(
                  //                         item.title,
                  //                         item.title,
                  //                         item.url
                  //                       );
                  //                       setItems((z) => {
                  //                         const currentActive = items.find(
                  //                           (x) => x.isActive
                  //                         )!;

                  //                         z[z.indexOf(currentActive)].isActive =
                  //                           false;
                  //                         z[z.indexOf(item)].isActive = true;
                  //                         return z;
                  //                       });
                  //                     }}
                  //                   >
                  //                     <div>
                  //                       <item.icon />
                  //                       <span>{item.title}</span>
                  //                     </div>
                  //                   </SidebarMenuButton>
                  //                 </SidebarMenuItem>
                  //               ))}
                  //             </SidebarMenu>
                  //           </SidebarGroupContent>
                  //         </CollapsibleContent>
                  //       </SidebarGroup>
                  //     </Collapsible>
                  //   );
                  // }
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
