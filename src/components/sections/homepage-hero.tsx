import { Container } from "~/components/container";
import { ResponsiveImage } from "~/components/responsive-image";
import { Button } from "~/components/ui/button";

const HomePageHero = () => {
  return (
    <div className="relative">
      <ResponsiveImage
        className="rounded-b-lg"
        alt="XX99 Mark II Headphones"
        isHero
        mobile={{
          src: "/images/home/mobile/image-header.jpg",
          width: 750,
          height: 1200,
        }}
        tablet={{
          src: "/images/home/tablet/image-header.jpg",
          width: 1536,
          height: 1458,
          quality: 90,
        }}
        desktop={{
          src: "/images/home/desktop/image-hero.jpg",
          width: 1440,
          height: 729,
          quality: 100,
        }}
      />
      <div className="absolute left-0 top-[var(--navigation-height)] flex h-full w-full items-center text-white">
        <Container className="-mt-[25%] flex h-full w-full items-center justify-center md:-mt-[17.5%] lg:-mt-[10%] lg:justify-start">
          <div className="flex flex-col gap-y-14 md:max-w-[42rem]">
            <span className="text-center text-sm uppercase opacity-50 lg:text-left">
              New product
            </span>
            <h1 className="text-mobile-xl text-center uppercase md:text-5xl lg:text-left">
              XX99 Mark II <br />
              Headphones
            </h1>
            <h2
              aria-label="XX99 Mark II Headphones description"
              className="mb-4 max-w-[38rem] text-pretty text-center text-base opacity-75 lg:text-left"
            >
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </h2>
            {/* TODO: Add proper HREF once product page is implemented */}
            <Button className="self-center lg:self-start">See product</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export { HomePageHero };
