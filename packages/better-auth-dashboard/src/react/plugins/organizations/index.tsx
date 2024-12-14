import { Building2 } from "lucide-react";
import type { Plugin, RequiredComponents } from "../../types";
import { memo } from "react";

export const organizations: () => Plugin = () => {
  return {
    icon: Building2,
    title: "Organizations",
    slug: "organizations",
    component: OrgComponent,
  };
};

const OrgComponent = memo(
  ({ components }: { components: RequiredComponents }) => {
    return (
      <div>
        hello from orgs plugin!
        <components.Button>Hello!</components.Button>
      </div>
    );
  }
);
