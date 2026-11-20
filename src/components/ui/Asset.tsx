type AssetProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

/** Local Figma assets — use <img> so SVG/PNG both render without next/image SVG constraints. */
export function Asset({ src, alt = "", width, height, className }: AssetProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  );
}
