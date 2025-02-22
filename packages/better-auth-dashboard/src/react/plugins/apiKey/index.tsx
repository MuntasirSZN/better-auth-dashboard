import { KeyRound } from "lucide-react";
import type { Plugin, RequiredComponents } from "../../types";
import { memo } from "react";

export const apiKey: () => Plugin = () => {
  return {
    icon: KeyRound,
    title: "API Key",
    slug: "api-key",
    component: Component,
  };
};

const Component = memo(({ components }: { components: RequiredComponents }) => {
  return (
    <div>
      hello from API Key plugin!
      <components.Button>Hello!</components.Button>
    </div>
  );
});
