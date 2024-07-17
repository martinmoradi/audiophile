import { test, expect, type Page } from "@playwright/test";
import { VIEWPORTS } from "tests/e2e/viewports.constant";
import { navItems } from "~/constants/navigation";

test.describe("Header Component - Menu Interactions", () => {
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

  test("Opening and closing the mobile menu", async ({ page }) => {
    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });

    // Open menu
    await hamburgerMenu.click();
    await page.waitForTimeout(500); // Wait for animation
    await expectMenuOpen(page);

    // Close menu
    await hamburgerMenu.click();
    await page.waitForTimeout(500); // Wait for animation
    await expectMenuClosed(page);
  });

  test("Scrolling is prevented when mobile menu is open", async ({ page }) => {
    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });

    // Function to get html overflow
    const getHtmlOverflow = () => document.documentElement.style.overflow;

    // Check initial overflow
    let overflow = await page.evaluate(getHtmlOverflow);
    expect(overflow).not.toBe("hidden");

    // Open menu
    await hamburgerMenu.click();
    await page.waitForTimeout(300); // Wait for animation

    // Check overflow after opening menu
    overflow = await page.evaluate(getHtmlOverflow);
    expect(overflow).toBe("hidden");

    // Close menu
    await hamburgerMenu.click();
    await page.waitForTimeout(300); // Wait for animation

    // Check overflow after closing menu
    overflow = await page.evaluate(getHtmlOverflow);
    expect(overflow).not.toBe("hidden");
  });

  test("Menu closes when resizing from mobile to tablet", async ({ page }) => {
    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });

    // Open menu
    await hamburgerMenu.click();
    await page.waitForTimeout(500); // Wait for animation
    await expectMenuOpen(page);

    // Resize to tablet
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.waitForTimeout(500); // Wait for any potential resize handlers

    await expectMenuClosed(page);
  });

  test("Menu closes when changing orientation", async ({ page }) => {
    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });

    // Open menu
    await hamburgerMenu.click();
    await page.waitForTimeout(500); // Wait for animation
    await expectMenuOpen(page);

    // Change orientation (simulate rotating the device)
    await page.setViewportSize({
      width: VIEWPORTS.mobile.height,
      height: VIEWPORTS.mobile.width,
    });
    await page.waitForTimeout(500); // Wait for any potential resize handlers

    await expectMenuClosed(page);
  });
});
