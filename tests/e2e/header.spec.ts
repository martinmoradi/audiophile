import { test, expect, type Page } from "@playwright/test";
import { navItems } from "~/constants/navigation";

const MOBILE_VIEWPORT = { width: 375, height: 667 };
const TABLET_VIEWPORT = { width: 768, height: 1024 };
const DESKTOP_VIEWPORT = { width: 1280, height: 720 };

test.describe("Header Component - Responsiveness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
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

  test("Header renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);

    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });
    await expect(hamburgerMenu).toBeVisible();

    const logo = page.getByRole("link", { name: /logo/i });
    await expect(logo).toBeVisible();

    const cartIcon = page.getByRole("link", { name: /cart/i });
    await expect(cartIcon).toBeVisible();

    await expectMenuClosed(page);
  });

  test("Header renders correctly on tablet", async ({ page }) => {
    await page.setViewportSize(TABLET_VIEWPORT);

    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });
    await expect(hamburgerMenu).toBeVisible();

    const logo = page.getByRole("link", { name: /logo/i });
    await expect(logo).toBeVisible();

    const cartIcon = page.getByRole("link", { name: /cart/i });
    await expect(cartIcon).toBeVisible();

    await expectMenuClosed(page);
  });

  test("Header renders correctly on desktop", async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);

    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });
    await expect(hamburgerMenu).not.toBeVisible();

    const logo = page.getByRole("link", { name: /logo/i });
    await expect(logo).toBeVisible();

    const cartIcon = page.getByRole("link", { name: /cart/i });
    await expect(cartIcon).toBeVisible();

    await expectMenuOpen(page);
  });

  test("Menu toggles correctly on mobile", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);

    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });
    await expectMenuClosed(page);

    await hamburgerMenu.click();
    // Add a small delay to allow for any transitions
    await page.waitForTimeout(300);
    await expectMenuOpen(page);

    await hamburgerMenu.click();
    // Add a small delay to allow for any transitions
    await page.waitForTimeout(300);
    await expectMenuClosed(page);
  });

  test("Header adjusts correctly when resizing from mobile to desktop", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);

    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });
    await expect(hamburgerMenu).toBeVisible();
    await expectMenuClosed(page);

    await page.setViewportSize(DESKTOP_VIEWPORT);

    await expect(hamburgerMenu).not.toBeVisible();
    await expectMenuOpen(page);
  });
});
