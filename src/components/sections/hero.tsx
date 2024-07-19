import { ResponsiveImage } from "~/components/responsive-image";

const Hero = () => {
  return (
    <>
      <div className="relative">
        <ResponsiveImage
          alt="XX99 Mark II Headphones"
          desktop={{
            src: "/images/home/desktop/image-hero.jpg",
            width: 1440,
            height: 729,
          }}
          tablet={{
            src: "/images/home/tablet/image-header.jpg",
            width: 1536,
            height: 1458,
          }}
          mobile={{
            src: "/images/home/mobile/image-header.jpg",
            width: 750,
            height: 1200,
          }}
        />
      </div>
    </>
  );
};

export { Hero };
