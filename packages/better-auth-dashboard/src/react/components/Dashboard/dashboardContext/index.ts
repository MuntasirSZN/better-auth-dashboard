import { createContext } from "react";
import type { Plugin } from "../../../types";

export type DashboardContext = {
  initPlugin: ({ icon, title, slug }: Plugin) => void;
};

//@ts-expect-error - intentional.
export const dashboardContext = createContext<DashboardContext>(null);
