import { test, expect, type Page } from "@playwright/test";
import { VIEWPORTS } from "tests/e2e/viewports.constant";

test.describe("Header Component - Visual Regression", () => {
  let baseURL: string;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto("/");
    baseURL = page.url();
  });

  async function captureHeaderScreenshot(page: Page, state: string) {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await header.screenshot({ path: `./test-results/header-${state}.png` });
  }

  test("Visual consistency across viewports and menu states", async ({
    page,
  }) => {
    // Mobile viewport
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto(baseURL);
    await captureHeaderScreenshot(page, "mobile-closed");

    // Open mobile menu
    const hamburgerMenu = page.getByRole("button", { name: /toggle menu/i });
    await hamburgerMenu.click();
    await page.waitForTimeout(300); // Wait for animation
    await captureHeaderScreenshot(page, "mobile-open");

    // Tablet viewport
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto(baseURL);
    await captureHeaderScreenshot(page, "tablet-closed");

    await hamburgerMenu.click();
    await page.waitForTimeout(300);
    await captureHeaderScreenshot(page, "tablet-open");

    // Desktop viewport
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(baseURL);
    await captureHeaderScreenshot(page, "desktop");

    // Compare screenshots
    expect(await page.screenshot()).toMatchSnapshot("full-page.png");
  });
});
