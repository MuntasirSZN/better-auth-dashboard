import { Home, ShieldCheck } from "lucide-react";
import type { Plugin } from "../../types";

export const routeProtection: () => Plugin = () => {
  const component = () => <div>Hello from routeProtection plugin!</div>;
  const componentTest = () => (
    <div>Hello from routeProtection-test plugin!</div>
  );

  return {
    icon: ShieldCheck,
    title: "Route Protection",
    slug: "route-protection",
    component: component,
    subItems: [
      {
        title: "test",
        slug: "test",
        icon: Home,
        component: componentTest,
      },
    ],
  };
};
