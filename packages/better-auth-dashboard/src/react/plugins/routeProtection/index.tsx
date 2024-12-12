import { ShieldCheck } from "lucide-react";
import type { Plugin } from "../../types";

export const routeProtection: () => Plugin = () => {
  const component = () => <div>Hello from routeProtection plugin!</div>;

  return {
    icon: ShieldCheck,
    title: "Route Protection",
    slug: "route-protection",
    component: component,
  };
};
