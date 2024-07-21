import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "~/components/footer";
import { navItems } from "~/constants/navigation";

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

describe("Footer Component", () => {
  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeDefined();
    });

    it("should contain a footer element", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render the logo", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
    });

    it("should render the correct number of navigation items", () => {
      render(<Footer />);
      const navLinks = screen.getAllByRole("link", {
        name: /home|headphones|speakers|earphones/i,
      });
      expect(navLinks).toHaveLength(navItems.length);
    });

    it("should render the company description", () => {
      render(<Footer />);
      expect(
        screen.getByText(/Audiophile is an all in one stop/i),
      ).toBeInTheDocument();
    });

    it("should render the copyright notice", () => {
      render(<Footer />);
      expect(
        screen.getByText(/Copyright 2024. All Rights Reserved/i),
      ).toBeInTheDocument();
    });

    it("should render the correct number of social media icons", () => {
      render(<Footer />);
      const socialIcons = screen.getAllByRole("link", {
        name: /facebook|twitter|instagram/i,
      });
      expect(socialIcons).toHaveLength(3);
    });
  });

  describe("Navigation Links", () => {
    it("should render all navigation items from the navItems constant", () => {
      render(<Footer />);
      navItems.forEach((item) => {
        expect(
          screen.getByRole("link", { name: item.label }),
        ).toBeInTheDocument();
      });
    });

    it("should have the correct href attribute for each navigation item", () => {
      render(<Footer />);
      navItems.forEach((item) => {
        const link = screen.getByRole("link", { name: item.label });
        expect(link).toHaveAttribute("href", item.href);
      });
    });

    it("should have the correct text content for each navigation item", () => {
      render(<Footer />);
      navItems.forEach((item) => {
        const link = screen.getByRole("link", { name: item.label });
        expect(link).toHaveTextContent(item.label);
      });
    });
  });

  describe("Logo", () => {
    it("should render the LogoIcon component", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
    });

    it("should wrap the LogoIcon in a Link component with the correct href", () => {
      render(<Footer />);
      const logoLink = screen.getByRole("link", { name: /logo/i });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Social Media Links", () => {
    it("should render the correct number of social media icons", () => {
      render(<Footer />);
      const socialIcons = screen.getAllByRole("link", {
        name: /facebook|twitter|instagram/i,
      });
      expect(socialIcons).toHaveLength(3);
    });

    it("should wrap each social media icon in a Link component", () => {
      render(<Footer />);
      const socialIcons = screen.getAllByRole("link", {
        name: /facebook|twitter|instagram/i,
      });
      socialIcons.forEach((icon) => {
        expect(icon.tagName).toBe("A");
      });
    });

    it("should have the correct href for each social media link", () => {
      render(<Footer />);
      const socialIcons = screen.getAllByRole("link", {
        name: /facebook|twitter|instagram/i,
      });
      socialIcons.forEach((icon) => {
        expect(icon).toHaveAttribute("href", "/");
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("should have centered content on mobile", () => {
      render(<Footer />);
      const companyDescription = screen.getByText(
        /Audiophile is an all in one stop/i,
      );
      expect(companyDescription).toHaveClass("text-center");
    });

    it("should have left-aligned content on tablet and desktop", () => {
      render(<Footer />);
      const companyDescription = screen.getByText(
        /Audiophile is an all in one stop/i,
      );
      expect(companyDescription).toHaveClass("md:text-left");
    });

    it("should have a different layout for the logo and nav items on desktop", () => {
      render(<Footer />);
      const logoNavContainer = screen
        .getByRole("contentinfo")
        .querySelector("div > div > div");
      expect(logoNavContainer).toHaveClass("lg:flex-row");
    });
  });
});
