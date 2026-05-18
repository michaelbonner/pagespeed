import { sites } from "./sites";

export const dashboards = {
  augment: {
    title: "Augment",
    siteSlugs: [
      "denverwindowwellcovers",
      "utahwindowwellcovers",
      "wasatchcovers",
      "mountainlandcovers",
      "wasatchfabrication",
    ] satisfies (keyof typeof sites)[],
  },
  nef: {
    title: "NEF",
    siteSlugs: [
      "811contest",
      "energysafekids",
      "nef1",
      "pathwaysenergy",
    ] satisfies (keyof typeof sites)[],
  },
} as const;

export type DashboardSlug = keyof typeof dashboards;

export const getDashboard = (slug: DashboardSlug) => dashboards[slug] ?? null;
