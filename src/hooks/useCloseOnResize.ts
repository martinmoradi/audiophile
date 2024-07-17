import { useEffect } from "react";

const useCloseOnResize = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    window.addEventListener("orientationchange", closeMenu);
    window.addEventListener("resize", closeMenu);

    return () => {
      window.removeEventListener("orientationchange", closeMenu);
      window.removeEventListener("resize", closeMenu);
    };
  }, [setIsOpen]);
};

export { useCloseOnResize };
