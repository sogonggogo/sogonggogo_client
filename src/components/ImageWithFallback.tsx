/** @jsxImportSource @emotion/react */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { css, SerializedStyles } from "@emotion/react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  customCss?: SerializedStyles;
  fallbackSrc?: string;
}

const containerStyles = css`
  position: relative;
`;

const loaderStyles = css`
  position: absolute;
  inset: 0;
  background-color: #e5e5e5;
  border-radius: 0.25rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const imageStyles = (isLoading: boolean) => css`
  object-fit: cover;
  opacity: ${isLoading ? 0 : 1};
  transition: opacity 300ms;
`;

export function ImageWithFallback({
  src,
  alt,
  customCss,
  fallbackSrc = "/placeholder-image.jpg",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div css={[containerStyles, customCss]}>
      {isLoading && <div css={loaderStyles} />}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        css={imageStyles(isLoading)}
        onError={() => setImgSrc(fallbackSrc)}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
