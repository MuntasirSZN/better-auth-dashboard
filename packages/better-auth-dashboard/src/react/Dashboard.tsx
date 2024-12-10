import type { ReactNode } from "react";

type DashboardConfig = {
  components: ReactNode[];
};

export const createDashboard = (
  dashboardConfig: DashboardConfig = { components: [] }
) => {
  return async ({ params }: { params: Promise<{ all: string }> }) => {
    return <h1>My Page {JSON.stringify((await params).all)}</h1>;
  };
};
