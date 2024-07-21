import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ResponsiveImage } from "~/components/responsive-image";

// Mock Next.js's getImageProps function
vi.mock("next/image", () => ({
  getImageProps: vi
    .fn()
    .mockImplementation(
      ({
        src,
        width,
        height,
      }: {
        src: string;
        width: number;
        height: number;
      }) => ({
        props: {
          src,
          width,
          height,
          srcSet: `${src} ${width}w`,
        },
      }),
    ),
}));

describe("ResponsiveImage", () => {
  const defaultProps = {
    desktop: { src: "/desktop.jpg", width: 1920, height: 1080 },
    tablet: { src: "/tablet.jpg", width: 1024, height: 768 },
    mobile: { src: "/mobile.jpg", width: 640, height: 480 },
    alt: "Test image",
  };

  it("should render picture element with correct source elements", () => {
    render(<ResponsiveImage {...defaultProps} />);

    const picture = screen.getByRole("img").closest("picture");
    expect(picture).toBeTruthy();

    const sources = picture?.querySelectorAll("source");
    expect(sources).toHaveLength(3);

    expect(sources?.[0]).toHaveAttribute("media", "(min-width: 1024px)");
    expect(sources?.[1]).toHaveAttribute("media", "(min-width: 768px)");
    expect(sources?.[2]).not.toHaveAttribute("media");
  });

  it("should pass correct props to img element", () => {
    render(<ResponsiveImage {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/mobile.jpg");
    expect(img).toHaveAttribute("alt", "Test image");
    expect(img).toHaveAttribute("width", "640");
    expect(img).toHaveAttribute("height", "480");
  });

  it("should apply correct default classes", () => {
    render(<ResponsiveImage {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveClass("h-auto", "w-full");
  });

  it("should apply additional classes when provided", () => {
    render(<ResponsiveImage {...defaultProps} className="custom-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveClass("h-auto", "w-full", "custom-class");
  });

  it("should set correct loading and fetchPriority for non-hero images", () => {
    render(<ResponsiveImage {...defaultProps} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("fetchpriority", "auto");
  });

  it("should set correct loading and fetchPriority for hero images", () => {
    render(<ResponsiveImage {...defaultProps} isHero={true} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });
});
