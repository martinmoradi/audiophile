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

  test("should adjust image size when resizing viewport", async ({ page }) => {
    const heroImg = page.locator("picture img").first();

    // Get initial size
    const initialRect = await heroImg.boundingBox();

    // Resize viewport
    await page.setViewportSize({ width: 1000, height: 800 });

    // Get new size
    const newRect = await heroImg.boundingBox();

    // Check if image size changed
    expect(initialRect!.width).not.toEqual(newRect!.width);
    expect(initialRect!.height).not.toEqual(newRect!.height);

    // Check if image is still visible and not too small
    expect(newRect!.width).toBeGreaterThan(100);
    expect(newRect!.height).toBeGreaterThan(100);
  });

  test("should load image quickly", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.request().timing().responseEnd).toBeLessThan(5000); // 5 seconds

    const heroImg = page.locator("picture img").first();
    await expect(heroImg).toBeVisible({ timeout: 3000 }); // 3 seconds
  });
});
