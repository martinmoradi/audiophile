import { test, expect } from "@playwright/test";
import { desktop, mobile, tablet } from "tests/e2e/viewports";
import { navItems } from "~/constants/navigation";

test.describe("Header Component (Desktop)", () => {
  test.describe("Rendering", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(desktop);
      await page.goto("/");
    });

    test("should display logo", async ({ page }) => {
      const logo = page
        .getByRole("banner")
        .getByRole("link", { name: /logo/i });
      await expect(logo).toBeVisible();
    });

    test("should have correct href for logo", async ({ page }) => {
      const logo = page
        .getByRole("banner")
        .getByRole("link", { name: /logo/i });
      await expect(logo).toHaveAttribute("href", "/");
    });

    test("should display navigation menu", async ({ page }) => {
      const nav = page.getByRole("banner").getByRole("navigation");
      await expect(nav).toBeVisible();
    });

    test("should display all navigation items with correct labels and hrefs", async ({
      page,
    }) => {
      for (const item of navItems) {
        const link = page
          .getByRole("banner")
          .getByRole("link", { name: item.label });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", item.href);
      }
    });

    test("should display cart icon", async ({ page }) => {
      const cartIcon = page
        .getByRole("banner")
        .getByRole("link", { name: /cart/i });
      await expect(cartIcon).toBeVisible();
    });

    test("should have correct href for cart icon", async ({ page }) => {
      const cartIcon = page
        .getByRole("banner")
        .getByRole("link", { name: /cart/i });
      await expect(cartIcon).toHaveAttribute("href", "/cart");
    });

    test("should not display hamburger menu icon", async ({ page }) => {
      const hamburgerMenu = page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i });
      await expect(hamburgerMenu).not.toBeVisible();
    });

    test("should close menu when viewport is resized", async ({ page }) => {
      await page.setViewportSize(mobile);
      // Open menu
      await page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i })
        .click();
      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).toBeVisible();

      // Resize to tablet
      await page.setViewportSize(tablet);

      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).not.toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(desktop);
      await page.goto("/");
    });

    test("should navigate to home page when logo is clicked", async ({
      page,
    }) => {
      await page.goto("/cart");
      const logo = page
        .getByRole("banner")
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
          .getByRole("banner")
          .getByRole("link", { name: item.label });
        await link.click();
        await expect(page).toHaveURL(item.href);
      }
    });
  });
});
