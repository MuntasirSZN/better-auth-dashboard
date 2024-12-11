import { FileSliders } from "lucide-react";
import type { Plugin } from "../../types";

export const pluginConfiguration: () => Plugin = () => {
  // const component = <div>Hello from users plugin!</div>;

  return {
    icon: FileSliders,
    title: "Plugin Configurations",
    slug: "plugin-config",
    subItems: []
  };
};
