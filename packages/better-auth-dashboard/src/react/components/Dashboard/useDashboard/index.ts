"use client";

import { useContext } from "react";
import { dashboardContext } from "../dashboardContext";

export const useDashboard = () => {
  const ctx = useContext(dashboardContext);
  if (!ctx) {
    throw new Error(
      `The useDashboard hook must be used in as a child of <Dashboard>.`
    );
  }

  return ctx;
};
