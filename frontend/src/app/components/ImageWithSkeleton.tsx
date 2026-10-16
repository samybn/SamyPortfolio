import { useState, ImgHTMLAttributes } from "react";

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

export function ImageWithSkeleton({
  containerClassName = "",
  containerStyle,
  className = "",
  style,
  alt = "",
  onLoad,
  onError,
  ...rest
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${
        !isLoaded && !hasError ? "skeleton-shimmer" : ""
      } ${containerClassName}`}
      style={{
        background: "rgba(215, 226, 234, 0.04)",
        ...containerStyle,
      }}
    >
      {hasError ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[#D7E2EA]/50"
          style={{ minHeight: "100px" }}
        >
          <span className="text-xs uppercase tracking-wider font-light">
            Image indisponible
          </span>
        </div>
      ) : (
        <img
          alt={alt}
          referrerPolicy={rest.referrerPolicy || "no-referrer"}
          className={`${className} transition-opacity duration-500 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={style}
          onLoad={(e) => {
            setIsLoaded(true);
            if (onLoad) onLoad(e);
          }}
          onError={(e) => {
            setHasError(true);
            if (onError) onError(e);
          }}
          {...rest}
        />
      )}
    </div>
  );
}

export default ImageWithSkeleton;
