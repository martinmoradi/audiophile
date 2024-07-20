"use client";
import Link from "next/link";
import { useState } from "react";
import { Container } from "~/components/container";
import { CartIcon } from "~/components/icons/cart";
import { HamburgerMenuIcon } from "~/components/icons/hamburger";
import { LogoIcon } from "~/components/icons/logo";
import { navItems } from "~/constants/navigation";
import { useCloseOnResize } from "~/hooks/useCloseOnResize";
import { usePreventScroll } from "~/hooks/usePreventScroll";
import { cn } from "~/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  usePreventScroll(isMenuOpen);
  useCloseOnResize(setIsMenuOpen);

  return (
    <header className="fixed left-0 top-0 z-50 w-full antialiased">
      <Container className="flex h-[var(--navigation-height)] justify-between border-b border-border-color">
        <div className="flex flex-1 text-white md:flex-none lg:hidden">
          <button
            className=""
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="navigation-menu"
          >
            <HamburgerMenuIcon isOpened={isMenuOpen} height={40} width={40} />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
        <div className="ml-0 flex items-center md:ml-20 lg:ml-0 lg:flex-1">
          <Link href="/" aria-label="logo">
            <LogoIcon />
            <span className="sr-only">Logo</span>
          </Link>
        </div>

        <div
          className={cn(
            "transition-[visibility] lg:visible",
            isMenuOpen ? "visible" : "invisible delay-500",
          )}
        >
          <nav
            className={cn(
              "lg:bg-transparent fixed left-0 top-[var(--navigation-height)] h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-dark transition-all duration-500 lg:relative lg:top-0 lg:block lg:h-auto lg:w-auto lg:translate-x-0 lg:overflow-hidden lg:opacity-100 lg:transition-none",
              isMenuOpen
                ? "translate-x-0 border-t border-border-color"
                : "translate-x-[-100vw] opacity-0",
            )}
          >
            <ul className="flex h-full flex-col gap-0 text-white lg:flex-row lg:items-center lg:gap-12 [&>*:first-child]:mt-[12.5vh] lg:[&>*:first-child]:mt-0">
              {navItems.map(({ href, label }) => (
                <li
                  className="mx-auto flex min-h-[var(--navigation-height)] w-3/4 items-center justify-center border-b border-border-color py-8 lg:border-none lg:py-0"
                  key={label}
                >
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href={href}
                    className={cn(
                      "text-lg uppercase transition-[color,transform] duration-300 hover:text-primary lg:text-xs",
                      isMenuOpen ? "translate-y-0" : "translate-y-8",
                      "lg:translate-y-0",
                      "ease-in",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-1 items-center">
          <Link
            href="/cart"
            className="ml-auto text-white hover:text-primary"
            aria-label="shopping-cart"
          >
            <CartIcon />
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export { Header };