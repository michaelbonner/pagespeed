import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategoryScore } from "./CategoryScore";

const meta = {
  component: CategoryScore,
} satisfies Meta<typeof CategoryScore>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 90,
  },
};

export const Perfect: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 100,
  },
};

export const Good: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 90,
  },
};

export const Average: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 50,
  },
};

export const Bad: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 40,
  },
};

export const VeryBad: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 10,
  },
};

export const Empty: Story = {
  args: {
    pageSpeedLink:
      "https://pagespeed.web.dev/report?url=https://www.google.com",
    score: 0,
  },
};
