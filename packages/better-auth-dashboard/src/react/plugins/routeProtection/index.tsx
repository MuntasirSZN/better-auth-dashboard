import { ShieldCheck } from "lucide-react";
import type { Plugin } from "../../types";

export const routeProtection: () => Plugin = () => {
  // const component = <div>Hello from users plugin!</div>;

  return {
    icon: ShieldCheck,
    title: "Route Protection",
    slug: "route-protection",
    subItems: [
      {
        title: "test",
        slug: "test",
      },
    ],
  };
};
