import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type DashboardContext = {};

//@ts-expect-error - intentional.
export const dashboardContext = createContext<DashboardContext>(null);
