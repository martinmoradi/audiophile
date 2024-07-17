import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePreventScroll } from "./usePreventScroll";

describe("usePreventScroll", () => {
  afterEach(() => {
    // Clean up after each test
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = "";
    }
  });

  it("sets html overflow to hidden when isActive is true", () => {
    renderHook(() => usePreventScroll(true));
    const html = document.querySelector("html");
    expect(html?.style.overflow).toBe("hidden");
  });

  it("resets html overflow when isActive becomes false", () => {
    const { rerender } = renderHook(
      ({ isActive }) => usePreventScroll(isActive),
      {
        initialProps: { isActive: true },
      },
    );

    rerender({ isActive: false });
    const html = document.querySelector("html");
    expect(html?.style.overflow).toBe("");
  });

  it("resets html overflow on cleanup", () => {
    const { unmount } = renderHook(() => usePreventScroll(true));
    unmount();
    const html = document.querySelector("html");
    expect(html?.style.overflow).toBe("");
  });
});
