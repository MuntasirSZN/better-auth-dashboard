import { ShieldCheck } from "lucide-react";
import type { Plugin, RequiredComponents } from "../../types";
import { memo } from "react";

export const routeProtection: () => Plugin = () => {
  return {
    icon: ShieldCheck,
    title: "Route Protection",
    slug: "route-protection",
    component: Component,
  };
};

const Component = memo(({ components }: { components: RequiredComponents }) => {
  return (
    <div>
      hello from route protection plugin!
      <components.Button>Hello!</components.Button>
    </div>
  );
});
