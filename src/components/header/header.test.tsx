import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header, navItems } from "./header";

// Mock the hooks
vi.mock("~/hooks/usePreventScroll", () => ({
  usePreventScroll: vi.fn(),
}));
vi.mock("~/hooks/useCloseOnResize", () => ({
  useCloseOnResize: vi.fn(),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Header", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeDefined();
    });

    it("logo is present and links to the home page", () => {
      render(<Header />);
      const logoLink = screen.getByRole("link", { name: "Logo" });
      expect(logoLink).toBeDefined();
      expect(logoLink.getAttribute("href")).toBe("/");
      expect(logoLink.querySelector("svg")).toBeDefined();
    });

    it("cart icon is present and links to the cart page", () => {
      render(<Header />);
      const cartLink = screen.getByRole("link", { name: "Cart" });
      expect(cartLink).toBeDefined();
      expect(cartLink.getAttribute("href")).toBe("/cart");
    });

    it("hamburger menu icon is present", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toBeDefined();
    });

    it("navigation menu items are rendered correctly", () => {
      render(<Header />);
      navItems.forEach((item) => {
        expect(screen.getByRole("link", { name: item.label })).toBeDefined();
      });
    });
  });

  describe("Navigation Links", () => {
    it("navigation menu items are rendered with correct hrefs and labels", () => {
      render(<Header />);
      navItems.forEach((item) => {
        expect(screen.getByRole("link", { name: item.label })).toBeDefined();
        expect(
          screen.getByRole("link", { name: item.label }).getAttribute("href"),
        ).toBe(item.href);
      });
    });
  });

  describe("Menu state managment", () => {
    it("menu is closed by default", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("opens menu when hamburger icon is clicked", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      fireEvent.click(hamburgerButton);
      expect(hamburgerButton).toHaveAttribute("aria-expanded", "true");
    });

    it("closes menu when hamburger icon is clicked again", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      fireEvent.click(hamburgerButton); // Open the menu
      fireEvent.click(hamburgerButton); // Close the menu
      expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Accessibility", () => {
    it("logo has proper accessibility features", () => {
      render(<Header />);
      const logoLink = screen.getByRole("link", { name: "Logo" });
      expect(logoLink).toHaveAttribute("href", "/");
      expect(logoLink.querySelector("svg")).toBeTruthy();
      expect(logoLink.querySelector(".sr-only")).toHaveTextContent("Logo");
    });

    it("logo has proper sr-only text for screen readers", () => {
      render(<Header />);
      const logoLink = screen.getByRole("link", { name: /logo/i });
      expect(logoLink).toContainHTML('<span class="sr-only">Logo</span>');
    });

    it("cart icon has proper accessibility features", () => {
      render(<Header />);
      const cartLink = screen.getByRole("link", { name: "Cart" });
      expect(cartLink).toHaveAttribute("href", "/cart");
      expect(cartLink.querySelector("svg")).toBeTruthy();
      expect(cartLink.querySelector(".sr-only")).toHaveTextContent("Cart");
    });

    it("cart icon has proper sr-only text for screen readers", () => {
      render(<Header />);
      const cartLink = screen.getByRole("link", { name: /cart/i });
      expect(cartLink).toContainHTML('<span class="sr-only">Cart</span>');
    });

    it("hamburger menu has proper sr-only text for screen readers", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toContainHTML(
        '<span class="sr-only">Toggle menu</span>',
      );
    });

    it("hamburger menu has proper accessibility features", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toBeTruthy();
      expect(hamburgerButton).toHaveAttribute("aria-expanded");
      expect(hamburgerButton).toHaveAttribute(
        "aria-controls",
        "navigation-menu",
      );
    });
  });
});
