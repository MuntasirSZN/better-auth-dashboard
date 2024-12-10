import type { ReactNode } from "react";
import type { Theme } from "./types";

export type DashboardProps = {
  children: ReactNode[];
  theme?: Theme;
  params: Promise<{ all: string }>;
};

export const Dashboard = ({ children, theme, params }: DashboardProps) => {
  
  return <h1>My Page</h1>;
};
