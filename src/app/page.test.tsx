import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
