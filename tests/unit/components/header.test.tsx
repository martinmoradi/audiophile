import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header } from "~/components/header";
import { navItems } from "~/constants/navigation";

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
    it("should render without crashing", () => {
      render(<Header />);
      expect(screen.getByRole("banner")).toBeDefined();
    });

    it("should have a logo that links to the home page", () => {
      render(<Header />);
      const logoLink = screen.getByRole("link", { name: "Logo" });
      expect(logoLink).toBeDefined();
      expect(logoLink.getAttribute("href")).toBe("/");
      expect(logoLink.querySelector("svg")).toBeDefined();
    });

    it("should have a cart icon that links to the cart page", () => {
      render(<Header />);
      const cartLink = screen.getByRole("link", { name: "Cart" });
      expect(cartLink).toBeDefined();
      expect(cartLink.getAttribute("href")).toBe("/cart");
    });

    it("should have a hamburger menu icon", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toBeDefined();
    });

    it("should render navigation menu items correctly", () => {
      render(<Header />);
      navItems.forEach((item) => {
        expect(screen.getByRole("link", { name: item.label })).toBeDefined();
      });
    });
  });

  describe("Navigation Links", () => {
    it("should render navigation menu items with correct hrefs and labels", () => {
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
    it("should have the menu closed by default", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should open the menu when the hamburger icon is clicked", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      fireEvent.click(hamburgerButton);
      expect(hamburgerButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should close the menu when the hamburger icon is clicked again", () => {
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
    it("should have a logo with proper accessibility features", () => {
      render(<Header />);
      const logoLink = screen.getByRole("link", { name: "Logo" });
      expect(logoLink).toHaveAttribute("href", "/");
      expect(logoLink.querySelector("svg")).toBeTruthy();
      expect(logoLink.querySelector(".sr-only")).toHaveTextContent("Logo");
    });

    it("should have a logo with proper sr-only text for screen readers", () => {
      render(<Header />);
      const logoLink = screen.getByRole("link", { name: /logo/i });
      expect(logoLink).toContainHTML('<span class="sr-only">Logo</span>');
    });

    it("should have a cart icon with proper accessibility features", () => {
      render(<Header />);
      const cartLink = screen.getByRole("link", { name: "Cart" });
      expect(cartLink).toHaveAttribute("href", "/cart");
      expect(cartLink.querySelector("svg")).toBeTruthy();
      expect(cartLink.querySelector(".sr-only")).toHaveTextContent("Cart");
    });

    it("should have a cart icon with proper sr-only text for screen readers", () => {
      render(<Header />);
      const cartLink = screen.getByRole("link", { name: /cart/i });
      expect(cartLink).toContainHTML('<span class="sr-only">Cart</span>');
    });

    it("should have a hamburger menu with proper sr-only text for screen readers", () => {
      render(<Header />);
      const hamburgerButton = screen.getByRole("button", {
        name: /toggle menu/i,
      });
      expect(hamburgerButton).toContainHTML(
        '<span class="sr-only">Toggle menu</span>',
      );
    });

    it("should have a hamburger menu with proper accessibility features", () => {
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
