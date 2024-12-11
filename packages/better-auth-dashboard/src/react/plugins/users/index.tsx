import { Users as UsersIcon } from "lucide-react";
import type { Plugin } from "../../types";

export const Users: () => Plugin = () => {
  // const component = <div>Hello from users plugin!</div>;

  return {
    icon: UsersIcon,
    title: "Users",
    slug: "users",
  };
};
