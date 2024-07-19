import { getImageProps } from "next/image";

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
  classNames?: string;
  alt: string;
  breakpoints?: {
    desktop: number;
    tablet: number;
  };
}

const ResponsiveImage = ({
  desktop,
  tablet,
  mobile,
  classNames,
  alt,
  breakpoints = { desktop: 1024, tablet: 768 },
}: ResponsiveImageProps) => {
  const imageSources = {
    desktop: getImageProps({ alt, ...desktop }),
    tablet: getImageProps({ alt, ...tablet }),
    mobile: getImageProps({ alt, ...mobile }),
  };

  return (
    <picture>
      <source
        media={`(min-width: ${breakpoints.desktop}px)`}
        srcSet={imageSources.desktop.props.srcSet}
      />
      <source
        media={`(min-width: ${breakpoints.tablet}px)`}
        srcSet={imageSources.tablet.props.srcSet}
      />
      <img
        srcSet={imageSources.mobile.props.srcSet}
        alt={alt}
        loading="lazy"
        className={classNames}
        style={{ width: "100%", height: "auto" }}
      />
    </picture>
  );
};

export { ResponsiveImage };
