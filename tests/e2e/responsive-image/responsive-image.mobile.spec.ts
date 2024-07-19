import { test, expect } from "@playwright/test";

test.describe("ResponsiveImage Component - Hero Image on Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing page
    await page.goto("/");
  });

  test("should load hero image with correct attributes", async ({ page }) => {
    const heroImg = page.locator("img").first(); // Assuming it's the first img on the page

    // Check if image is present
    await expect(heroImg).toBeVisible();

    // Check for hero image attributes
    await expect(heroImg).toHaveAttribute("loading", "eager");
    await expect(heroImg).toHaveAttribute("fetchpriority", "high");

    // Check for correct classes
    await expect(heroImg).toHaveClass(/h-auto w-full/);

    // Check for alt text
    await expect(heroImg).toHaveAttribute("alt", /\w+/);
  });

  test("should load image quickly", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.request().timing().responseEnd).toBeLessThan(5000); // 5 seconds

    const heroImg = page.locator("picture img").first();
    await expect(heroImg).toBeVisible({ timeout: 3000 }); // 3 seconds
  });
});
