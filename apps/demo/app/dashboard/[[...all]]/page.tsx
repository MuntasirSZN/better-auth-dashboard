
import {
  Dashboard,
  Organizations,
  RouteManager,
  Theme,
  Users,
} from "better-auth-dashboard/react";

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

export default async ({ params }: { params: Promise<{ all: string }> }) => {
  return (
    <Dashboard theme={theme} params={params}>
      <Users />
      <Organizations />
      <RouteManager />
    </Dashboard>
  );
};
