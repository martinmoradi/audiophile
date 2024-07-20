import { test, expect } from "@playwright/test";
import { mobile } from "tests/e2e/viewports";
import { navItems } from "~/constants/navigation";

test.describe("Header Component (Mobile)", () => {
  test.describe("Rendering", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(mobile);
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

    test("should display hamburger menu icon", async ({ page }) => {
      const toggleMenu = page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i });
      await expect(toggleMenu).toBeVisible();
    });

    test("should display navigation menu when hamburger icon is clicked", async ({
      page,
    }) => {
      await page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i })
        .click();
      const nav = page.getByRole("navigation");
      await expect(nav).toBeVisible();
    });

    test("should hide navigation menu when hamburger icon is clicked twice", async ({
      page,
    }) => {
      await page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i })
        .click({ clickCount: 2, delay: 100 });
      const nav = page.getByRole("banner").getByRole("navigation");
      await expect(nav).not.toBeVisible();
    });

    test("should display all navigation items with correct labels and hrefs when menu is open", async ({
      page,
    }) => {
      await page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i })
        .click();
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
  });

  test.describe("Menu Interactions", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(mobile);
      await page.goto("/");
    });

    test("should prevent scrolling when mobile menu is open", async ({
      page,
    }) => {
      const toggleMenu = page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i });
      // Function to get html overflow
      const getHtmlOverflow = () => document.documentElement.style.overflow;
      // Check initial overflow
      let overflow = await page.evaluate(getHtmlOverflow);
      expect(overflow).not.toBe("hidden");
      // Open menu
      await toggleMenu.click();
      // Check overflow after opening menu
      overflow = await page.evaluate(getHtmlOverflow);
      expect(overflow).toBe("hidden");
      // Close menu
      await toggleMenu.click();
      // Check overflow after closing menu
      overflow = await page.evaluate(getHtmlOverflow);
      expect(overflow).not.toBe("hidden");
    });

    test("should close menu when navigation item is clicked", async ({
      page,
    }) => {
      await page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i })
        .click();
      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).toBeVisible();
      const link = page
        .getByRole("banner")
        .getByRole("link", { name: navItems[0]!.label });
      await link.click();
      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).not.toBeVisible();
    });

    test("should close menu when device orientation changes", async ({
      page,
    }) => {
      // Open menu
      await page
        .getByRole("banner")
        .getByRole("button", { name: /toggle menu/i })
        .click();
      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).toBeVisible();
      // Change orientation (simulate rotating the device)
      await page.locator("html").dispatchEvent("orientationchange");
      await expect(
        page.getByRole("banner").getByRole("navigation"),
      ).not.toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(mobile);
      await page.goto("/");
    });

    test("should navigate to home page when logo is clicked'", async ({
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
        await page
          .getByRole("banner")
          .getByRole("button", { name: /toggle menu/i })
          .click();
        const link = page
          .getByRole("banner")
          .getByRole("link", { name: item.label });
        await link.click();
        await expect(page).toHaveURL(item.href);
      }
    });

    test("should navigate to cart page when cart icon is clicked", async ({
      page,
    }) => {
      const cartIcon = page.getByRole("link", { name: /cart/i });
      await cartIcon.click();
      await expect(page).toHaveURL("/cart");
    });
  });
});
