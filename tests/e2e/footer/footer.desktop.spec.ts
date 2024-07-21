import { test, expect } from "@playwright/test";
import { desktop } from "tests/e2e/viewports";
import { navItems } from "~/constants/navigation";

test.describe("Footer Component (Desktop)", () => {
  test.describe("Rendering", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(desktop);
      await page.goto("/");
    });

    test("should display logo", async ({ page }) => {
      const logo = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /logo/i });
      await expect(logo).toBeVisible();
    });

    test("should have correct href for logo", async ({ page }) => {
      const logo = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /logo/i });
      await expect(logo).toHaveAttribute("href", "/");
    });

    test("should display navigation menu", async ({ page }) => {
      const nav = page.getByRole("contentinfo").getByRole("navigation");
      await expect(nav).toBeVisible();
    });

    test("should display all navigation items with correct labels and hrefs", async ({
      page,
    }) => {
      for (const item of navItems) {
        const link = page
          .getByRole("contentinfo")
          .getByRole("link", { name: item.label });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", item.href);
      }
    });

    test("should display company description", async ({ page }) => {
      const description = page
        .getByRole("contentinfo")
        .getByText(/Audiophile is an all in one stop/);
      await expect(description).toBeVisible();
    });

    test("should display copyright text", async ({ page }) => {
      const copyright = page
        .getByRole("contentinfo")
        .getByText(/Copyright 2024. All Rights Reserved/);
      await expect(copyright).toBeVisible();
    });

    test("should display social media icons", async ({ page }) => {
      const socialIcons = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /(facebook|twitter|instagram)/i });
      await expect(socialIcons).toHaveCount(3);
    });
  });

  test.describe("Layout", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(desktop);
      await page.goto("/");
    });

    test("should have logo and navigation menu in the same row", async ({
      page,
    }) => {
      const logoNav = page.getByRole("contentinfo").locator(".lg\\:flex-row");
      await expect(logoNav).toBeVisible();
    });

    test("should have company description centered", async ({ page }) => {
      const description = page
        .getByRole("contentinfo")
        .locator(".max-w-\\[54rem\\]");
      await expect(description).toHaveClass(/md:text-left/);
    });

    test("should have copyright text and social icons in the same row", async ({
      page,
    }) => {
      const bottomRow = page
        .getByRole("contentinfo")
        .locator(".md\\:flex.md\\:justify-between");
      await expect(bottomRow).toBeVisible();
    });
  });

  test.describe("Interactions", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(desktop);
      await page.goto("/");
    });

    test("should navigate to home page when logo is clicked", async ({
      page,
    }) => {
      const logo = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /logo/i });
      await logo.click();
      await expect(page).toHaveURL("/");
    });

    test("should navigate to correct page when each navigation item is clicked", async ({
      page,
    }) => {
      for (const item of navItems) {
        await page.goto("/");
        const link = page
          .getByRole("contentinfo")
          .getByRole("link", { name: item.label });
        await link.click();
        await expect(page).toHaveURL(item.href);
      }
    });

    test("social media icons should have hover effect", async ({ page }) => {
      const socialIcons = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /(facebook|twitter|instagram)/i });

      for (const icon of await socialIcons.all()) {
        const initialColor = await icon.evaluate(
          (el) => window.getComputedStyle(el).color,
        );
        await icon.hover();
        await page.waitForTimeout(300); // Wait for transitions to complete
        const hoverColor = await icon.evaluate(
          (el) => window.getComputedStyle(el).color,
        );
        expect(hoverColor).not.toBe(initialColor);
      }
    });
  });

  test.describe("Accessibility", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(desktop);
      await page.goto("/");
    });

    test("logo should have proper aria-label", async ({ page }) => {
      const logo = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /logo/i });
      await expect(logo).toHaveAttribute("aria-label", "logo");
    });

    test("social media icons should have proper aria-labels", async ({
      page,
    }) => {
      const facebookIcon = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /facebook/i });
      const twitterIcon = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /twitter/i });
      const instagramIcon = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /instagram/i });

      await expect(facebookIcon).toHaveAttribute("aria-label", "facebook");
      await expect(twitterIcon).toHaveAttribute("aria-label", "twitter");
      await expect(instagramIcon).toHaveAttribute("aria-label", "instagram");
    });
  });
});
