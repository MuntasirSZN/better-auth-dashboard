import { Users as UsersIcon } from "lucide-react";
import type { Plugin } from "../../types";
import { UsersComponent } from "./UsersComponent";

export const users: () => Plugin = () => {
  return {
    icon: UsersIcon,
    title: "Users",
    slug: "users",
    component: UsersComponent,
  };
};
