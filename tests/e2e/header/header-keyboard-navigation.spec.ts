import {
  test,
  expect,
  type Page,
  type Locator,
  type ElementHandle,
} from "@playwright/test";
import { VIEWPORTS } from "tests/e2e/viewports.constant";
import { navItems } from "~/constants/navigation";

test.describe("Header Component - Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  async function pressTabKey(page: Page, count = 1) {
    for (let i = 0; i < count; i++) {
      await page.keyboard.press("Tab");
    }
  }

  function isElementHandle(obj: unknown): obj is ElementHandle {
    return obj !== null && typeof obj === "object" && "asElement" in obj;
  }

  async function expectElementFocused(page: Page, selector: string) {
    const focusedElementHandle = await page.evaluateHandle(
      () => document.activeElement,
    );
    expect(focusedElementHandle).toBeDefined();

    if (!isElementHandle(focusedElementHandle)) {
      throw new Error("Failed to get focused element");
    }

    const focusedElement = focusedElementHandle.asElement();
    if (!focusedElement) {
      throw new Error("Failed to get focused element");
    }

    const ariaLabel = await focusedElement.getAttribute("aria-label");
    expect(ariaLabel).toBe(selector);
  }

  async function getFocusedElement(page: Page): Promise<Locator> {
    return page.locator(":focus");
  }

  test("Desktop: All interactive elements are focusable and activatable", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.desktop);

    // Focus logo
    await pressTabKey(page);
    await expectElementFocused(page, "logo");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/");

    // Focus navigation items
    for (const item of navItems) {
      await pressTabKey(page);
      const focusedElement = await getFocusedElement(page);
      await expect(focusedElement).toHaveText(item.label);
      await expect(focusedElement).toHaveAttribute("href", item.href);
    }

    // Focus cart icon
    await pressTabKey(page);
    await expectElementFocused(page, "shopping-cart");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/cart");
  });

  test("Mobile: Hamburger menu is focusable and activatable", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.mobile);

    // Focus hamburger menu
    await pressTabKey(page);
    const hamburgerMenu = page.getByRole("button", { name: "Toggle menu" });
    await expect(hamburgerMenu).toBeFocused();

    // Activate hamburger menu
    await page.keyboard.press("Enter");
    await expect(page.getByRole("navigation")).toBeVisible();

    // Wait for any animations to complete
    await page.waitForTimeout(300);

    // Tab to the first nav item (might need multiple tabs)
    await pressTabKey(page, 2); // Adjust this number as needed

    const focusedElement = await getFocusedElement(page);
    await expect(focusedElement).toHaveText(navItems[0]!.label);

    // Close menu with Escape key
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation")).not.toBeVisible();
  });

  test("Mobile: All nav items are focusable when menu is open", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.mobile);

    // Open menu
    const hamburgerMenu = page.getByRole("button", { name: "Toggle menu" });
    await hamburgerMenu.click();

    // Wait for any animations to complete
    await page.waitForTimeout(300);

    // Tab to the first nav item (might need multiple tabs)
    await pressTabKey(page, 2); // Adjust this number as needed

    // Focus and check each nav item
    for (const item of navItems) {
      const focusedElement = await getFocusedElement(page);
      await expect(focusedElement).toHaveText(item.label);
      await expect(focusedElement).toHaveAttribute("href", item.href);
      await pressTabKey(page);
    }

    // Focus cart icon
    const cartIcon = page.getByRole("link", { name: "shopping-cart" });
    await expect(cartIcon).toBeFocused();
  });
});
