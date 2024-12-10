import {
  Dashboard,
  Organizations,
  RouteManager,
  Theme,
  Users,
} from "better-auth-dashboard/react";
import * as components from "@/components/components/ui";

const theme: Theme = {
  name: "some_theme_name",
  scheme: "dark",
  background: "",
  content1: "",
  content2: "",
  content3: "",
  content4: "",
  default: "",
  primary: "",
  secondary: "",
};
components.SidebarGroup;

export default async ({ params }: { params: Promise<{ all: string }> }) => {
  return (
    <Dashboard
      theme={theme}
      params={params}
      components={components}
    >
      <Users />
      <Organizations />
      <RouteManager />
    </Dashboard>
  );
};
