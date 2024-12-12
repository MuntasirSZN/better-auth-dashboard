import { Users as UsersIcon } from "lucide-react";
import type { Plugin } from "../../types";

export const users: () => Plugin = () => {
  const component = () => <div>Hello from users plugin!</div>;

  return {
    icon: UsersIcon,
    title: "Users",
    slug: "users",
    subItems: [],
    component: component,
  };
};
