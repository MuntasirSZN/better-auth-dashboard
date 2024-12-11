import { Building2 } from "lucide-react";
import type { Plugin } from "../../types";

export const organizations: () => Plugin = () => {
  // const component = <div>Hello from users plugin!</div>;

  return {
    icon: Building2,
    title: "Organizations",
    slug: "organizations",
    subItems: [],
  };
};
