import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCloseOnResize } from "~/hooks/useCloseOnResize";

describe("useCloseOnResize", () => {
  let setIsOpenMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setIsOpenMock = vi.fn();
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adds event listeners on mount", () => {
    renderHook(() => useCloseOnResize(setIsOpenMock));
    expect(window.addEventListener).toHaveBeenCalledWith(
      "orientationchange",
      expect.any(Function),
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("removes event listeners on unmount", () => {
    const { unmount } = renderHook(() => useCloseOnResize(setIsOpenMock));
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "orientationchange",
      expect.any(Function),
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("calls setIsOpen(false) when resize event occurs", () => {
    renderHook(() => useCloseOnResize(setIsOpenMock));
    window.dispatchEvent(new Event("resize"));
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  it("calls setIsOpen(false) when orientationchange event occurs", () => {
    renderHook(() => useCloseOnResize(setIsOpenMock));
    window.dispatchEvent(new Event("orientationchange"));
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
