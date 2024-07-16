import { useEffect } from "react";

const usePreventScroll = (isActive: boolean): void => {
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (isActive) {
        html.style.overflow = "hidden";
      } else {
        html.style.overflow = "";
      }
    }

    return () => {
      if (html) {
        html.style.overflow = "";
      }
    };
  }, [isActive]);
};

export { usePreventScroll };
