import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeAll, expect, test } from "vitest";
import Home from "./page";

beforeAll(() => {
  // Ensure we're in a jsdom environment
  if (typeof window === "undefined") {
    global.window = {} as any;
  }
  if (typeof document === "undefined") {
    global.document = {} as any;
  }
});

test("Page", () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "PageSpeed results for bootpackdigital.com",
    })
  ).toBeDefined();
});
