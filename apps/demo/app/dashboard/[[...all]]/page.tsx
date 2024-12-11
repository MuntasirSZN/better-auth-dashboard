"use client";
import { Dashboard, Users } from "better-auth-dashboard/react";
import * as components from "@/components/components/ui";

export default ({ params }: { params: Promise<{ all: string }> }) => {
  return (
    <Dashboard params={params} components={components} plugins={[Users()]} />
  );
};
{
  /* <Organizations /> */
}
{
  /* <RouteManager /> */
}
