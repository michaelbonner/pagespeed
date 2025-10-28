import { CategoryScore } from "./CategoryScore";

const meta = {
  component: CategoryScore,
};

export default meta;

export const Default = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 90,
  },
};

export const Perfect = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 100,
  },
};

export const Good = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 90,
  },
};

export const Average = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 50,
  },
};

export const Bad = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 40,
  },
};

export const VeryBad = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 10,
  },
};

export const Empty = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 0,
  },
};
