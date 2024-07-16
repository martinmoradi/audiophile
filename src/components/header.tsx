"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "~/components/container";
import { CartIcon } from "~/components/icons/cart";
import { HamburgerIcon } from "~/components/icons/hamburger";
import { LogoIcon } from "~/components/icons/logo";
import { cn } from "~/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/headphones", label: "Headphones" },
  { href: "/speakers", label: "Speakers" },
  { href: "/earphones", label: "Earphones" },
];

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  // Prevents scrolling when navigationMenu is open
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", isMenuOpened);
  }, [isMenuOpened]);

  // Prevents scrolling lock if resizing/rotating device
  useEffect(() => {
    const closeHamburgerNavigation = () => setIsMenuOpened(false);
    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") setIsMenuOpened(false);
    });

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
      window.removeEventListener("keydown", closeHamburgerNavigation);
    };
  }, [setIsMenuOpened]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white border-opacity-20 bg-dark">
      <Container className="flex h-[var(--navigation-height)] justify-between">
        <div className="flex flex-1 text-white lg:hidden">
          <button
            className=""
            onClick={() => setIsMenuOpened((prev) => !prev)}
            aria-expanded={isMenuOpened}
            aria-controls="navigation-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <HamburgerIcon />
          </button>
        </div>
        <div className="flex items-center lg:flex-1">
          <Link href="/">
            <LogoIcon />
          </Link>
        </div>

        <div
          className={cn(
            "transition-[visibility] md:visible",
            isMenuOpened ? "visible" : "invisible delay-500",
          )}
        >
          <nav
            className={cn(
              "fixed left-0 top-[var(--navigation-height)] h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-dark transition-all duration-500 lg:relative lg:top-0 lg:block lg:h-auto lg:w-auto lg:translate-x-0 lg:overflow-hidden lg:opacity-100 lg:transition-none",
              isMenuOpened
                ? "translate-x-0 border-t border-white border-opacity-20 opacity-100"
                : "translate-x-[-100vw] opacity-0",
            )}
          >
            <ul className="flex h-full flex-col gap-0 text-white lg:flex-row lg:items-center lg:gap-16 [&>*:first-child]:mt-[20vh] lg:[&>*:first-child]:mt-0">
              {navItems.map(({ href, label }) => (
                <div
                  key={href}
                  className="mx-auto flex min-h-[var(--navigation-height)] w-3/4 items-center justify-center border-b border-white border-opacity-20 py-8 lg:border-none lg:py-0"
                >
                  <li>
                    <Link
                      href={href}
                      className={cn(
                        "text-lg uppercase transition-[color,transform] duration-300 hover:text-primary lg:text-xs",
                        isMenuOpened ? "translate-y-0" : "translate-y-8",
                        "lg:translate-y-0",
                        "ease-in",
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-1 items-center">
          <Link href="/cart" className="ml-auto text-white hover:text-primary">
            <CartIcon />
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export { Header };
