"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogOverlay, DialogContent } from "~/components/ui/dialog";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [initialPath, setInitialPath] = useState("");

  useEffect(() => {
    // Store the initial path when the modal is first opened
    if (!initialPath && (pathname === "/signup" || pathname === "/signin")) {
      setInitialPath(sessionStorage.getItem("modalInitialPath") ?? "/");
      sessionStorage.setItem("modalInitialPath", initialPath);
    }
  }, [pathname, initialPath]);

  const handleClose = useCallback(() => {
    // Navigate back to the initial path
    router.push(initialPath || "/");
  }, [router, initialPath]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  // Only render the modal if we're on a modal route
  if (pathname !== "/signup" && pathname !== "/signin") {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/50">
        <DialogContent className="absolute left-[50%] top-[50%] max-h-[85vh] max-w-[75vw] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-lighter p-6 shadow-lg">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export { Modal };
