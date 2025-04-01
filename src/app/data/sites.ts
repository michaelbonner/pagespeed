export const sites = {
  acceleratedep: {
    baseUrl: "https://www.acceleratedep.com",
    paths: ["/", "/services", "/about", "/careers", "/contact"],
  },
  bootpackdigital: {
    baseUrl: "https://bootpackdigital.com",
    paths: ["/", "/about", "/contact", "/open-source", "/policies", "/work"],
  },
  crewview: {
    baseUrl: "https://www.crewview.com",
    paths: [
      "/",
      "/solutions",
      "/solutions/team-and-time-management",
      "/solutions/project-and-task-management",
      "/solutions/equipment-management",
      "/solutions/web-and-mobile-app",
      "/pricing",
      "/blog",
      "/blog/breaking-down-silos-how-centralized-construction-management-technology-reduces-costs-and-boosts",
      "/blog/the-profitable-path-to-success-how-equipment-maintenance-boosts-construction-company-profits",
      "/contact",
      "/privacy-policy",
    ],
  },
  dkow: {
    baseUrl: "https://www.dkow.com",
    paths: [
      "/",
      "/practice-areas/",
      "/practice-areas/medical-malpractice/",
      "/practice-areas/motor-vehicle-accidents/",
      "/attorneys/",
      "/attorneys/michael-a-worel/",
      "/attorneys/david-r-olsen/",
      "/our-results/",
      "/news-publications/",
      "/dkow-files-lawsuit-for-the-wrongful-death-of-julia-reagan/",
      "/contact/",
    ],
  },
  energySafeKids: {
    baseUrl: "https://energysafekids.vercel.app",
    paths: ["/", "/student-resources", "/teacher-resources", "/about"],
  },
  michaelbonner: {
    baseUrl: "https://michaelbonner.dev",
    paths: [
      "/",
      "/blog",
      "/blog/github-repositories-viewer-app",
      "/blog/git-branch-name-raycast-extension",
      "/blog/i-made-an-extension",
      "/blog/getting-started-as-a-web-developer-in-2022",
      "/blog/set-up-some-aliases",
      "/uses",
      "/ellie",
    ],
  },
  nef1: {
    baseUrl: "https://nef1.org",
    paths: [
      "/",
      "/programs/",
      "/think-energy/",
      "/energy-safe-kids/",
      "/rev/",
      "/teacher-support/",
      "/about-nef/",
      "/board-of-directors/",
      "/careers/",
      "/meet-the-team/",
      "/teacher-support/",
      "/store/",
      "/survey/",
      "/communications/",
      "/annual-reports/",
      "/contact/",
    ],
  },
};

export const getUrls = (site: keyof typeof sites) => {
  return sites[site].paths.map((path) => `${sites[site].baseUrl}${path}`);
};
