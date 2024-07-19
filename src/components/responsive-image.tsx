import { getImageProps } from "next/image";
import { cn } from "~/lib/utils";

interface ImageSource {
  src: string;
  width: number;
  height: number;
  quality?: number;
}

type ResponsiveImageProps = {
  mobile: ImageSource;
  tablet?: ImageSource;
  desktop?: ImageSource;
  className?: string;
  alt: string;
  isHero?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

const ResponsiveImage = ({
  mobile,
  desktop,
  tablet,
  className,
  alt,
  isHero = false,
  fetchPriority: propFetchPriority,
}: ResponsiveImageProps) => {
  const fetchPriority = isHero ? "high" : (propFetchPriority ?? "auto");
  const loading = isHero ? "eager" : "lazy";

  const imageSources = {
    desktop: desktop ? getImageProps({ alt, ...desktop }) : undefined,
    tablet: tablet ? getImageProps({ alt, ...tablet }) : undefined,
    mobile: getImageProps({ alt, ...mobile }),
  };

  return (
    <picture>
      {desktop && (
        <source
          media="(min-width: 1024px)"
          srcSet={imageSources.desktop!.props.srcSet}
        />
      )}
      {tablet && (
        <source
          media="(min-width: 768px)"
          srcSet={imageSources.tablet!.props.srcSet}
        />
      )}
      <img
        {...imageSources.mobile.props}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={cn("h-auto w-full", className)}
      />
    </picture>
  );
};

export { ResponsiveImage };
