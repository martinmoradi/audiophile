import { Container } from "~/components/container";
import { ResponsiveImage } from "~/components/responsive-image";

const Hero = () => {
  return (
    <>
      <div className="relative">
        <ResponsiveImage
          className=""
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
          }}
          desktop={{
            src: "/images/home/desktop/image-hero.jpg",
            width: 1440,
            height: 729,
          }}
        />
        <div className="absolute left-0 top-[var(--navigation-height)] flex h-full w-full items-center text-white">
          <Container className="flex h-full w-full items-center justify-center lg:justify-start">
            <div className="flex flex-col gap-y-10 px-8 md:max-w-[42rem]">
              <span className="text-center text-sm uppercase opacity-50">
                New product
              </span>
              <h1 className="text-mobile-xl text-center uppercase md:text-5xl lg:text-left">
                XX99 Mark II <br />
                Headphones
              </h1>
              <h2
                aria-label="XX99 Mark II Headphones description"
                className="text-pretty text-center text-base opacity-75 lg:text-left"
              >
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </h2>
              <button className="hover:bg-primary-dark mt-4 self-center bg-primary px-8 py-3 text-white transition-colors lg:self-start">
                See product
              </button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export { Hero };
