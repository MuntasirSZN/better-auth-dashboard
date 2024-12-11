"use client";
import {
  Dashboard,
  organizations,
  routeProtection,
  users,
  pluginConfiguration,
} from "better-auth-dashboard/react";
import * as components from "@/components/components/ui";
import { authClient } from "lib/auth-client";

export default ({ params }: { params: Promise<{ all: string }> }) => {
  return (
    <Dashboard
      params={params}
      components={components}
      plugins={[
        users(),
        organizations(),
        routeProtection(),
        pluginConfiguration(),
      ]}
      authClient={authClient}
    />
  );
};


