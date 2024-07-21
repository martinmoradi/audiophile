import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, type ButtonProps } from "~/components/ui/button";

// Mock the ChevronRightIcon component
vi.mock("~/components/icons/chevron-right", () => ({
  ChevronRightIcon: () => <div data-testid="chevron-right-icon" />,
}));

describe("Button component", () => {
  const defaultProps: ButtonProps = {
    children: "Click me",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with default props", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary text-white");
    expect(button).toHaveClass("h-[4.8rem] w-[16rem]");
  });

  it("should render with custom className", () => {
    render(<Button {...defaultProps} className="custom-class" />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("custom-class");
  });

  describe("Variants", () => {
    it("should render with default variant", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass("bg-primary text-white hover:bg-secondary");
    });

    it("should render with destructive variant", () => {
      render(<Button {...defaultProps} variant="destructive" />);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass("bg-red text-white hover:bg-red/75");
    });

    it("should render with secondary variant", () => {
      render(<Button {...defaultProps} variant="secondary" />);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass(
        "bg-transparent text-black border border-black hover:bg-black hover:text-white hover:border-none",
      );
    });

    it("should render with link variant and include ChevronRightIcon", () => {
      render(<Button {...defaultProps} variant="link" />);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass(
        "text-black opacity-50 hover:text-primary hover:opacity-100",
      );
      expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render with default size", () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass("h-[4.8rem] w-[16rem]");
    });
  });

  it("should forward ref to button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("should be clickable and call onClick handler", async () => {
    const onClickMock = vi.fn();
    render(<Button {...defaultProps} onClick={onClickMock} />);
    const button = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button {...defaultProps} disabled />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:pointer-events-none disabled:opacity-50",
    );
  });

  it("should apply focus-visible styles", async () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole("button", { name: /click me/i });
    await userEvent.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveClass(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/90 focus-visible:ring-offset-2",
    );
  });
});
