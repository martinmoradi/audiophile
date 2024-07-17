import { test, expect, type Page } from "@playwright/test";
import { VIEWPORTS } from "tests/e2e/viewports.constant";
import { navItems } from "~/constants/navigation";

test.describe("Header Component - Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize(VIEWPORTS.mobile);
  });

  async function expectMenuClosed(page: Page) {
    const nav = page.getByRole("navigation");
    await expect(nav).not.toBeVisible();
    for (const item of navItems) {
      const link = page.getByRole("link", { name: item.label });
      await expect(link).not.toBeVisible();
    }
  }

  async function expectMenuOpen(page: Page) {
    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
    for (const item of navItems) {
      const link = page.getByRole("link", { name: item.label });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", item.href);
    }
  }

  test("Desktop: Clicking navigation links navigates to correct pages", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.desktop);

    for (const item of navItems) {
      const link = page.getByRole("link", { name: item.label });
      await link.click();
      await expect(page).toHaveURL(item.href);
      await page.goto("/"); // Go back to home page for next iteration
    }
  });

  test("Mobile: Clicking navigation links navigates to correct pages and closes menu", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.mobile);

    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });

    for (const item of navItems) {
      // Open the menu
      await hamburgerMenu.click();
      await page.waitForTimeout(500); // Wait for animation
      await expectMenuOpen(page);

      // Click the navigation link
      const link = page.getByRole("link", { name: item.label });
      await link.click();

      // Check if navigated to correct page
      await expect(page).toHaveURL(item.href);

      // Check if menu is closed after navigation
      await expectMenuClosed(page);

      await page.goto("/"); // Go back to home page for next iteration
    }
  });
});
