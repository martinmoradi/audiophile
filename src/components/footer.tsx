import Link from "next/link";
import { Container } from "~/components/container";
import { LogoIcon } from "~/components/icons/logo";
import { FacebookIcon } from "~/components/icons/socials/facebook";
import { InstagramIcon } from "~/components/icons/socials/instagram";
import { TwitterIcon } from "~/components/icons/socials/twitter";
import { navItems } from "~/constants/navigation";

const Footer = () => {
  return (
    <footer className="bg-dark px-16 text-white">
      <Container>
        <div className="flex w-full flex-col">
          <div className="md:flex md:flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex justify-center py-20 before:absolute before:left-1/2 before:top-[0.2rem] before:h-[0.4rem] before:w-[10rem] before:-translate-x-1/2 before:bg-primary md:justify-start md:before:left-0 md:before:translate-x-0">
              <Link href="/" aria-label="logo">
                <LogoIcon />
                <span className="sr-only">Logo</span>
              </Link>
            </div>
            <nav>
              <ul className="flex flex-col items-center gap-8 md:flex-row [&:last-child]:mb-16 lg:[&:last-child]:mb-0">
                {navItems.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs uppercase transition-colors duration-300 hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mb-20">
            <p className="max-w-[54rem] text-pretty text-center text-base opacity-50 md:text-left">
              Audiophile is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </div>
          <div className="md:flex md:justify-between">
            <div className="mb-20 text-center text-base font-bold opacity-50 md:text-start">
              <p>Copyright 2024. All Rights Reserved</p>
            </div>
            <div className="mb-20 flex w-full flex-1 justify-center gap-8 md:justify-end lg:-mt-[8.5rem] [&>*:hover]:text-primary [&>*:hover]:transition-colors [&>*:hover]:duration-300 [&>*]:cursor-pointer">
              <Link href="/" aria-label="facebook">
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="/" aria-label="twitter">
                <TwitterIcon />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="/" aria-label="instagram">
                <InstagramIcon />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export { Footer };
