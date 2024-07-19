import { getImageProps, type ImageProps } from "next/image";
import { cn } from "~/lib/utils";

interface ImageSource {
  src: string;
  width: number;
  height: number;
  quality?: number;
}

interface ResponsiveImageProps {
  desktop: ImageSource;
  tablet: ImageSource;
  mobile: ImageSource;
  alt: string;
  isHero?: boolean;
  className?: string;
}

const ResponsiveImage = ({
  desktop,
  tablet,
  mobile,
  alt,
  isHero = false,
  className,
}: ResponsiveImageProps) => {
  const common: Partial<ImageProps> = { alt, sizes: "100%" };
  const fetchPriority = isHero ? "high" : "auto";
  const loading = isHero ? "eager" : "lazy";

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    ...desktop,
    alt,
  });

  const {
    props: { srcSet: tabletSrcSet },
  } = getImageProps({
    ...common,
    ...tablet,
    alt,
  });

  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    ...mobile,
    alt,
  });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
      <source media="(min-width: 768px)" srcSet={tabletSrcSet} />
      <source srcSet={mobileSrcSet} />
      <img
        {...rest}
        className={cn("h-auto w-full", className)}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        {...{ fetchpriority: fetchPriority }}
      />
    </picture>
  );
};

export { ResponsiveImage };
