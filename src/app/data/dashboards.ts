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
  bootpack: {
    title: "Bootpack",
    siteSlugs: [
      "bookameetingtime",
      "bootpackdigital",
      "easycustomerfeedback",
      "joblisting",
      "michaelbonner",
      "officelunch",
      "whattodoinsaltlake",
    ] satisfies (keyof typeof sites)[],
  },
  clients: {
    title: "Clients",
    siteSlugs: [
      "acceleratedep",
      "andrewpollardcreative",
      "blackthornsoftware",
      "crewview",
      "dkow",
      "hanksgaragevenue",
      "homeorganizingme",
      "jmills",
      "knowyourforce",
      "lostcreekcontracting",
      "theravenspace",
      "utahmountainadventures",
    ] satisfies (keyof typeof sites)[],
  },
  nef: {
    title: "NEF",
    siteSlugs: [
      "811contest",
      "energysafekids",
      "energysafeskills",
      "nef1",
      "pathwaysenergy",
    ] satisfies (keyof typeof sites)[],
  },
} as const;

export type DashboardSlug = keyof typeof dashboards;

export const getDashboard = (slug: DashboardSlug) => dashboards[slug] ?? null;
