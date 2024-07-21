import { test, expect } from "@playwright/test";
import { mobile } from "tests/e2e/viewports";
import { navItems } from "~/constants/navigation";

test.describe("Footer Component (Mobile)", () => {
  test.describe("Rendering", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(mobile);
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
      await page.setViewportSize(mobile);
      await page.goto("/");
    });

    test("should have logo and navigation menu stacked vertically", async ({
      page,
    }) => {
      const logoBoundingBox = await page
        .getByRole("contentinfo")
        .getByRole("link", { name: /logo/i })
        .boundingBox();
      const navBoundingBox = await page
        .getByRole("contentinfo")
        .getByRole("navigation")
        .getByRole("list")
        .boundingBox();
      expect(logoBoundingBox!.y).toBeLessThan(navBoundingBox!.y);
    });

    test("should have company description centered", async ({ page }) => {
      const description = page
        .getByRole("contentinfo")
        .locator(".max-w-\\[54rem\\]");
      await expect(description).toHaveClass(/text-center/);
    });

    test("should have copyright text and social icons stacked vertically", async ({
      page,
    }) => {
      const copyrightText = page
        .getByRole("contentinfo")
        .getByText(/Copyright 2024. All Rights Reserved/);

      const socialIcons = page
        .getByRole("contentinfo")
        .getByRole("link", { name: /(facebook|twitter|instagram)/i });

      const copyrightTextBoundingBox = await copyrightText.boundingBox();
      const socialIconsCount = await socialIcons.count();

      for (let i = 0; i < socialIconsCount; i++) {
        const icon = socialIcons.nth(i);
        const iconBoundingBox = await icon.boundingBox();
        expect(iconBoundingBox!.y).toBeGreaterThan(copyrightTextBoundingBox!.y);
      }
    });
  });

  test.describe("Interactions", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(mobile);
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
  });

  test.describe("Accessibility", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(mobile);
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
